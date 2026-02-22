import { NextRequest, NextResponse } from "next/server"
import { items } from "@/lib/mock-data"

// Build a compact catalog string for the LLM context
function buildCatalogContext() {
    return items
        .map(
            (item) =>
                `• ${item.title} | ₹${item.price} | ${item.category} | ${item.condition} | Seller: ${item.sellerName} | Pickup: ${item.pickupLocation} | ${item.fulfillment}`
        )
        .join("\n")
}

const SYSTEM_PROMPT = `You are CampusCart Assistant — a helpful, friendly chatbot for a verified campus marketplace where college students buy & sell items.

You can answer questions in Hindi, English, or Hinglish — whatever the user prefers. Match the language the user uses.

Here is the current product catalog on CampusCart:
${buildCatalogContext()}

Your job:
1. Help users find products from the catalog above. Search by name, category, price range, or seller.
2. If a product exists, share its details (title, price, condition, seller, pickup location).
3. If a product doesn't exist, politely say so and suggest similar items if possible.
4. Answer general questions about the marketplace (how it works, trust scores, etc.)
5. Keep responses concise and friendly. Use bullet points for listing multiple items.
6. When listing items, always show the price with ₹ symbol.

Important: Only recommend items that actually exist in the catalog above. Do not make up products.`

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json()

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            )
        }

        const apiKey = process.env.SARVAM_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: "Sarvam API key not configured" },
                { status: 500 }
            )
        }

        const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-subscription-key": apiKey,
            },
            body: JSON.stringify({
                model: "sarvam-m",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    // Filter: only include messages starting from the first user message
                    ...messages.filter((_: { role: string }, i: number) => {
                        // Skip any assistant messages that come before the first user message
                        const firstUserIdx = messages.findIndex((m: { role: string }) => m.role === "user")
                        return i >= firstUserIdx
                    }),
                ],
                max_tokens: 1024,
                temperature: 0.7,
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error("Sarvam API error:", response.status, errorText)
            return NextResponse.json(
                { error: `Sarvam API error: ${response.status}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        const reply =
            data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that."

        return NextResponse.json({ reply })
    } catch (error) {
        console.error("Chat API error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

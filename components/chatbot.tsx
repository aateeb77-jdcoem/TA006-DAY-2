"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
    role: "user" | "assistant"
    content: string
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "👋 Hi! I'm your CampusCart assistant. Ask me anything about products on the marketplace!\n\nYou can ask in Hindi or English — जैसे \"क्या कोई laptop available है?\"",
        },
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen) inputRef.current?.focus()
    }, [isOpen])

    const sendMessage = async (overrideText?: string) => {
        const trimmed = (overrideText ?? input).trim()
        if (!trimmed || loading) return

        const userMessage: Message = { role: "user", content: trimmed }
        const newMessages = [...messages, userMessage]
        setMessages(newMessages)
        setInput("")
        setLoading(true)

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            })

            const data = await res.json()

            if (data.error) {
                setMessages([
                    ...newMessages,
                    { role: "assistant", content: `❌ Error: ${data.error}` },
                ])
            } else {
                setMessages([
                    ...newMessages,
                    { role: "assistant", content: data.reply },
                ])
            }
        } catch {
            setMessages([
                ...newMessages,
                {
                    role: "assistant",
                    content: "❌ Network error. Please try again.",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-24 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 md:bottom-8",
                    isOpen
                        ? "bg-muted text-muted-foreground rotate-0"
                        : "bg-primary text-primary-foreground"
                )}
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageCircle className="h-6 w-6" />
                )}
            </button>

            {/* Chat window */}
            <div
                className={cn(
                    "fixed bottom-40 right-6 z-[60] flex w-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 md:bottom-24",
                    isOpen
                        ? "h-[480px] scale-100 opacity-100"
                        : "pointer-events-none h-0 scale-95 opacity-0"
                )}
            >
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-primary-foreground">
                            CampusCart Assistant
                        </h3>
                        <p className="text-xs text-primary-foreground/70">
                            Hindi & English • Powered by Sarvam AI
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    <div className="flex flex-col gap-3">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex gap-2",
                                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs",
                                        msg.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {msg.role === "user" ? (
                                        <User className="h-3.5 w-3.5" />
                                    ) : (
                                        <Bot className="h-3.5 w-3.5" />
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "max-w-[260px] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                                        msg.role === "user"
                                            ? "rounded-br-sm bg-primary text-primary-foreground"
                                            : "rounded-bl-sm bg-muted text-foreground"
                                    )}
                                >
                                    <span className="whitespace-pre-wrap">{msg.content}</span>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-2">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                    <Bot className="h-3.5 w-3.5" />
                                </div>
                                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5">
                                    <div className="flex gap-1">
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Quick prompts */}
                {messages.length <= 1 && (
                    <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-2">
                        {[
                            "क्या laptop available है?",
                            "Show me books under ₹1000",
                            "Furniture available?",
                        ].map((prompt) => (
                            <button
                                key={prompt}
                                onClick={() => sendMessage(prompt)}
                                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="border-t border-border p-3">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage()
                            }}
                            placeholder="Ask about products..."
                            className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
                            disabled={loading}
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={loading || !input.trim()}
                            className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                                input.trim()
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "bg-muted text-muted-foreground"
                            )}
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

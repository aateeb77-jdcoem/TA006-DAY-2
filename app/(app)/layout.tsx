import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  )
}

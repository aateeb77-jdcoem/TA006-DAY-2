"use client"

import { useState } from "react"
import {
  Send,
  ShieldAlert,
  ChevronLeft,
  Phone,
  MoreVertical,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mockMessages, mockChatMessages } from "@/lib/mock-data"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState(mockChatMessages)

  const selectedConversation = mockMessages.find(
    (m) => m.id === selectedChat
  )

  const handleSend = () => {
    if (!messageInput.trim()) return
    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        sender: "me",
        text: messageInput,
        time: "Just now",
      },
    ])
    setMessageInput("")
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Messages</h1>

      <div className="grid h-[600px] gap-0 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[320px_1fr]">
        {/* Conversation List */}
        <div
          className={cn(
            "flex flex-col border-r border-border",
            selectedChat ? "hidden md:flex" : "flex"
          )}
        >
          <div className="border-b border-border p-4">
            <h2 className="text-sm font-semibold text-foreground">
              Conversations
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedChat(msg.id)}
                className={cn(
                  "flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted/50",
                  selectedChat === msg.id && "bg-muted/50"
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {msg.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {msg.sender}
                    </span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {msg.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {msg.lastMessage}
                  </p>
                </div>
                {msg.unread && (
                  <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={cn(
            "flex flex-col",
            !selectedChat ? "hidden md:flex" : "flex"
          )}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="text-muted-foreground md:hidden"
                  aria-label="Back to conversations"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <img
                  src={selectedConversation.itemImage}
                  alt={selectedConversation.itemTitle}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {selectedConversation.sender}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {selectedConversation.itemTitle}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Call">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="More options">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Safety Banner */}
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 text-xs text-primary">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                Keep conversations within the platform for your safety
              </div>

              {/* Messages */}
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2.5",
                        msg.sender === "me"
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md bg-muted text-foreground"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={cn(
                          "mt-1 text-[10px]",
                          msg.sender === "me"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend()
                    }}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSend} aria-label="Send message">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <Send className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Select a conversation
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose a message thread to view the chat
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

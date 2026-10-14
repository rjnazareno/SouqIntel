import { useState, useRef, useEffect } from 'react'
import { ChatCircleDotsIcon, PaperPlaneRightIcon, XIcon, SparkleIcon } from '@phosphor-icons/react'
import api from '../services/api'

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your SouqIntel assistant. Ask me about perfumes, fragrance notes, or finding affordable dupes.',
      timestamp: new Date(),
      welcome: true
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Build conversation history for context, excluding welcome messages
      const conversationHistory = messages
        .filter(msg => !msg.welcome)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }))

      const response = await api.sendChatMessage({
        message: input,
        conversationHistory
      })

      const aiMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        role: 'assistant',
        content: error.response?.data?.error || 'Sorry, I encountered an error. Please make sure the OpenAI API key is configured in server/.env.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-linear-to-b from-gold-300 to-gold-500 text-noir-950 shadow-[0_10px_30px_-8px_rgb(201_163_106/0.6)] hover:scale-105 transition-transform duration-300 flex items-center justify-center z-50"
          aria-label="Open chat"
        >
          <ChatCircleDotsIcon size={28} weight="fill" aria-hidden="true" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[min(600px,calc(100dvh-2rem))] bg-noir-900 border border-noir-600 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-noir-800 border-b border-noir-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-300 flex items-center justify-center">
                <SparkleIcon size={20} weight="fill" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg text-ivory-50">SouqIntel AI</h3>
                <p className="text-xs text-ivory-400">Perfume expert</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ivory-300 hover:text-ivory-50 hover:bg-ivory-100/10 rounded-lg p-2 transition-colors"
              aria-label="Close chat"
            >
              <XIcon size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-gold-400 text-noir-950'
                      : 'bg-noir-800 text-ivory-100 border border-noir-600'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-noir-800/70' : 'text-ivory-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-noir-800 border border-noir-600 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-noir-600">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about perfumes..."
                aria-label="Message"
                className="input-field-box flex-1 text-sm py-2"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="px-4 py-2 rounded-xl bg-gold-400 text-noir-950 hover:bg-gold-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <PaperPlaneRightIcon size={20} weight="fill" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot

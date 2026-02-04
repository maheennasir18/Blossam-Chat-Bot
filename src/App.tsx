import { useChat } from './hooks/useChat'
import {
  Header,
  MessageList,
  PromptTemplates,
  ChatInput,
  ErrorBanner,
} from './components'
import './App.css'

function App() {
  const {
    messages,
    input,
    setInput,
    loading,
    error,
    messagesEndRef,
    sendMessage,
  } = useChat()

  return (
    <div className="app">
      <Header />

      <main className="chat">
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />

        {error && <ErrorBanner message={error} />}

        <PromptTemplates onSelect={sendMessage} disabled={loading} />

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => sendMessage()}
          disabled={loading}
        />
      </main>
    </div>
  )
}

export default App

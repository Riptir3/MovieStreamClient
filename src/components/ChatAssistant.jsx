import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ReactMarkdown from 'react-markdown';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const { token } = useContext(UserContext);
  
  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', text: input };
    
    setMessages(prev => [...prev, userMsg, { role: 'ai', text: '' }]);
    setInput('');
    setIsTyping(true);

    try {
        const response = await fetch('https://localhost:7084/api/Chat/ask-stream', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message: input })
        });

        if (!response.ok) throw new Error("Server error");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                reader.releaseLock(); 
                break;
            }

            const rawChunk = decoder.decode(value, { stream: true });
            const lines = rawChunk.split('\n');

            lines.forEach(line => {
                if (line.startsWith('data: ')) {
                    const content = line.replace('data: ', '').replace(/\\n/g, '\n');
                    
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMsgIndex = newMessages.length - 1;
                        if (newMessages[lastMsgIndex].role === 'ai') {
                            newMessages[lastMsgIndex].text += content;
                        }
                        return newMessages;
                    });
                }
            });
        }
    } catch (err) {
        console.error("Stream hiba:", err);
        setMessages(prev => [...prev, { role: 'ai', text: 'Hiba történt a válaszadás során.' }]);
    } finally {
        setIsTyping(false);
    }
};

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-gray-800 border border-gray-700 w-80 h-96 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 p-3 flex justify-between items-center">
            <span className="font-bold text-sm">Movie AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500' : 'bg-gray-700'} ${isTyping && i === messages.length - 1 ? 'typing-cursor' : ''}`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          <div className="p-2 border-t border-gray-700 flex">
            <input 
              className="bg-gray-900 text-xs flex-1 p-2 outline-none rounded-l"
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Írj valamit..."
            />
            <button onClick={sendMessage} className="bg-blue-600 px-3 rounded-r text-xs">Send</button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110"
        >
          🤖
        </button>
      )}
    </div>
  );
}
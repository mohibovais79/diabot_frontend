import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { BotIcon } from './components/Icons';
import { MessageInput } from './components/MessageInput';
import { WelcomeScreen } from './components/WelcomeScreen';

export default function App() {
    const [view, setView] = useState('welcome');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatWindowRef = useRef(null);

    const BACKEND_URL = "http://localhost:8000";

    useEffect(() => {
        if (view === 'chat' && messages.length === 0) {
            setMessages([
                {
                    sender: 'bot',
                    answer: "Hello! I'm a specialized assistant for questions about diabetes. How can I help you today?",
                    id: Date.now(),
                },
            ]);
        }
    }, [view, messages.length]);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (text) => {
        const userMessage = { sender: 'user', text, id: Date.now() };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // --- CHANGE 1: Update the endpoint URL ---
            const response = await fetch(`${BACKEND_URL}/ask-agent/?query=${encodeURIComponent(text)}`);

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const botResponseData = await response.json();

            // --- CHANGE 2: Adapt to the new response structure from the agent ---
            const botMessage = {
                sender: 'bot',
                // The main answer is now the synthesized response from the LLM
                answer: botResponseData.llm_answer,
                // The other fields map directly from the new response
                matched_question: botResponseData.matched_question,
                reference: botResponseData.reference,
                score: botResponseData.score,
                id: Date.now() + 1,
            };
            setMessages((prev) => [...prev, botMessage]);

        } catch (error) {
            console.error("Failed to fetch from backend:", error);
            const errorMessage = {
                sender: 'bot',
                answer: "I'm sorry, but I'm having trouble connecting to my knowledge base. Please try again later.",
                id: Date.now() + 1,
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="font-sans bg-gray-100 h-screen overflow-hidden relative">
            <div className={`transition-opacity duration-500 ease-in-out w-full h-full absolute top-0 left-0 ${view === 'welcome' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <WelcomeScreen onStartChat={() => setView('chat')} />
            </div>
            <div className={`flex flex-col h-full w-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${view === 'chat' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/80 p-4 shadow-sm z-10">
                    <h1 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                        Diabetes Focus Chat
                    </h1>
                </header>
                <main ref={chatWindowRef} className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gray-100">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <BotIcon />
                                </div>
                                <div className="w-full max-w-xl p-4 rounded-b-xl rounded-tr-xl bg-white shadow-md border border-gray-100 flex items-center">
                                    <div className="typing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
                <footer className="max-w-3xl mx-auto w-full">
                    <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                </footer>
            </div>
        </div>
    );
}

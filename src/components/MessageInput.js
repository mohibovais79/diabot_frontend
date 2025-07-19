import { useState } from 'react';
import { ModernSendIcon } from './Icons';

export const MessageInput = ({ onSendMessage, isLoading }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && !isLoading) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white/50 backdrop-blur-sm border-t border-gray-200/80">
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a question about diabetes..."
                    className="w-full p-3 pr-14 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:scale-95 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <ModernSendIcon />
                </button>
            </div>
        </form>
    );
};

import { BotIcon, ConfidenceIcon } from './Icons';

export const ChatMessage = ({ message }) => {
    const isBot = message.sender === 'bot';

    // This function can be used to format text with bullet points if needed
    const formatText = (text) => {
        if (!text) return '';
        return text.split('').map((part, index) => {
            if (index === 0) return part;
            return <span key={index}><br />• {part}</span>;
        }).reduce((acc, curr) => [acc, '', curr]);
    };

    if (isBot) {
        return (
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <BotIcon />
                </div>
                <div className="w-full max-w-xl p-4 rounded-b-xl rounded-tr-xl bg-white shadow-md border border-gray-100">
                    {/* Display the main LLM answer */}
                    <p className="text-gray-800 leading-relaxed">{formatText(message.answer)}</p>

                    {/* Check for score or reference to decide if retrieved info exists */}
                    {message.score && (
                        <div className="mt-4 pt-3 border-t border-gray-200/80 text-xs text-gray-500 space-y-2">
                            <div className="flex items-center text-green-700 bg-green-100/80 px-2 py-1 rounded-full text-[11px] font-semibold self-start w-fit">
                                <ConfidenceIcon />
                                Confidence: {Math.round(message.score * 100)}%
                            </div>

                            {/* Display the raw retrieved answer */}
                            {message.retrieved_answer && (
                                <div>
                                    <p className="font-semibold text-gray-600">Retrieved Information:</p>
                                    <p className="italic bg-gray-50 p-2 rounded-md mt-1">"{formatText(message.retrieved_answer)}"</p>
                                </div>
                            )}

                            {/* --- FIX: Display the reference link directly --- */}
                            {message.reference && (
                                <div>
                                    <p className="font-semibold text-gray-600 mt-2">Source:</p>
                                    <a
                                        href={message.reference}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:underline break-all"
                                    >
                                        {message.reference}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // User message remains the same
    return (
        <div className="flex justify-end">
            <div className="max-w-xl p-3 px-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md">
                <p>{message.text}</p>
            </div>
        </div>
    );
};

export default ChatMessage;

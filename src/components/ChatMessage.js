import { BotIcon, ConfidenceIcon } from './Icons';

export const ChatMessage = ({ message }) => {
    const isBot = message.sender === 'bot';

    const formatAnswer = (text) => {
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
                    <p className="text-gray-800 leading-relaxed">{formatAnswer(message.answer)}</p>

                    {message.matched_question && (
                        <div className="mt-4 pt-3 border-t border-gray-200/80 text-xs text-gray-500 space-y-2">
                            <div className="flex items-center text-green-700 bg-green-100/80 px-2 py-1 rounded-full text-[11px] font-semibold self-start w-fit">
                                <ConfidenceIcon />
                                Confidence: {Math.round(message.score * 100)}%
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Related Question:</p>
                                <p className="italic">"{message.matched_question.replace(/^\d+\.\s+/, '')}"</p>
                            </div>
                            {message.reference && (
                                <a
                                    href={message.reference}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline font-medium mt-2 inline-block"
                                >
                                    View Source
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-end">
            <div className="max-w-xl p-3 px-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md">
                <p>{message.text}</p>
            </div>
        </div>
    );
};

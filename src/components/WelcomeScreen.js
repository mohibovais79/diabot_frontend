import { SparkleIcon } from './Icons';

export const WelcomeScreen = ({ onStartChat }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
            <div className="welcome-animation space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                    Welcome to DiaBot
                </h1>
                <p className="max-w-2xl text-lg text-gray-300">
                    Get trustworthy answers to your diabetes questions. Our AI provides responses backed by reliable sources and shows a confidence score so you can trust the information.
                </p>
                <button
                    onClick={onStartChat}
                    className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-semibold shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    <SparkleIcon />
                    Start Chat
                </button>
            </div>
        </div>
    );
};

// Make sure this component is exported as a default for compatibility with App.js
export default WelcomeScreen;
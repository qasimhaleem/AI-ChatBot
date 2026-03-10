import React, { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
const Form = () => {
    const [prompt, setPrompt] = useState("");
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!prompt.trim() || loading) return;

        const currentPrompt = prompt;
        setPrompt("");
        setLoading(true);

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: "You are a helpful assistant integrated into Qasim's Creation. Keep answers professional and tech-focused."
            });
            const result = await model.generateContent(currentPrompt);
            const text = result.response.text();

            setQueries(prev => [...prev, { question: currentPrompt, answer: text }]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setQueries(prev => [...prev, { question: currentPrompt, answer: "Sorry, I couldn't generate a response." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto w-full">
            {/* Chat History View */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col">
                {queries.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        <p>Ask me anything to start the conversation...</p>
                    </div>
                ) : (
                    queries.map((q, index) => (
                        <div key={index} className="flex flex-col space-y-4 w-full">
                            {/* User Question Bubble */}
                            <div className="self-end bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                                <p className="text-sm">{q.question}</p>
                            </div>

                            {/* AI Answer Bubble */}
                            <div className="self-start bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm mt-2">
                                <p className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                                    AI Response
                                </p>
                                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{q.answer}</p>
                            </div>
                        </div>
                    ))
                )}
                {loading && (
                    <div className="self-start bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm mt-2 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                )}
            </div>

            {/* Input Form at Bottom */}
            <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-gray-100">
                <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-4xl mx-auto w-full bg-white border border-gray-300 rounded-full p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                    <input
                        type="text"
                        value={prompt}
                        className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-gray-700 placeholder-gray-400"
                        placeholder="Ask me anything..."
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600 flex items-center justify-center"
                        disabled={loading || !prompt.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5 12 12 5 19 12"></polyline>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Form;
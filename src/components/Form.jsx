import React, { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_EY } from '../../secret';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
const Form = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setPrompt("")

        if (!prompt.trim()) return;
        setLoading(true);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: "You are a helpful assistant integrated into Qasim's Creation. Keep answers professional and tech-focused."
        });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        setResponse(text);

        setLoading(false);

    };

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit} className='flex '>
                <textarea
                    rows={1}
                    type="text"
                    value={prompt}
                    className='border p-2 rounded-md'
                    placeholder="Ask me anything..."
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type='submit'
                    className='p-2 bg-blue-600 text-white rounded-md ml-2 transition-opacity disabled:opacity-50'
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Generate Answer"}
                </button>
            </form>

            {response && (
                <div className='mt-10 p-4 bg-gray-100 rounded-lg'>
                    <p className="font-bold text-blue-600">Response</p>
                    <p className="mt-2 whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    );
}
export default Form;

import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIChatInsights: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const getInsights = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: "You are GrownexAI Assistant. You help business owners understand how AI automation can scale their revenue, handle leads, and optimize customer support. Provide professional, encouraging, and strategy-focused advice.",
        },
      });
      setResponse(result.text || "I couldn't generate an insight at this moment.");
    } catch (err) {
      console.error(err);
      setResponse("Our AI engine is currently optimizing. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-transparent">
      <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-white">Consult GrownexAI</h2>
            <p className="text-gray-400 mb-8">
              Ask how automation can specifically solve your business bottlenecks or improve your conversion rates.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., How can I automate my lead follow-ups?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && getInsights()}
              />
              <button
                onClick={getInsights}
                disabled={loading}
                className="w-full bg-emerald-500 text-black font-bold py-5 rounded-2xl text-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Consulting AI...' : 'Analyze Opportunity'}
                {!loading && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[250px] bg-black/40 rounded-3xl p-6 border border-white/5 relative overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-emerald-500 text-sm font-mono animate-pulse">Processing strategy...</p>
              </div>
            ) : response ? (
              <div className="prose prose-invert max-w-none text-gray-300 text-sm md:text-base leading-relaxed animate-fade-in">
                {response}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 italic">
                <p>Strategic insights will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatInsights;

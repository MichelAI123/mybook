'use client';

import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

interface ChatProps {
  onCitationClick?: (page: number) => void;
}

export default function Chat({ onCitationClick }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <h2 className="text-xl font-semibold mb-2">Welcome to mybooklm</h2>
            <p>Ask a question about your uploaded document.</p>
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className={`p-4 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-blue-50 ml-auto' : 'bg-gray-50 mr-auto border border-gray-100'}`}>
            <span className="font-bold text-xs text-gray-500 uppercase tracking-wider block mb-2">
              {m.role === 'user' ? 'You' : 'mybooklm'}
            </span>
            {/* ReactMarkdown safely renders the formatted text from the LLM */}
            <ReactMarkdown 
              className="prose prose-sm max-w-none text-gray-800"
              components={{
                a: ({ node, ...props }) => {
                  const href = props.href || '';
                  if (href.startsWith('#page-')) {
                    const pageNum = parseInt(href.replace('#page-', ''), 10);
                    return (
                      <button 
                        onClick={() => onCitationClick && onCitationClick(pageNum)}
                        className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs mx-1 font-bold hover:bg-blue-200 transition"
                        title={`Go to page ${pageNum}`}
                      >
                        {props.children}
                      </button>
                    );
                  }
                  return <a {...props} />;
                }
              }}
            >
              {m.content}
            </ReactMarkdown>
          </div>
        ))}
        {isLoading && <p className="text-gray-400 text-sm animate-pulse ml-4">Analyzing sources...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mt-auto">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your research..."
          className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input?.trim()}
          className="bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { Send, Sparkles, User, Lightbulb } from 'lucide-react';

export default function ChatInterface() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'I have analyzed the sources in this notebook. I can answer questions, summarize topics, or help you brainstorm. What would you like to do?',
      suggestions: ['Write a summary', 'Suggest key themes', 'Generate quiz questions']
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { id: Date.now(), role: 'user', content: query }];
    setMessages(newMessages);
    setQuery('');

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Based on your sources, here is a helpful response to "${newMessages[newMessages.length - 1].content}". This mock interface simulates the NotebookLM experience.`
      }]);
    }, 1000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'var(--sys-color-surface-container-low)',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid var(--sys-color-surface-container-highest)',
      margin: '16px',
      flex: 1
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--sys-color-surface-container-highest)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Sparkles size={20} color="var(--sys-color-primary)" />
        <span className="text-title-medium">Notebook Guide</span>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            gap: '16px',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%'
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'var(--sys-color-primary-container)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <Sparkles size={16} color="var(--sys-color-primary)" />
              </div>
            )}
            
            <div style={{
              backgroundColor: msg.role === 'user' ? 'var(--sys-color-primary-container)' : 'transparent',
              padding: msg.role === 'user' ? '12px 16px' : '4px 0',
              borderRadius: '16px',
              color: msg.role === 'user' ? 'var(--sys-color-on-primary-container)' : 'var(--sys-color-on-surface)'
            }}>
              <div className="text-body-large" style={{ lineHeight: '1.6' }}>
                {msg.content}
              </div>
              
              {/* Suggestions */}
              {msg.suggestions && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                  {msg.suggestions.map((s, i) => (
                    <button key={i} className="chip-select" onClick={() => setQuery(s)}>
                      <Lightbulb size={14} />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'var(--sys-color-surface-container-high)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={16} color="var(--sys-color-on-surface)" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '16px 24px', backgroundColor: 'var(--sys-color-surface-container-lowest)' }}>
        <form 
          onSubmit={handleSend}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--sys-color-surface-container-high)',
            borderRadius: '24px',
            padding: '8px 8px 8px 16px',
            gap: '8px'
          }}
        >
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about these sources..."
            className="text-body-large"
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: 'var(--sys-color-on-surface)'
            }}
          />
          <button 
            type="submit"
            className="btn-icon-tonal"
            style={{ 
              backgroundColor: query.trim() ? 'var(--sys-color-primary)' : 'var(--sys-color-surface-variant)',
              color: query.trim() ? 'var(--sys-color-on-primary)' : 'var(--sys-color-on-surface-variant)',
              flexShrink: 0
            }}
          >
            <Send size={18} style={{ marginLeft: '2px' }} />
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <span className="text-body-small" style={{ color: 'var(--sys-color-outline)' }}>
            AI responses can be generated based on your sources.
          </span>
        </div>
      </div>
    </div>
  );
}

import { FileText, Plus, Search, MoreHorizontal, Settings2 } from 'lucide-react';

export default function Sidebar() {
  const mockSources = [
    { title: 'Project Overview.pdf', words: '2,450 words' },
    { title: 'Interview Transcripts', words: '14,020 words' },
    { title: 'Website Content mapping.md', words: '8,200 words' }
  ];

  return (
    <div style={{
      width: '320px',
      backgroundColor: 'var(--sys-color-surface-container-lowest)',
      borderRight: '1px solid var(--sys-color-surface-container-highest)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ padding: '24px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="text-title-medium" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Sources
          <span style={{ 
            backgroundColor: 'var(--sys-color-surface-container-high)', 
            padding: '2px 8px', borderRadius: '12px', fontSize: '12px' 
          }}>
            {mockSources.length}
          </span>
        </h2>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button className="btn-icon-ghost" style={{ width: '32px', height: '32px' }}>
            <Search size={16} />
          </button>
          <button className="btn-icon-ghost" style={{ width: '32px', height: '32px' }}>
            <Settings2 size={16} />
          </button>
        </div>
      </div>

      <div style={{ padding: '0 24px 16px' }}>
        <button className="btn-tonal" style={{ width: '100%', justifyContent: 'center' }}>
          <Plus size={18} />
          Add source
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        {mockSources.map((src, i) => (
          <div key={i} style={{
            padding: '12px 16px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          className="sidebar-item"
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--sys-color-surface-container)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '8px',
              backgroundColor: 'var(--sys-color-secondary-container)',
              color: 'var(--sys-color-on-secondary-container)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileText size={20} />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div className="text-title-small" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {src.title}
              </div>
              <div className="text-body-small" style={{ color: 'var(--sys-color-on-surface-variant)' }}>
                {src.words}
              </div>
            </div>
            <button className="btn-icon-ghost" style={{ width: '24px', height: '24px', margin: '-4px' }}>
              <MoreHorizontal size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Notebook Notes Section */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--sys-color-surface-container-highest)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className="text-title-small">Notes</span>
          <button className="btn-icon-ghost" style={{ width: '28px', height: '28px' }}>
            <Plus size={16} />
          </button>
        </div>
        <div 
          className="text-body-small"
          style={{ 
            padding: '16px',
            backgroundColor: 'var(--sys-color-surface-container)',
            borderRadius: '12px',
            color: 'var(--sys-color-on-surface-variant)',
            textAlign: 'center',
            cursor: 'text'
          }}
        >
          Click to add a note...
        </div>
      </div>
    </div>
  );
}

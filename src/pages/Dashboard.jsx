import { useNavigate } from 'react-router-dom';
import { Plus, Book, MoreVertical } from 'lucide-react';

const mockNotebooks = [
  { id: '1', title: 'Generative AI Research', updated: '2 hours ago', count: 12 },
  { id: '2', title: 'React Performance Tuning', updated: 'Yesterday', count: 5 },
  { id: '3', title: 'Project MyBook Spec', updated: 'Oct 12', count: 1 }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{
      flex: 1,
      padding: '40px 60px',
      overflowY: 'auto',
      backgroundColor: 'var(--sys-color-surface-container-lowest)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 className="text-title-large" style={{ marginBottom: '32px', color: 'var(--sys-color-on-surface)' }}>
          Welcome to MyBook
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {/* Create New Card */}
          <div 
            onClick={() => {}}
            style={{
              padding: '24px',
              borderRadius: '24px',
              border: '1px dashed var(--sys-color-outline-variant)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '180px',
              cursor: 'pointer',
              color: 'var(--sys-color-primary)',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--sys-color-surface-container)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              backgroundColor: 'var(--sys-color-primary-container)',
              color: 'var(--sys-color-on-primary-container)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Plus size={24} />
            </div>
            <span className="text-title-medium">New Notebook</span>
          </div>

          {/* Notebook Cards */}
          {mockNotebooks.map(nb => (
            <div 
              key={nb.id}
              onClick={() => navigate(`/book/${nb.id}`)}
              className="surface-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '180px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'box-shadow 0.2s, background-color 0.2s',
                border: '1px solid var(--sys-color-surface-container-highest)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--sys-color-surface-container)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--sys-color-surface-container-low)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'auto' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--sys-color-secondary-container)',
                  color: 'var(--sys-color-on-secondary-container)',
                  display: 'inline-flex'
                }}>
                  <Book size={20} />
                </div>
                <button 
                  className="btn-icon-ghost" 
                  onClick={(e) => { e.stopPropagation(); }}
                  style={{ margin: '-8px' }}
                >
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <h2 className="text-title-medium" style={{ marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nb.title}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--sys-color-on-surface-variant)' }}>
                <span className="text-body-small">{nb.count} sources</span>
                <span className="text-body-small">{nb.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

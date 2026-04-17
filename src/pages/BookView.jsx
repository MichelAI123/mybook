import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';

export default function BookView() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
      <Sidebar />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--sys-color-surface-container-lowest)' }}>
        <div style={{ 
          padding: '12px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          borderBottom: '1px solid var(--sys-color-surface-container-highest)'
        }}>
          <button className="btn-icon-ghost" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-title-medium">Generative AI Research</h2>
        </div>
        
        <div style={{ flex: 1, overflow: 'hidden', padding: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '900px', width: '100%', height: '100%', display: 'flex' }}>
              <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}

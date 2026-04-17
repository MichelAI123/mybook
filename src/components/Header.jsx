import { BookOpen, MoreVertical, Plus, UserCircle } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.style.setProperty('--sys-color-background', '#131314');
      document.documentElement.style.setProperty('--sys-color-surface-container-lowest', '#0e0e0f');
      document.documentElement.style.setProperty('--sys-color-surface-container-low', '#191a1c');
      document.documentElement.style.setProperty('--sys-color-on-surface', '#e2e2e2');
      document.documentElement.style.setProperty('--sys-color-on-background', '#e2e2e2');
      // A quick hack for theme swapping without adding real tailwind dark mode since we just want a toggle.
      // Ideally we would add 'dark' class to html element and use a CSS media/class query.
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.style.removeProperty('--sys-color-background');
      document.documentElement.style.removeProperty('--sys-color-surface-container-lowest');
      document.documentElement.style.removeProperty('--sys-color-surface-container-low');
      document.documentElement.style.removeProperty('--sys-color-on-surface');
      document.documentElement.style.removeProperty('--sys-color-on-background');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      backgroundColor: 'var(--sys-color-surface-container-lowest)',
      color: 'var(--sys-color-on-surface)',
      borderBottom: '1px solid var(--sys-color-surface-container-highest)',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="btn-icon-ghost" style={{ marginLeft: '-12px' }}>
          <BookOpen size={24} color="var(--sys-color-primary)" />
        </button>
        <span className="text-title-medium" style={{ color: 'var(--sys-color-on-surface)' }}>MyBook</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button className="btn-tonal" onClick={() => {}}>
          <Plus size={18} />
          New Notebook
        </button>
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--sys-color-outline-variant)', margin: '0 8px' }} />
        <button className="btn-icon-ghost" onClick={toggleTheme} title="Toggle Theme">
          <MoreVertical size={20} />
        </button>
        <button className="btn-icon-ghost">
          <UserCircle size={28} color="var(--sys-color-primary)" />
        </button>
      </div>
    </header>
  );
}

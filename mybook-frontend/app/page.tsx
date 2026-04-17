'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import DocumentViewer from '@/components/DocumentViewer';

export default function Home() {
  const [activePage, setActivePage] = useState<number | null>(null);

  return (
    <main className="flex h-screen w-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* Left Panel: The Document Viewer */}
      <section className="w-1/2 h-full border-r border-gray-200 bg-gray-50 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">mybooklm</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">Source Viewer</span>
        </div>
        
        <DocumentViewer activePage={activePage} />
      </section>

      {/* Right Panel: The Chat Interface */}
      <section className="w-1/2 h-full">
        <Chat onCitationClick={(page: number) => setActivePage(page)} />
      </section>
      
    </main>
  );
}

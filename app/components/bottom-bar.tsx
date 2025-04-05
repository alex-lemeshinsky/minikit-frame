'use client';

import { useState } from 'react';
import CreateJokeForm from './create-joke-form';
import TopJokes from './pages/top-jokes';
import About from './pages/about';

export default function BottomBar() {
  const [activeTab, setActiveTab] = useState<'top' | 'add' | 'about'>('top');

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content Area - flex-1 to take all available space */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'top' && <TopJokes />}
        {activeTab === 'add' && <CreateJokeForm />}
        {activeTab === 'about' && <About />}
      </div>

      {/* Bottom Navigation - fixed at bottom */}
      <div className="flex justify-around items-center h-16 border-t border-gray-200 bg-white pb-4">
        <button
          onClick={() => setActiveTab('top')}
          className={`flex-1 h-full flex items-center justify-center ${
            activeTab === 'top' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          Top Jokes
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 h-full flex items-center justify-center ${
            activeTab === 'add' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          Add Joke
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex-1 h-full flex items-center justify-center ${
            activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          About
        </button>
      </div>
    </div>
  );
} 
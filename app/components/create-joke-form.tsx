'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
// import { useJokes } from '../hooks/useJokes';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export const CreateJokeForm = () => {
  const { isConnected } = useAccount();
  // const { createJoke } = useJokes();
  const { setFrameReady } = useMiniKit();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setFrameReady();
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create Farcaster post
      const farcasterPost = {
        text: `${title}\n\n${content}\n\nPlease like and share this joke 🙏\n\n#joke`,
        embeds: [],
      };

      // Open Farcaster post in new window
      const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(farcasterPost.text)}`;
      window.open(farcasterUrl, '_blank');
      
      // Reset form
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating joke:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-gray-600 text-center">
          Connect your wallet to add a joke
        </p>
        <ConnectWallet />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Joke
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Joke & Share on Farcaster'}
      </button>
    </form>
  );
};
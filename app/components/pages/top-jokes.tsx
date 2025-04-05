'use client';

import { useJokes } from '../../hooks/useJokes';

export default function TopJokes() {
  const { jokes, loading, error } = useJokes();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 h-full">
      <h1 className="text-2xl font-bold text-center mb-6">Top Jokes</h1>
      <div className="space-y-4">
        {jokes.map((joke) => (
          <div
            key={joke.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{joke.name}</h2>
            <p className="text-gray-700 mb-4">{joke.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(joke.createdAt).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-500">
                {joke.likes} likes
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
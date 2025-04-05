'use client';

import { useState } from 'react';

export default function CreateJokeForm() {
  const [joke, setJoke] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted joke:', joke);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="joke">Your Joke:</label>
        <textarea
          id="joke"
          value={joke}
          onChange={(e) => setJoke(e.target.value)}
          rows={4}
          style={{ width: '100%' }}
        />
      </div>
      <button type="submit">Submit Joke</button>
    </form>
  );
}

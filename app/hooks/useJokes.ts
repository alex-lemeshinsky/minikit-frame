import { useState, useEffect } from 'react';
import { Joke } from '../entities/joke';
import { JokeRepository } from '../repositories/joke.repository';

const jokeRepository = new JokeRepository();

export function useJokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    try {
      setLoading(true);
      const data = await jokeRepository.getTopJokes();
      setJokes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load jokes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    jokes,
    loading,
    error,
    refreshJokes: fetchJokes,
  };
} 
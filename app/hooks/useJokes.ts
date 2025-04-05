import { useState, useEffect } from 'react';
import { Joke } from '../entities/joke';
import { JokeRepository } from '../repositories/joke.repository';

const jokeRepository = new JokeRepository();

export const useJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadJokes = async () => {
    try {
      setLoading(true);
      setError(null);
      const { results } = await jokeRepository.getAllJokes();
      setJokes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jokes');
    } finally {
      setLoading(false);
    }
  };

  const createJoke = async (title: string, content: string) => {
    try {
      setLoading(true);
      setError(null);
      const newJoke = await jokeRepository.createJoke({ title, content });
      setJokes(prev => [newJoke, ...prev]);
      return newJoke;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create joke');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJokes();
  }, []);

  return {
    jokes,
    loading,
    error,
    createJoke,
  };
}; 
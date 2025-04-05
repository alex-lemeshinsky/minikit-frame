import { useState, useEffect } from 'react';
import { Joke } from '../entities/joke';
import { JokeRepository } from '../repositories/joke.repository';

export const useJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const jokeRepository = new JokeRepository();

  const loadJokes = async () => {
    try {
      setLoading(true);
      setError(null);
      const { results, count } = await  jokeRepository.getAllJokes();
      setJokes(results);
      setTotalCount(count);
      setHasMore(results.length > 0);
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
  });

  return {
    jokes,
    loading,
    error,
    createJoke,
    hasMore,
    totalCount,
  };
}; 
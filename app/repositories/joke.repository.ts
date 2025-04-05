import { Joke } from "../entities/joke";
import { customFetch } from "../utils/fetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class JokeRepository {
  async getAllJokes(): Promise<{ results: Joke[] }> {
    try {
      const response = await customFetch('/api/jokes');
      const data = await response.json();
      return {
        results: data.results
      };
    } catch (error) {
      console.error('Error fetching jokes:', error);
      throw new Error('Failed to fetch jokes');
    }
  }

  async createJoke(joke: { title: string; content: string }): Promise<Joke> {
    try {
      const response = await customFetch('/api/jokes', {
        method: 'POST',
        body: JSON.stringify(joke),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating joke:', error);
      throw new Error('Failed to create joke');
    }
  }

  async getJokeById(id: number): Promise<Joke> {
    try {
      const response = await customFetch(`${API_URL}/jokes/jokes/${id}/`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching joke:', error);
      throw new Error('Failed to fetch joke');
    }
  }

  async updateJoke(id: number, joke: Partial<Joke>): Promise<Joke> {
    try {
      const response = await customFetch(`${API_URL}/jokes/jokes/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joke),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating joke:', error);
      throw new Error('Failed to update joke');
    }
  }

  async deleteJoke(id: number): Promise<void> {
    try {
      await customFetch(`${API_URL}/jokes/jokes/${id}/`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting joke:', error);
      throw new Error('Failed to delete joke');
    }
  }
}

import { Joke } from "../entities/joke";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Dummy data for development
const dummyJokes: Joke[] = [
  {
    id: "1",
    name: "The Crypto Developer",
    content:
      "Why did the crypto developer go broke? Because he lost his private keys!",
    likes: 42,
    castId: "cast-1",
    userFid: "user-1",
    createdAt: new Date("2024-04-01"),
  },
  {
    id: "2",
    name: "The Smart Contract",
    content:
      "What do you call a smart contract that never works? A dumb contract!",
    likes: 35,
    castId: "cast-2",
    userFid: "user-2",
    createdAt: new Date("2024-04-02"),
  },
  {
    id: "3",
    name: "The Blockchain",
    content:
      "Why did the blockchain go to therapy? It had too many blocks to process!",
    likes: 28,
    castId: "cast-3",
    userFid: "user-3",
    createdAt: new Date("2024-04-03"),
  },
];

export class JokeRepository {
  async getTopJokes(limit: number = 10): Promise<Joke[]> {
    try {
      // In production, this would be a real API call
      // const response = await fetch(`${API_URL}/jokes/top?limit=${limit}`);
      // const data = await response.json();
      // return data as Joke[];

      // For development, return dummy data
      return dummyJokes.sort((a, b) => b.likes - a.likes).slice(0, limit);
    } catch (error) {
      console.error("Error fetching top jokes:", error);
      throw new Error("Failed to fetch top jokes");
    }
  }
}

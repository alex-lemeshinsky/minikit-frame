export interface User {
  id: number;
  fid: number;
  username: string;
  created_at: string;
}

export interface Joke {
  id: number;
  user: User;
  title: string;
  content: string;
  likes_count: number;
  created_at: string;
} 
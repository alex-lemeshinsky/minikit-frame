export interface FarcasterUser {
  username: string;
  pfpUrl: string;
}

export interface FrameContext {
  user?: FarcasterUser;
  client?: {
    added: boolean;
  };
}

export interface Joke {
  id: string;
  name: string;
  content: string;
  likes: number;
  castId: string;
  userFid: string;
  createdAt: Date;
} 
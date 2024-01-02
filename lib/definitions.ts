export type User = {
  id: number;
  createdAt: string;
  username: string;
  password: string;
  email?: string;
  displayName?: string;
};

export type Board = {
  id: number;
  createdAt: string;
  userId: number;
  name: string;
};

export type Post = {
  id: number;
  createdAt: string;
  boardId: number;
  title: string;
  description: string;
  echoes: number;
  status: Status;
};

export enum Status {
  PENDING = "pending",
  DEV = "development",
  LIVE = "live",
}

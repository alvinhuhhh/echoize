export type UserInfo = {
  id: string;
  userId: string;
  createdAt: string;
  displayName: string;
};

export type Board = {
  id: string;
  userId: string;
  createdAt: string;
  name: string;
};

export enum Status {
  PENDING = "pending",
  DEV = "development",
  LIVE = "live",
}

export type Post = {
  id: string;
  boardId: string;
  createdAt: string;
  title: string;
  description: string;
  upvotes: number;
  status: Status;
};

export type UserInfo = {
  id: string;
  user_id: string;
  created_at: string;
  display_name: string | null;
};

export type Board = {
  id: string;
  user_id: string;
  created_at: string;
  name: string;
};

export enum Status {
  PENDING = "pending",
  REJECTED = "rejected",
  HOLD = "on hold",
  DEV = "development",
  LIVE = "live",
}

export type Post = {
  id: string;
  board_id: string;
  created_at: string;
  title: string;
  description: string;
  upvotes: number;
  status: Status;
};

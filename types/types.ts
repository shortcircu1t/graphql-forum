export interface User {
  avatarUrl?: string;
  username: string;
}

export interface Post {
  id: string;
  user: User;
  title: string;
  body: string;
  headerImgUrl?: string;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
  comments: number;
  createdAt: string;
}

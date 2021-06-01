export type Category = {
  id?: string;
  uid?: string;
  title: string;
  description?: string;
  icon?: string;
  userId?: string;
  topics: Topic[];
  postsCount: number;
};

export type Topic = {
  id?: string;
  uid?: string;
  title: string;
  description?: string;
  posts?: Post[];
  postsCount: number;
  views: string;
  categoryId: string;
  userId: string;
};

export type Post = {
  id?: string;
  uid?: string;
  content: string;
  replyId?: string;
  topicId: string;
  userId: string;
  replies: Post[];
};

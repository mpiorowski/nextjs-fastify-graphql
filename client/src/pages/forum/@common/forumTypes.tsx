export type Category = {
  id?: string;
  uid?: string;
  title: string;
  description?: string;
  icon?: string;
  userId?: string;
  topics: Topic[],
  latestTopicUid?: string;
  topicsNumber?: number;
  postsNumber?: number;
  latestPostDate?: string;
  latestPostUid?: string;
  latestTopic?: string;
};

export type Topic = {
  id?: string;
  uid?: string;
  title: string;
  description?: string;
  postsCount: number;
  views: string;
  categoryId: string;
  userId: string;
};

export type Post = {
  id?: string;
  uid?: string;
  content: string;
  replyid?: string;
  topicId: string;
  userId: string;
};

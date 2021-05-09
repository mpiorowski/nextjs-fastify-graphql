export type Category = {
  id?: string;
  uid?: string;
  title: string;
  description?: string;
  icon?: string;
  userid?: string;
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
  views: string;
  categoryid: string;
  userid: string;
};

export type Post = {
  id?: string;
  uid?: string;
  content: string;
  replyid?: string;
  topicid: string;
  userid: string;
};

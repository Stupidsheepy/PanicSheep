import type { UserForTweet } from './UserInfo'
export type TweetParams = {
  username: string
  content: string
  tweetImage: string[]
  createdAt?: string
}

export type TweetDetails = {
  tweetContent: string;
  tweetImage: string[];
  createdAt: string;
  tweetUuid: string;
  likeUser: string[];
  retweetUser: string[];
  commentUser: string[];
  likeCount: number;
  retweetCount: number;
  commentCount: number;
  isLiked: boolean;
  childUuid: string | null;
} & UserForTweet


export enum PostTweetSize {
  MAX_SIZE = "62rem",
  MEDIUM_SIZE = '55rem'
}

export type HomeTweetListParams = {
  tweetUuid: string,
  username: string
}

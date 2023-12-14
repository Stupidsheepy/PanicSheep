import type { UserForTweet } from './UserInfo'
export type TweetParams = {
    username: string
    content: string
    tweetImage: string[]
    createdAt?: string
}

export type TweetDetails = {
    content: string
    tweetImage: string[]
    createdAt: string
    tweetUuid : string
    likeUsers : UserForTweet[]
    retweetUsers : UserForTweet[]
    commentUsers : UserForTweet[]
    likeCount : number
    retweetCount : number
    commentCount : number
    // 用户自己是否点赞
    isLiked : boolean
    childTweet : TweetDetails[] | null
} & UserForTweet


export enum PostTweetSize {
    MAX_SIZE = "62rem",
    MEDIUM_SIZE = '55rem'
}
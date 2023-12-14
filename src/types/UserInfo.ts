export type UserInfo = {
    token: string
    username: string
    email: string
    password: string
    displayName: string
    vip: boolean
    bio: string
    avatar: string
    profileCover: string
}

export type UserProfile = {
    username: string
    displayName: string
    bio: string
    password: string
    avatar: string
    profileCover: string
}

export type UserForTweet = {
    username: string
    displayName: string
    avatar: string
}

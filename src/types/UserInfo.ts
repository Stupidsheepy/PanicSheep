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
    userAvatar: string
    profileCover: string
}

export type UserForTweet = {
    username: string
    displayName: string
    userAvatar: string
}

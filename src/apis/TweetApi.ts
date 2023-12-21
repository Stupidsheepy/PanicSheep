import axios from 'axios'
import type { TweetDetails, HomeTweetListParams } from '../types/TweetInfo'
export const getTweetDetails = async (username: string, tweetUuid: string): Promise<TweetDetails> => {
  return axios.post('/get-tweet-detail', {
    username,
    tweetUuid
  }).then(response => {
    console.log(response.data)
    return response.data.data
  })
}


export const getHomeTweet = (type: string): Promise<HomeTweetListParams[]> => {
  return axios.get('/home-get-tweets', {
    params: {
      type: type
    }
  }).then(response => {
    console.log(response.data)
    // data给出Home
    return response.data.data
  })
}

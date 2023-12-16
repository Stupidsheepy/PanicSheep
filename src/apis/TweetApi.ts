import axios from 'axios'
import type {TweetDetails} from '../types/TweetInfo'
export const getTweetDetails =  async (username : string, tweetUuid : string) : Promise<TweetDetails> => {
    return axios.post('/get-tweet-detail',{
        username,
        tweetUuid
    }).then(response => {
        console.log(response.data)
        return response.data.data
    })
}
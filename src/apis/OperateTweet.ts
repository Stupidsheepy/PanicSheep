import axios from 'axios'
const likeTweet = async (tweetUuid: string, username: string, type: boolean): Promise<string> => {
  // return axios.get("/like-tweet", params: {
  //   tweetUuid: tweetUuid,
  //   username: username,
  //   type: type
  // })
  return axios.get("/like-tweet", {
    params:
    {
      tweetUuid: tweetUuid,
      username: username,
      type: type
    }
  })
}
const getAllTweets = (username: string, state : string) => {
  return axios.get(`/get-all-tweets/${state}`, {
    params: {
      username: username
    }
  }).then((res) =>{
    // tweetInfo List
    console.log(res.data)
    return res.data.data
  })
}
export { likeTweet, getAllTweets }

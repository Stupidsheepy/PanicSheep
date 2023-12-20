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

export { likeTweet }

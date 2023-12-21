import axios from 'axios'
export const likeTweet = async (tweetUuid: string, username: string, type: boolean): Promise<string> => {
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
export const getAllTweets = (username: string, state: string) => {
  return axios.get(`/get-all-tweets/${state}`, {
    params: {
      username: username
    }
  }).then((res) => {
    // tweetInfo List
    console.log(res.data)
    return res.data.data
  })
}

export const deleteTweet = (tweetUuid: string, username: string) => {
  return axios.delete('/delete-tweet', {
    params: {
      tweetUuid: tweetUuid,
      username: username
    }
  }).then((res) => {
    console.log(res.data)
    return res.data.data
  })
}

import axios from 'axios'
const RandomTweet = async (username: string): Promise<string> => {
    return axios.get("/get-random-tweet", {
        params: {
            username: username
        }
    })
}
export default RandomTweet

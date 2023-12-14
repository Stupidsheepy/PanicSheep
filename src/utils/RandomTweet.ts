import axios from 'axios'
const RandomTweet = async (username: string): Promise<string> => {
    return axios.get("/api/getRandomTweet", {
        params: {
            username: username
        }
    })
}
export default RandomTweet
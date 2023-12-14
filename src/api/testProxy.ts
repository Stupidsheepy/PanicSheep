import axios from "axios";
const TestProxy = async () => {
    return axios.get("http://localhost:8887/proxy").then(res => res.data)
}
export default TestProxy
import axios from "axios";
const testProxy = async () => {
  return await axios.get("http://localhost:8887/proxy").then(res => res.data).then(() => {
    elMsg("success connect to the backend", "success")
  })
}
export default testProxy

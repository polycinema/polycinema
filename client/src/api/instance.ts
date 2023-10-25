import axios from "axios";
const instance = axios.create({
        baseURL: "http://polycinema.test/api/v1/admin",
});
export default instance;
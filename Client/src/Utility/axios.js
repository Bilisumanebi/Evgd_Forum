import axios from 'axios';
const axiosInstance = axios.create({
      baseURL: 'http://localhost:4001/api',
});
export default axiosInstance;
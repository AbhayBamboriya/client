
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4052/api',
  withCredentials: true
});

export default axiosInstance;
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: 'AIzaSyBx4xQMHf82tRRd7nCEfe8W44s-r1_baDU',
  },
});

export default axiosInstance;

import axios from 'axios';

const axiosConfig = axios.create({ 
      // baseURL: 'http://localhost:5500/api',
    
      baseURL : 'https://evangadi-forum-group4-team2-1.onrender.com/api',
});

export default axiosConfig;
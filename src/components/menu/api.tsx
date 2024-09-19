import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/menu',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor if needed (for example, to handle authentication)
// api.interceptors.request.use(
//   config => {
//     // Modify request config here (for example, add a token if needed)
//     // config.headers['Authorization'] = `Bearer ${your_token}`;
//     return config;
//   },
//   error => Promise.reject(error)
// );

export const getCategories = () => {
  return api.get('/categories').then(response => {
    return response.data
  });
};

export const getProducts = () => {
  return api.get('').then(response => {
    return response.data
  });
};

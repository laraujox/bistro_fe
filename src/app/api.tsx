import axios from 'axios';
import { getCookie } from './utils';

const menuApi = axios.create({
  baseURL: 'http://localhost:8000/menu',
  headers: {
    'Content-Type': 'application/json',
  },
});
const orderApi = axios.create({
  baseURL: 'http://localhost:8000/order',
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
  return menuApi.get('/categories').then(response => {
    return response.data
  });
};

export const getProducts = () => {
  return menuApi.get('').then(response => {
    return response.data
  });
};

export const getOrders = () => {
  return orderApi.get('/').then(response => {
    return response.data
  });
};

export const upgradeOrderStatus = (orderId: number) => {
  return orderApi.post(`${orderId}/upgrade`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
    },
      }
  )
}

export const downgradeOrderStatus = (orderId: number) => {
  return orderApi.post(`${orderId}/downgrade`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
    }
    },
  )
}

import axios from 'axios';

const token = document.head.querySelector('meta[name="csrf-token"]');
const api = axios.create({
  baseURL: 'https://api.github.com'
});

if (token) {
  api.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('csrf-token not found.');
}

export default api;

import axios from 'axios'

const instance = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://albumaday.netlify.app'
})

export default instance
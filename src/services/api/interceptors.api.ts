import axios from 'axios'

import { API_URL } from '@/config/api.config'

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.withCredentials = true

const instance = axios.create({
	baseURL: API_URL
})

export default instance

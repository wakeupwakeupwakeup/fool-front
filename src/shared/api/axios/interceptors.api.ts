import axios from 'axios'

import { API_URL } from '@/shared/api/api.config'

export const instance = axios.create({
	baseURL: API_URL,
})

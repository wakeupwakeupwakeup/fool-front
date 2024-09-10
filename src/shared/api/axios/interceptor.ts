import axios from 'axios'
import { getInitData } from '@/entities/auth'

const initData = getInitData()
axios.interceptors.request.use(config => {
	console.log('DEV | INTERCEPTOR TRIGGERED')
	if (config.url !== '/login') config.headers.Authorization = initData
	return config
})

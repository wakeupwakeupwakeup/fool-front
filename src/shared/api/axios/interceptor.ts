import axios from 'axios'
import { getInitData } from '@/entities/auth'

const initData = getInitData()
axios.interceptors.request.use(config => {
	config.headers.Authorization = initData
	return config
})

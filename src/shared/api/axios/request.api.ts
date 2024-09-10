import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL } from '@/shared/api/api.config'
import { getInitData } from '@/entities/auth'

const instance = axios.create({
	baseURL: API_URL,
})
const initData = getInitData()

export async function request<T>(config: AxiosRequestConfig) {
	const onSuccess = (response: AxiosResponse<T>) => response.data
	const onError = (error: T) => {
		console.error('Request error: ', error)

		return Promise.reject(error)
	}
	instance.interceptors.request.use(config => {
		console.log('DEV | INTERCEPTOR TRIGGERED')
		if (config.url !== '/login') config.headers.Authorization = initData
		return config
	})
	return instance(config).then(onSuccess).catch(onError)
}

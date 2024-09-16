import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL } from '@/shared/api/api.config'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'

const instance = axios.create({
	baseURL: API_URL,
})
const { initDataRaw } = retrieveLaunchParams()

export async function request<T>(config: AxiosRequestConfig) {
	const onSuccess = (response: AxiosResponse<T>) => response.data
	const onError = (error: T) => {
		console.error('Request error: ', error)

		return Promise.reject(error)
	}
	instance.interceptors.request.use(config => {
		if (config.url !== '/login') config.headers.Authorization = initDataRaw
		return config
	})

	return instance(config).then(onSuccess).catch(onError)
}

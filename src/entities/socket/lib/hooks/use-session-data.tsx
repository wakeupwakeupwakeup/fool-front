import { retrieveLaunchParams, useInitData } from '@telegram-apps/sdk-react'

export function useSessionData() {
	const uuid = localStorage.getItem('game_uuid')
	const { initDataRaw } = retrieveLaunchParams()
	const initData = useInitData()
	const chatId = initData?.user?.id

	return { uuid, initDataRaw, chatId }
}

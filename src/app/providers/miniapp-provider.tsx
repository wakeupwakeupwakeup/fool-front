import { initSwipeBehavior, useMiniApp } from '@telegram-apps/sdk-react'
import { ReactElement, ReactNode } from 'react'

export function MiniAppProvider({
	children,
}: {
	children: ReactNode
}): ReactElement {
	const mp = useMiniApp()
	const [swipeBehavior] = initSwipeBehavior()
	mp.ready()
	swipeBehavior.disableVerticalSwipe()
	mp.setHeaderColor('#14001E')
	return <>{children}</>
}

import IcomoonReact from 'icomoon-react'
import { FC } from 'react'

import iconSet from '@/shared/assets/selection.json'

import { IIcon } from './icon.interface'

const Icon: FC<IIcon> = ({ color, size, icon, className }) => {
	return (
		<IcomoonReact
			className={className}
			iconSet={iconSet}
			color={color}
			size={size}
			icon={icon}
		/>
	)
}

export default Icon

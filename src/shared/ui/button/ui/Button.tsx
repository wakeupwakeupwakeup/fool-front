import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import Icon from '@/shared/ui/icon/Icon'
import * as config from '../model/button.config'
import { IButton } from '../model/button.interface'
import Typography from '@/shared/ui/typography/Typography'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	icon,
	variant,
	className,
	size = 'default',
	sizeIcon,
	...props
}) => {
	return (
		<button
			className={cn(
				className,
				'flex items-center relative justify-center w-full gap-base-x2 rounded-base-x1 bg-radial-gradient bg-gradient',
				[config.classes[size]],
			)}
			{...props}
		>
			{icon && <Icon icon={icon} color='#fff' size={sizeIcon || 25} />}
			{children && (
				<Typography variant={variant || 'button'}>
					{children}
				</Typography>
			)}
		</button>
	)
}

export default Button

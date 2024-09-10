import { FC, PropsWithChildren } from 'react'

import Icon from '@/shared/ui/icon/Icon'
import { IModal } from '../model/modal.interface'
import { Typography } from '@/shared/ui/typography'

const Modal: FC<PropsWithChildren<IModal>> = ({
	show,
	children,
	footer,
	header,
}) => {
	return (
		<>
			{show && (
				<>
					<div className='bg-[rgba(16,30,86,0.43)] bg-filter bg-repeat fixed top-0 bottom-0 right-0 left-0 z-30'></div>

					<div className='absolute inset-0 pb-base-x4 flex flex-col h-full justify-center px-[10%] z-50'>
						<div className='flex items-center justify-center gap-base-x2 py-base-x2 relative z-50 bg-radial-gradient w-full'>
							<Icon icon={header.icon} size={30} />
							<Typography variant='h1'>{header.title}</Typography>
						</div>
						<div className='flex-1 flex items-center justify-center mx-auto w-full'>
							{children}
						</div>
						{footer}
					</div>
				</>
			)}
		</>
	)
}
export default Modal

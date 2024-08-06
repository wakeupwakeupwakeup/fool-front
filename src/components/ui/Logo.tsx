import { FC } from 'react'

const Logo: FC = () => {
	return (
		<div className='flex flex-col mx-auto select-none'>
			<span className='text-base-x3 font-bold leading-none tracking-[.5em]'>
				Fool
			</span>
			<span className='text-base-x2 leading-none'>card game</span>
		</div>
	)
}

export default Logo

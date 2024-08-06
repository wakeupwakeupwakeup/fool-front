import { FC } from 'react'

const Loader: FC = () => {
	return (
		<div className='flex flex-row gap-2 justify-center items-center flex-1 h-full relative z-[99999999]'>
			<div className='mt-base-x1 w-3 h-3 rounded-full bg-white animate-bounce'></div>
			<div className='mt-base-x1 w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-.3s]'></div>
			<div className='mt-base-x1 w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-.5s]'></div>
		</div>
	)
}

export default Loader

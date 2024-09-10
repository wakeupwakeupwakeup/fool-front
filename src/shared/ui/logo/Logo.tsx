import { FC } from 'react'

const Logo: FC = () => {
	return (
		<div className='flex flex-col text-center mx-auto select-none'>
			<span className='uppercase text-3xl font-bold leading-none tracking-widest'>
				Fool
			</span>
			<span className='text-lg leading-none'>card game</span>
		</div>
	)
}

export default Logo

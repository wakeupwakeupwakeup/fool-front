import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '@/shared/assets/tapps.png'
import {
	deleteGame,
	deletePlace,
	IWebSocketResponse,
	saveGame,
	savePlace,
} from '@/entities/game'
import Modal from '@/shared/ui/modal/ui/Modal'
import Button from '@/shared/ui/button/ui/Button'
import { Typography } from '@/shared/ui/typography'

interface ModalContextProps {
	visible: boolean
	setVisible: (value: boolean) => void
	info: IWebSocketResponse | null
	setInfo: (value: IWebSocketResponse) => void
}

export const ModalContext = createContext<ModalContextProps>({
	visible: false,
	setVisible: () => {},
	info: null,
	setInfo: () => {},
})

export function ModalProvider({ children }) {
	const [visible, setVisible] = useState<boolean>(false)
	const navigate = useNavigate()
	const [info, setInfo] = useState<IWebSocketResponse | null>(null)

	const onSubmit = () => {
		setVisible(false)
		deleteGame()
		deletePlace()
		if (info) {
			saveGame(info.game)
			savePlace(info.place)
		}
		navigate('/game')
	}

	return (
		<ModalContext.Provider value={{ visible, setVisible, info, setInfo }}>
			{children}

			<Modal
				show={visible}
				handleClose={() => setVisible(false)}
				footer={
					<div className='flex w-full gap-base-x2'>
						<Button onClick={onSubmit}>Играть</Button>
						<Button
							onClick={() => setVisible(false)}
							icon='back'
							style={{ width: 63 }}
						/>
					</div>
				}
				header={{ title: 'Приглашение в игру', icon: 'fan' }}
			>
				{!!info && (
					<div className='flex w-full flex-col items-center gap-base-x4'>
						<img
							src={info.photo_url ? info.photo_url : avatar}
							alt=''
							className='h-base-x7 w-base-x7 rounded-base-x1'
						/>
						<Typography variant='text'>
							{info.username} приглашает Вас в игру
						</Typography>
						<div className='flex flex-col items-center gap-base-x2'>
							<Typography variant='h1'>
								Параметры игры:
							</Typography>
							<Typography variant='text'>
								Ставка:{' '}
								<span className='font-bold'>
									{info.game.bet} {info.game.currency}
								</span>
							</Typography>
							<Typography variant='text'>
								Тип игры:{' '}
								<span className='font-bold'>
									{info.game.type}
								</span>
							</Typography>
							<Typography variant='text'>
								Количество игроков:{' '}
								<span className='font-bold'>
									{info.game.playersNumber}
								</span>
							</Typography>
						</div>
					</div>
				)}
			</Modal>
		</ModalContext.Provider>
	)
}

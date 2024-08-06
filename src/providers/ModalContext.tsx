import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Modal, Typography } from '@/components/ui'

import { IWebSocketResponse } from '@/shared/types/game.interface'

import { saveGame, savePlace } from '@/services/game/game.helper'

import avatar from '@/assets/tapps.png'

interface ModalContextProps {
	visible: boolean
	setVisible: (value: boolean) => void
	info: IWebSocketResponse
	setInfo: (value: IWebSocketResponse) => void
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [visible, setVisible] = useState<boolean>(false)
	const navigate = useNavigate()
	const [info, setInfo] = useState<IWebSocketResponse | null>(null)

	const onSubmit = () => {
		setVisible(false)
		saveGame(info.game)
		savePlace(info.place)
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
					<div className='flex flex-col items-center gap-base-x4 w-full'>
						<img
							src={info.photo_url ? info.photo_url : avatar}
							alt=''
							className='w-base-x7 h-base-x7 rounded-base-x1'
						/>
						<Typography variant='text'>
							{info.username} приглашает Вас в игру
						</Typography>
						<div className='flex flex-col gap-base-x2 items-center'>
							<Typography variant='h1'>Параметры игры:</Typography>
							<Typography variant='text'>
								Ставка:{' '}
								<span className='font-bold'>
									{info.game.bet} {info.game.currency}
								</span>
							</Typography>
							<Typography variant='text'>
								Тип игры: <span className='font-bold'>{info.game.type}</span>
							</Typography>
							<Typography variant='text'>
								Количество игроков:{' '}
								<span className='font-bold'>{info.game.num_players}</span>
							</Typography>
						</div>
					</div>
				)}
			</Modal>
		</ModalContext.Provider>
	)
}

const useModal = () => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}

export { ModalProvider, useModal }

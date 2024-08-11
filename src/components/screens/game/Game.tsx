import { DragDropContext } from '@hello-pangea/dnd'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	Button,
	Icon,
	Layout,
	Loader,
	Modal,
	Typography
} from '@/components/ui'

import { getId } from '@/services/auth/auth.helper'
import { getGame, getPlace } from '@/services/game/game.helper'

import avatar from '@/assets/tapps.png'

import { WS_URL } from '@/config/api.config'

import { getWebSocket } from '@/websocket'

import { Fall, Fan, FlyingCard, Pack, Rivals, Table } from './components'
import { IRival, TPositionCard } from './game.interface'
import { addRival, playCard, ready } from './game.utils'
import { useGame } from './useGame'

const Game: FC = () => {
	const navigate = useNavigate()
	const game = getGame()
	const tg_id = getId()
	const place = getPlace()
	const { friends } = useGame()
	const game_ws = useRef<WebSocket | null>(null)

	const [rivals, setRivals] = useState<IRival[]>([])
	const [cardsOnTable, setCardsOnTable] = useState<string[][]>([])
	const [cards, setCards] = useState<string[]>([])

	const [placeRival, setPlaceRival] = useState<number>()
	const [isConnected, setIsConnected] = useState(false)
	const [trumpCard, setTrumpCard] = useState<string | null>(null)
	const [showModal, setShowModal] = useState(false)

	const [button, setButton] = useState(null)
	const [defendingPlayer, setDefendingPlayer] = useState(0)
	const [attackPlayer, setAttackPlayer] = useState(0)
	const [beatDeckLength, setBeatDeckLength] = useState<number | null>(null)
	const [remainingDeckLength, setRemainingDeckLength] = useState<number | null>(
		null
	)

	const [currentFlyingCards, setCurrentFlyingCards] = useState<ReactNode[]>([])
	const flyingCardsRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!game.id) navigate('/create-game')
	}, [])

	const global_ws = getWebSocket()

	useEffect(() => {
		const initWebSocket = () => {
			game_ws.current = new WebSocket(
				`${WS_URL}/ws/game/${game.id}/${tg_id}/${place}`
			)

			game_ws.current.onerror = error => {
				console.error('Game WebSocket error:', error)
				setIsConnected(false)
				setInterval(() => {
					game_ws.current = new WebSocket(
						`${WS_URL}/ws/game/${game.id}/${tg_id}/${place}`
					)
				}, 3000)
			}

			game_ws.current.onopen = () => {
				console.log('Game WebSocket connected')
				setIsConnected(true)
			}

			game_ws.current.onclose = () => {
				console.log('Game WebSocket disconnected')
				setIsConnected(false)
			}

			game_ws.current.onmessage = function (event) {
				const data = JSON.parse(event.data)
				console.log(data)
				switch (data.action) {
					case 'connect': {
						console.log('connect', data)

						if (JSON.stringify(data.players) !== JSON.stringify(rivals)) {
							setRivals(data.players.filter(item => item.tg_id != +tg_id))
						}
						return
					}
					case 'ready': {
						console.log('ready', data)
						setButton({
							action: 'ready',
							text: 'Готов'
						})
						return
					}
					case 'start': {
						console.log('start', data)
						let newRivals

						setTrumpCard(data.trump_card)
						setDefendingPlayer(data.defending_player)
						setAttackPlayer(data.current_player)
						setButton(null)
						setBeatDeckLength(data.beat_deck_length)
						setRemainingDeckLength(data.remaining_deck_length)
						setRivals(prevState => {
							newRivals = prevState.map(player => ({
								...player,
								countCards: data.players_cards[player.tg_id] || 0
							}))
							return prevState
						})
						setTimeout(() => {
							spawnCards(data.cards, newRivals)
						}, 0)
						return
					}
					case 'play_card': {
						console.log('play_card', data)
						return
					}
					case 'error': {
						console.log('error', data)
						return
					}
				}
			}
		}

		initWebSocket()

		return () => {
			setIsConnected(false)
		}
	}, [game.id, tg_id, place])

	const onSubmit = () => {
		switch (button.action) {
			case 'ready': {
				setButton(null)
				ready(game_ws.current)
			}
		}
	}

	useEffect(() => {
		if (!cardsOnTable.length && attackPlayer === Number(tg_id)) {
			setCardsOnTable([...cardsOnTable, []])
		}

		/*if (
			0 < cardsOnTable.length < 6 &&
			cardsOnTable[cardsOnTable.length - 1].length > 0 &&
			attackPlayer &&
			attackPlayer === +tg_id
		) {
			{
				setCardsOnTable([...cardsOnTable, []])
			}
		}*/
	}, [attackPlayer])

	// Пригласить игрока
	const handlerAddRival = (tg_id: number) => {
		addRival({ global_ws, tg_id, game_id: game.id, place: placeRival })
		setShowModal(false)
	}

	// Добавлять место приглашенного игрока
	const handlerShowModal = (place: number) => {
		setPlaceRival(place)
		setShowModal(true)
	}

	const addCard = (index: number) => {
		setCardsOnTable([...cardsOnTable.slice(0, -1), [cards[index]]])
		setCards([...cards.slice(0, index), ...cards.slice(index + 1)])
		playCard({ game_ws: game_ws.current, card: cards[index] })
	}

	const rivalAddCard = (card: string, rivalNum: number) => {
		let poses = [-400, -100, 160]
		spawnCardWithCords(
			card,
			[100, poses[rivalNum] + 25],
			[window.screen.availHeight / 2, -90],
			110,
			'top',
			true
		)

		setTimeout(() => {
			setCardsOnTable([...cardsOnTable.slice(0, -1), [card]])
		}, 600)
	}

	const rivalBeatCard = (card: string, rivalNum: number, cardPlaceIndex) => {
		let poses = [-400, -100, 160]
		spawnCardWithCords(
			card,
			[200, poses[rivalNum]],
			[window.screen.availHeight / 2, -90],
			110,
			'top',
			true
		)

		setTimeout(() => {
			setCardsOnTable([
				...cardsOnTable.slice(0, cardPlaceIndex),
				[...cardsOnTable[cardPlaceIndex], card],
				...cardsOnTable.slice(cardPlaceIndex + 1)
			])
		}, 600)
	}

	const rivalTakeCards = (rivalNum: number) => {
		let poses = [-400, -100, 160]
		spawnCardWithCords(
			'6_of_clubs',
			[window.screen.availHeight / 2 + 450, 0],
			[220, poses[rivalNum]],
			50,
			'bottom'
		)
		let takeCards = []
		cardsOnTable.forEach(card => {
			takeCards.push(card)
		})
		setCardsOnTable([])
		// rivalsInfo[rivalNum].numberOfCards += takeCards.length
	}

	const giveCardToRivals = (numCards: number[], newRivals: IRival[]) => {
		let poses = []
		let updateRivals = [...newRivals].map(rival => ({
			...rival,
			countCards: 0
		}))

		// Определение позиций
		if (numCards.length === 1) {
			poses = [-100]
		} else if (numCards.length === 2) {
			poses = [-400, -100]
		} else if (numCards.length === 3) {
			poses = [-400, -100, 160]
		}

		let totalCards = 0
		for (let i = 0; i < numCards.length; i++) {
			totalCards += numCards[i]
		}

		let delay = 0
		for (let i = 0; i < numCards.length; i++) {
			for (let j = 0; j < numCards[i]; j++) {
				setTimeout(() => {
					spawnCardWithCords(
						'',
						[250, -600],
						[100, poses[i]],
						50,
						'bottom',
						false
					)

					updateRivals[i].countCards += 1
					setRivals([...updateRivals])
				}, delay)
				delay += 200
			}
		}

		setTimeout(() => {
			setRivals([...updateRivals])
		}, delay + 500)
	}

	const beatCard = (cardIndex: number, cardPlaceIndex: number) => {
		setCardsOnTable([
			...cardsOnTable.slice(0, cardPlaceIndex),
			[...cardsOnTable[cardPlaceIndex], cards[cardIndex]],
			...cardsOnTable.slice(cardPlaceIndex + 1)
		])
		setCards([...cards.slice(0, cardIndex), ...cards.slice(cardIndex + 1)])
	}

	const spawnCard = (card: string) => {
		setCurrentFlyingCards([
			...currentFlyingCards,
			<FlyingCard
				key={Date.now() * Math.floor(Math.random() * 1000)}
				id={card}
				type={card}
				onPause={() => {}}
				from={[160, -300]}
				to={[window.screen.availHeight + 50, -50]}
				scale={100}
			/>
		])
		setTimeout(() => {
			setCards(actual => {
				return [card, ...actual]
			})
		}, 200)
	}

	const spawnCardWithCords = (
		card: string = 'cover',
		from: number[],
		to: number[],
		scale: number = 78,
		position: TPositionCard = 'top',
		animation: boolean = false
	) => {
		setCurrentFlyingCards([
			...currentFlyingCards,
			<FlyingCard
				key={Date.now()}
				id={card}
				type={card}
				onPause={() => {}}
				from={from}
				to={to}
				scale={scale}
				position={position}
				animation={animation}
			/>
		])
	}

	const fallCards = () => {
		if (cardsOnTable.length == 6) {
			try {
				setTimeout(() => {
					spawnCardWithCords(
						'6_of_clubs',
						[window.screen.availHeight / 2 - 160, -144],
						[160, 300]
					)
					setCardsOnTable([])
				}, 3000)
				setTimeout(() => {
					spawnCardWithCords(
						'6_of_clubs',
						[window.screen.availHeight / 2 - 160, -50],
						[150, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -5)])
				}, 2500)

				setTimeout(() => {
					spawnCardWithCords(
						'6_of_clubs',
						[window.screen.availHeight / 2 - 10, -144],
						[150, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -4)])
				}, 2000)

				setTimeout(() => {
					spawnCardWithCords(
						'6_of_clubs',
						[window.screen.availHeight / 2 - 10, -50],
						[140, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -3)])
				}, 1500)

				setTimeout(() => {
					spawnCardWithCords(
						'6_of_clubs',
						[window.screen.availHeight / 2 + 160, -144],
						[130, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -2)])
				}, 1000)
				setTimeout(() => {
					spawnCardWithCords(
						'6_of_clubs',
						[window.screen.availHeight / 2 + 160, -50],
						[120, 300]
					)
					setCardsOnTable([...cardsOnTable.slice(0, -1)])
				}, 500)
			} catch {
				setCardsOnTable([])
			}
		} else {
			spawnCardWithCords(
				'6_of_clubs',
				[window.screen.availHeight / 2, 0],
				[160, 300]
			)
			setCardsOnTable([])
		}
	}

	const takeCards = () => {
		spawnCardWithCords(
			'6_of_clubs',
			[window.screen.availHeight / 2, 0],
			[window.screen.availHeight + 50, -50]
		)
		let a = []
		cardsOnTable.forEach(aa => {
			a.push(aa)
		})
		setCardsOnTable([])
		setTimeout(() => {
			setCards([...a, ...cards])
		}, 200)
	}

	const spawnCards = (data: string[], newRivals: IRival[]) => {
		const newCards = data.filter(card => !cards.includes(card))
		const numCards = newRivals.map(rival => rival.countCards || 0)
		let delay = 0
		newCards.forEach((card, index) => {
			delay += index * 200
			setTimeout(() => {
				spawnCard(card)
			}, index * 200)
		})

		setTimeout(() => {
			giveCardToRivals(numCards, newRivals)
		}, 0)
	}

	function onDragEnd(result: any) {
		let destinationName = result.destination?.droppableId || ''
		if (destinationName.startsWith('droppable-table-card')) {
			const destinationIndex = +destinationName.replace(
				'droppable-table-card-',
				''
			)
			// подкинуть карту
			if (!cardsOnTable[destinationIndex].length) {
				addCard(result.source.index)
			}
			// побить карту
			else {
				if (
					cardsOnTable[destinationIndex].length === 1 &&
					defendingPlayer === +tg_id
				) {
					beatCard(result.source.index, destinationIndex)
				}
			}
		}
	}

	if (!isConnected) return <Loader />

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Layout
				noLogo
				className='flex flex-col items-center justify-berween h-full relative'
			>
				<div
					ref={flyingCardsRef}
					className='floating-cards overflow-visible w-0 h-0 relative'
				>
					{currentFlyingCards}
				</div>
				{/*<div className={'flex flex-row items-center justify-between'}>
					<button onClick={fallCards}>DEV fall</button>
					<button onClick={takeCards}>DEV take</button>
					<button
						onClick={() => {
							rivalAddCard({ suit: 'spades', value: 8 }, 1)
						}}
					>
						DEV rival add card
					</button>
					<button
						onClick={() => {
							rivalBeatCard({ suit: 'spades', value: 8 }, 1, 0)
						}}
					>
						DEV rival beat card
					</button>
					<button
						onClick={() => {
							rivalTakeCards(1)
						}}
					>
						DEV rivals take
					</button>
				</div>*/}
				<Rivals
					rivals={rivals}
					defendingPlayer={defendingPlayer}
					attackPlayer={attackPlayer}
					handlerShowModal={handlerShowModal}
				/>
				<div className='flex gap-base-x2 mt-base-x7'>
					<Icon size={26} icon={game.currency} />
					<Typography variant='h1'>{game.bet}</Typography>
				</div>
				<Fall beatDeckLength={beatDeckLength} />
				<Pack trumpCard={trumpCard} remainingDeckLength={remainingDeckLength} />

				<Table cardsOnTable={cardsOnTable} defendingPlayer={defendingPlayer} />
				<Fan
					cards={cards}
					onSubmit={onSubmit}
					buttonText={button?.text}
					defendingPlayer={defendingPlayer}
					attackPlayer={attackPlayer}
				/>

				<Modal
					show={showModal}
					handleClose={() => setShowModal(false)}
					header={{ icon: 'swords', title: 'Соперники' }}
					footer={<Button onClick={() => setShowModal(false)}>Готово</Button>}
				>
					<div className='flex flex-col gap-base-x4 w-full'>
						{friends &&
							friends.map(item => (
								<button
									onClick={() => handlerAddRival(item.tg_id)}
									className='flex justify-between items-center gap-base-x3 pr-base-x2 w-full rounded-base-x1 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.29)_100%)]'
									key={item.tg_id}
								>
									<div className='flex items-center gap-base-x5'>
										<img
											src={item.photo_url ? item.photo_url : avatar}
											alt=''
											className='w-base-x7 h-base-x7 rounded-base-x1'
										/>
										<Typography variant='text'>{item.username}</Typography>
									</div>
								</button>
							))}
					</div>
				</Modal>
			</Layout>
		</DragDropContext>
	)
}

export default Game

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
import {
	deleteGame,
	deletePlace,
	getGame,
	getPlace
} from '@/services/game/game.helper'

import avatar from '@/assets/tapps.png'

import { WS_URL } from '@/config/api.config'

import { getWebSocket } from '@/websocket'

import { Fall, Fan, FlyingCard, Pack, Rivals, Table } from './components'
import { IPlayer, TPositionCard } from './game.interface'
import {
	addRival,
	beat,
	defendCard,
	playCard,
	ready,
	take,
	throwInCard
} from './game.utils'

const Game: FC = () => {
	const navigate = useNavigate()
	const game = getGame()
	const tg_id = getId()
	const place = getPlace()
	const [friends, setFriends] = useState<IPlayer[]>([])
	const game_ws = useRef<WebSocket | null>(null)

	const [player, setPlayer] = useState<IPlayer>()
	const [rivals, setRivals] = useState<IPlayer[]>([])
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
			switch (data.action) {
				case 'connect': {
					console.log('connect', data)

					setFriends(data.friends)
					setRivals(data.players.filter(item => item.tg_id != tg_id))
					setPlayer(data.players.filter(item => item.tg_id === tg_id)[0])
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
					setButton(null)
					setBeatDeckLength(data.beat_deck_length)
					setRemainingDeckLength(data.remaining_deck_length)
					setAttackPlayer(data.current_player)
					setDefendingPlayer(data.defending_player)
					setRivals(prevState => {
						newRivals = prevState.map(item => ({
							...item,
							countCards: data.players_cards[item.tg_id] || 0
						}))
						return prevState
					})
					setTimeout(() => {
						spawnCards(data.cards, newRivals, true)
					}, 0)
					return
				}
				case 'throw_in_card':
				case 'play_card': {
					console.log(data.action, data)

					if (data.current_player === tg_id) {
						setCards(data.cards)
						setCardsOnTable(Object.entries(data.cards_on_table) as any)
					} else {
						rivalAddCard(
							Object.entries(data.cards_on_table) as any,
							data.card,
							data.current_player
						)
					}
					if (data.defending_player === tg_id) {
						setButton({
							action: 'take',
							text: 'Взять'
						})
					}
					setRivals(prevState =>
						prevState.map(item => ({
							...item,
							countCards: data.players_cards[item.tg_id] || 0
						}))
					)
					return
				}
				case 'error': {
					console.log('error', data)
					return
				}
				case 'take_cards': {
					console.log('take_cards', data)

					if (data.defending_player === tg_id) {
						setCards(data.cards)
					} else {
						rivalTakeCards(data.defending_player)
					}

					return
				}
				case 'end_turn': {
					console.log('end_turn', data)

					setButton(null)
					setAttackPlayer(data.current_player)
					if (data.current_player === tg_id) {
						setCardsOnTable([[]])
					} else {
						setCardsOnTable([])
					}
					setBeatDeckLength(data.beat_deck_length)
					setRemainingDeckLength(data.remaining_deck_length)
					setDefendingPlayer(data.defending_player)
					setRivals(prevState =>
						prevState.map(player => ({
							...player,
							countCards: data.players_cards[player.tg_id] || 0
						}))
					)
					setCards(data.cards)

					// Добавить спавн карт

					/*let oldRival = []
					let newRivals = []

					setRivals(prevState => {
						oldRival = prevState
						return prevState
					})

					setTimeout(() => {
						oldRival.forEach(item => {
							newRivals.push({
								...item,
								countCards: data.players_cards[item.tg_id]
							})
						})

						spawnCards(data.cards, newRivals, false, oldRival)
					}, 0)*/
					return
				}
				case 'beat': {
					console.log('beat', data)

					beatCards()

					return
				}
				case 'defend_card': {
					console.log('defend_card', data)

					setCards(data.cards)
					setRivals(prevState =>
						prevState.map(player => ({
							...player,
							countCards: data.players_cards[player.tg_id] || 0
						}))
					)

					if (data.current_player === tg_id) {
						setCardsOnTable([
							...(Object.entries(data.cards_on_table) as any),
							[]
						])
					} else {
						setCardsOnTable(Object.entries(data.cards_on_table) as any)
					}

					if (data.current_player === tg_id && game.num_players === 2) {
						setButton({
							text: 'Бита',
							action: 'beat'
						})
					} else if (data.defending_player !== tg_id) {
						setButton({
							text: 'Пас',
							action: 'pass'
						})
					}

					return
				}
				case 'end_game': {
					deleteGame()
					deletePlace()
					game_ws.current.close()
					navigate('/result-game', {
						players: data.players
					})
					return
				}
			}
		}

		return () => {
			setIsConnected(false)
		}
	}, [game.id, tg_id, place, game_ws])

	const onSubmit = () => {
		switch (button.action) {
			case 'ready': {
				setButton(null)
				ready(game_ws.current)
				return
			}
			case 'take': {
				setButton(null)
				take(game_ws.current)
				if (defendingPlayer === tg_id) takeCards()
				return
			}
			case 'beat': {
				setButton(null)
				beat(game_ws.current)
				return
			}
			case 'pass': {
				setButton(null)
				return
			}
		}
	}

	useEffect(() => {
		if (!cardsOnTable.length && attackPlayer === tg_id) {
			console.log('set cardsOnTable')
			setCardsOnTable([...cardsOnTable, []])
		}

		/*if (
			0 < cardsOnTable.length < 6 &&
			cardsOnTable[cardsOnTable.length - 1]?.length > 0 &&
			attackPlayer === tg_id
		) {
			setCardsOnTable([...cardsOnTable, []])
		}*/
	}, [attackPlayer])

	// Пригласить игрока
	const handlerAddRival = (tg_id: number) => {
		addRival(global_ws, tg_id, game.id, placeRival)
		setShowModal(false)
	}

	// Добавлять место приглашенного игрока
	const handlerShowModal = (place: number) => {
		setPlaceRival(place)
		setShowModal(true)
	}

	// Соперник кладет карту (добавление на стол)
	const rivalAddCard = (
		cards_on_table: string[][],
		card: string,
		rivalId: number
	) => {
		const rivalNum = rivals.findIndex(item => item.tg_id === rivalId) + 1
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
			setCardsOnTable([...cards_on_table.slice(0, -1), [card]])
		}, 600)
	}

	const rivalBeatCard = (card: string, rivalId: number, cardPlaceIndex) => {
		const rivalNum = rivals.findIndex(item => item.tg_id === rivalId) + 1

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

	const rivalTakeCards = (rivalId: number) => {
		const rivalNum = rivals.findIndex(item => item.tg_id === rivalId) + 1

		let poses = [-400, -100, 160]
		spawnCardWithCords(
			'6_of_clubs',
			[window.screen.availHeight / 2 + 450, 0],
			[220, poses[rivalNum]],
			50,
			'bottom'
		)
	}

	const giveCardToRivals = (
		numCards: number[],
		newRivals: IPlayer[],
		isStart?: boolean
	) => {
		let poses = []
		let updateRivals = isStart
			? newRivals.map(rival => ({
					...rival,
					countCards: 0
			  }))
			: newRivals.map((rival, index) => ({
					...rival,
					countCards: rival.countCards - numCards[index]
			  }))

		// console.log('updateRivals', updateRivals)

		// Определение позиций
		if (numCards.length === 1) {
			poses = [-100]
		} else if (numCards.length === 2) {
			poses = [-400, -100]
		} else if (numCards.length === 3) {
			poses = [-400, -100, 160]
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
			setRivals(updateRivals)
		}, delay + 500)

		// console.log(updateRivals)
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

	const beatCards = () => {
		spawnCardWithCords('cover', [window.screen.availHeight / 2, 0], [160, 300])
	}

	const takeCards = () => {
		spawnCardWithCords(
			'6_of_clubs',
			[window.screen.availHeight / 2, 0],
			[window.screen.availHeight + 50, -50]
		)
	}

	const spawnCards = (
		data: string[],
		newRivals: IPlayer[],
		isStart?: boolean,
		oldRival?: IPlayer[]
	) => {
		const numCards = isStart
			? newRivals.map(rival => rival.countCards || 0)
			: oldRival.map(
					rival =>
						newRivals.find(newRival => newRival.tg_id === rival.tg_id)
							.countCards - rival.countCards
			  )
		let currentCards = []
		console.log(cards)
		setCards(prevState => {
			// console.log(prevState)
			currentCards = prevState
			return prevState
		})
		console.log(currentCards)
		setTimeout(() => {
			// console.log(currentCards)

			const newCards = data.filter(card => !currentCards.includes(card))
			// console.log(newCards)

			newCards.forEach((card, index) => {
				setTimeout(() => {
					spawnCard(card)
				}, index * 200)
			})
		}, 0)

		setTimeout(() => {
			giveCardToRivals(numCards, newRivals, isStart)
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
				if (cardsOnTable.length === 1) {
					playCard(game_ws.current, cards[result.source.index])
				} else {
					throwInCard(game_ws.current, cards[result.source.index])
				}
			}
			// побить карту
			else {
				if (
					cardsOnTable[destinationIndex].length === 1 &&
					defendingPlayer === tg_id
				) {
					defendCard(
						game_ws.current,
						cards[result.source.index],
						cardsOnTable[destinationIndex][0]
					)
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
					player={player}
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

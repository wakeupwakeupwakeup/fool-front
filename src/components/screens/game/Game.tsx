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
	nextThrow,
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
	const [oldCardsOnTable, setOldCardsOnTable] = useState<string[][]>([])
	const [cards, setCards] = useState<string[]>([])
	const [oldCards, setOldCards] = useState<string[]>([])

	const [placeRival, setPlaceRival] = useState<number>()
	const [isConnected, setIsConnected] = useState(false)
	const [trumpCard, setTrumpCard] = useState<string | null>(null)
	const [showModal, setShowModal] = useState(false)

	const [button, setButton] = useState(null)
	const [defendingPlayer, setDefendingPlayer] = useState<string | null>(null)
	const [attackPlayer, setAttackPlayer] = useState<string | null>(null)
	const [beatDeckLength, setBeatDeckLength] = useState<number | null>(null)
	const [remainingDeckLength, setRemainingDeckLength] = useState<number | null>(
		null
	)

	const [currentFlyingCards, setCurrentFlyingCards] = useState<ReactNode[]>([])
	const flyingCardsRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!game) navigate('/menu')

		return () => {
			game_ws.current.close()
		}
	}, [])

	const global_ws = getWebSocket()

	useEffect(() => {
		game_ws.current = new WebSocket(
			`${WS_URL}/ws/game/${game.id}/${tg_id}/${place}`
		)

		game_ws.current.onerror = error => {
			console.error('Game WebSocket error:', error)
			setIsConnected(false)
			navigate(0)
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
			navigate(0)
			setInterval(() => {
				game_ws.current = new WebSocket(
					`${WS_URL}/ws/game/${game.id}/${tg_id}/${place}`
				)
			}, 3000)
		}

		game_ws.current.onmessage = function (event) {
			const data = JSON.parse(event.data)
			switch (data.action) {
				case 'connect': {
					console.log('connect', data)

					setFriends(data.friends)
					setPlayer(
						data.players.find(item => Number(item.tg_id) === Number(tg_id))
					)

					const index = data.players.findIndex(
						item => Number(item.tg_id) === Number(tg_id)
					)
					const newRivals = [
						...data.players.slice(index + 1),
						...data.players.slice(0, index)
					]
					setRivals(newRivals)
					return
				}
				case 'start': {
					console.log('start', data)

					setCards([])
					setButton(null)

					if (
						data.next_throwing_player === tg_id &&
						Object.entries(data.cards_on_table).every(
							([key, value]) => !!key && !!value
						)
					) {
						setCardsOnTable([
							...(Object.entries(data.cards_on_table) as any),
							[]
						])
					} else {
						setCardsOnTable(Object.entries(data.cards_on_table) as any)
					}

					if (
						data.defending_player === tg_id &&
						!Object.entries(data.cards_on_table).every(
							([key, value]) => !!key && !!value
						)
					) {
						setButton({
							action: 'take',
							text: 'Взять'
						})
					}

					if (
						data.next_throwing_player === tg_id &&
						Object.entries(data.cards_on_table).length &&
						Object.entries(data.cards_on_table).every(
							([key, value]) => !!key && !!value
						)
					) {
						if (
							game.num_players === 2 ||
							!Object.entries(data.players_cards).every(
								([key, value]) => key === data.defending_player || !!value
							)
						) {
							setButton({
								text: 'Бита',
								action: 'beat'
							})
						} else {
							setButton({
								text: 'Пас',
								action: 'next_throw'
							})
						}
					}

					setTrumpCard(data.trump_card)
					setBeatDeckLength(data.beat_deck_length)
					setRemainingDeckLength(data.remaining_deck_length)
					setAttackPlayer(data.current_player)
					setPlayer(data.players.find(item => item.tg_id == tg_id))
					setDefendingPlayer(data.defending_player)
					setRivals(prevState => {
						const newRivals = prevState.map(item => ({
							...item,
							countCards: data.players_cards[item.tg_id] || 0
						}))

						spawnCards(data.cards, newRivals, true)

						return newRivals
					})
					return
				}
				case 'throw_in_card':
				case 'play_card': {
					console.log(data.action, data)

					setButton(null)
					setCards(data.cards)
					if (data.next_throwing_player === tg_id) {
						setCardsOnTable(Object.entries(data.cards_on_table) as any)
					} else {
						rivalAddCard(
							data.players_cards,
							Object.entries(data.cards_on_table) as any,
							data.card,
							data.next_throwing_player
						)
					}
					if (
						data.defending_player === tg_id &&
						!Object.entries(data.cards_on_table).every(
							([key, value]) => !!key && !!value
						)
					) {
						setButton({
							action: 'take',
							text: 'Взять'
						})
					}
					if (data.next_throwing_player === tg_id && game.num_players > 2) {
						if (
							Object.entries(data.players_cards).every(
								([key, value]) => key === data.defending_player || !!value
							)
						) {
							setButton({
								text: 'Пас',
								action: 'next_throw'
							})
						} else {
							setButton({
								text: 'Бита',
								action: 'beat'
							})
						}
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
					setTimeout(() => {
						setOldCards(prevState => {
							setCards(prevState)

							return prevState
						})
						setOldCardsOnTable(prevState => {
							setCardsOnTable(prevState)

							return prevState
						})
					}, 200)
					return
				}
				case 'take_cards': {
					console.log('take_cards', data)

					if (data.defending_player === tg_id) {
						setCards(data.cards)
					} else {
						rivalTakeCards(data.players_cards, data.defending_player)
					}
					setRivals(prevState =>
						prevState.map(player => ({
							...player,
							countCards: data.players_cards[player.tg_id] || 0
						}))
					)
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
					setCards(data.cards)

					// Добавить спавн карт

					let oldRivals = []
					let newRivals = []

					setRivals(prevState => {
						oldRivals = prevState
						return prevState
					})
					setTimeout(() => {
						oldRivals.forEach(item => {
							newRivals.push({
								...item,
								countCards: data.players_cards[item.tg_id]
							})
						})

						spawnCards(data.cards, newRivals, false, oldRivals)
					}, 600)
					return
				}
				case 'beat': {
					console.log('beat', data)

					spawnCardWithCords(
						'cover',
						[window.innerHeight / 2, 0],
						[160, 300],
						78,
						'bottom'
					)

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

					if (data.defending_player !== tg_id) {
						rivalBeatCard(
							data.players_cards,
							data.card,
							data.defending_player,
							Object.entries(data.cards_on_table) as any,
							data.next_throwing_player
						)
					}

					if (data.next_throwing_player !== tg_id) {
						setCardsOnTable(Object.entries(data.cards_on_table) as any)
					}

					if (
						data.defending_player === tg_id &&
						Object.entries(data.cards_on_table).every(
							([key, value]) => !!key && !!value
						)
					) {
						setButton(null)
					}

					if (data.current_player === tg_id && game.num_players === 2) {
						setButton({
							text: 'Бита',
							action: 'beat'
						})
					}
					if (data.next_throwing_player === tg_id && game.num_players > 2) {
						if (
							Object.entries(data.cards_on_table).length < 6 &&
							Object.entries(data.players_cards).every(
								([key, value]) => key === data.defending_player || !!value
							)
						) {
							setButton({
								text: 'Пас',
								action: 'next_throw'
							})
						} else {
							setButton({
								text: 'Бита',
								action: 'beat'
							})
						}
					}

					return
				}
				case 'next_throw': {
					console.log('next_throw', data)

					setAttackPlayer(data.next_throwing_player)
					setCardsOnTable(Object.entries(data.cards_on_table) as any)

					if (
						data.defending_player === tg_id &&
						!Object.entries(data.cards_on_table).every(
							([key, value]) => !!key && !!value
						)
					) {
						setButton({
							action: 'take',
							text: 'Взять'
						})
					} else {
						setButton(null)
					}

					if (
						data.next_throwing_player === tg_id &&
						data.next_throwing_player !== data.current_player &&
						data.players_cards[tg_id] &&
						Object.entries(data.players_cards).every(
							([key, value]) => key === data.defending_player || !!value
						)
					) {
						if (Object.entries(data.cards_on_table).length < 6) {
							setCardsOnTable([
								...(Object.entries(data.cards_on_table) as any),
								[]
							])
							setButton({
								text: 'Пас',
								action: 'next_throw'
							})
						} else {
							setButton({
								text: 'Бита',
								action: 'beat'
							})
						}
					}

					if (
						data.next_throwing_player === tg_id &&
						data.next_throwing_player !== data.current_player &&
						!Object.entries(data.players_cards).every(
							([key, value]) => key === data.defending_player || !!value
						)
					) {
						if (
							Object.entries(data.cards_on_table).length < 6 &&
							data.players_cards[tg_id]
						) {
							setCardsOnTable([
								...(Object.entries(data.cards_on_table) as any),
								[]
							])
						}
						setButton({
							text: 'Бита',
							action: 'beat'
						})
					}

					if (
						data.next_throwing_player === data.current_player &&
						data.current_player === tg_id
					) {
						if (Object.entries(data.cards_on_table).length < 6) {
							setCardsOnTable([
								...(Object.entries(data.cards_on_table) as any),
								[]
							])
						}
						if (Object.values(data.cards_on_table).every(Boolean)) {
							setButton({
								text: 'Бита',
								action: 'beat'
							})
						}
					}

					return
				}
				case 'end_game': {
					deleteGame()
					deletePlace()
					game_ws.current.close()
					navigate('/result-game', {
						state: {
							players: data.players
						}
					})
					return
				}
			}
		}

		return () => {
			setIsConnected(false)
			game_ws.current.close()
		}
	}, [game?.id, tg_id, place, game_ws])

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
				if (defendingPlayer === tg_id) {
					spawnCardWithCords(
						'cover',
						[window.innerHeight / 2, 0],
						[window.innerHeight + 50, -50]
					)
				}
				return
			}
			case 'beat': {
				setButton(null)
				beat(game_ws.current)
				return
			}
			case 'next_throw': {
				setButton(null)
				nextThrow(game_ws.current)
				return
			}
		}
	}

	useEffect(() => {
		if (
			!cardsOnTable.length &&
			cardsOnTable.length < 6 &&
			attackPlayer === tg_id
		) {
			setCardsOnTable([...cardsOnTable, []])
		}
	}, [attackPlayer])

	// Пригласить игрока
	const handlerAddRival = (tg_id: string) => {
		addRival(global_ws, tg_id, game.id, placeRival)
		setShowModal(false)
	}

	// Добавлять место приглашенного игрока
	const handlerShowModal = (place: number) => {
		if (Number(tg_id) === Number(game.host)) {
			setPlaceRival(place)
			setShowModal(true)
		}
	}

	// Соперник кладет карту (добавление на стол)
	const rivalAddCard = (
		players_cards: Object,
		cards_on_table: string[][],
		card: string,
		rivalId: string
	) => {
		const rivalNum = Object.keys(players_cards).indexOf(String(rivalId))

		let poses = []

		if (game.num_players === 2) {
			poses = [-100]
		} else if (game.num_players === 3) {
			poses = [-400, 200]
		} else if (game.num_players === 4) {
			poses = [-400, -100, 200]
		}
		spawnCardWithCords(
			card,
			[100, poses[rivalNum]],
			[window.innerHeight / 2, -60],
			100,
			'top',
			true
		)

		setTimeout(() => {
			setCardsOnTable([...cards_on_table.slice(0, -1), [card]])
		}, 600)
	}

	// Соперник отбивает карту
	const rivalBeatCard = (
		players_cards: Object,
		card: string,
		rivalId: string,
		cards_on_table,
		attack_player
	) => {
		const rivalNum = Object.keys(players_cards).indexOf(String(rivalId))
		let poses = []

		if (game.num_players === 2) {
			poses = [-100]
		} else if (game.num_players === 3) {
			poses = [-400, 200]
		} else if (game.num_players === 4) {
			poses = [-400, -100, 200]
		}

		spawnCardWithCords(
			card,
			[100, poses[rivalNum]],
			[window.innerHeight / 2, -60],
			100,
			'top',
			true
		)

		setTimeout(() => {
			if (attack_player === tg_id && cards_on_table.length < 6) {
				setCardsOnTable([...cards_on_table, []])
			} else {
				setCardsOnTable([...cards_on_table])
			}
		}, 600)
	}

	// Соперник берет карты
	const rivalTakeCards = (players_cards: Object, rivalId: string) => {
		const rivalNum = Object.keys(players_cards).indexOf(String(rivalId))
		let poses = []

		if (game.num_players === 2) {
			poses = [-100]
		} else if (game.num_players === 3) {
			poses = [-400, 200]
		} else if (game.num_players === 4) {
			poses = [-400, -100, 200]
		}

		spawnCardWithCords(
			'6_of_clubs',
			[window.innerHeight / 2, -60],
			[100, poses[rivalNum]],
			50,
			'bottom'
		)
	}

	// Раздача карт соперникам
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
			poses = [-400, 200]
		} else if (numCards.length === 3) {
			poses = [-400, -100, 200]
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

	// Раздача карт
	const spawnCard = (card: string) => {
		setCurrentFlyingCards([
			...currentFlyingCards,
			<FlyingCard
				key={Date.now()}
				type={card}
				from={[160, -300]}
				to={[window.innerHeight + 50, -50]}
				scale={100}
				animation={true}
			/>
		])
		setTimeout(() => {
			setCards(actual => {
				return [...actual, card]
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
				type={card}
				from={from}
				to={to}
				scale={scale}
				position={position}
				animation={animation}
			/>
		])
	}

	// Раздача карт всем игрокам
	const spawnCards = (
		data: string[],
		newRivals: IPlayer[],
		isStart?: boolean,
		oldRivals?: IPlayer[]
	) => {
		let delay = 0

		// Раздача карт в начале игры
		if (isStart) {
			data.forEach((card, index) => {
				setTimeout(() => {
					spawnCard(card)
				}, index * 200)
				delay += index * 100
			})
		} else {
			// Раздача карт
			/*let currentCards = []
            setCards(prevState => {
                prevState.map(item => {
                    currentCards.push(item)
                })
                return prevState
            })
            console.log(currentCards)
            const newCards = data.filter(card => !currentCards.includes(card))

            newCards.forEach((card, index) => {
                setTimeout(() => {
                    spawnCard(card)
                }, index * 200)
                delay += index * 200
            })*/
		}

		console.log('newRivals', newRivals)
		console.log('oldRivals', oldRivals)
		console.log('isStart', isStart)
		// Массив новых карт соперников
		const numCards = isStart
			? newRivals.map(rival => rival.countCards || 0)
			: !!oldRivals?.length
			? oldRivals?.map(
					rival =>
						newRivals.find(newRival => newRival.tg_id === rival.tg_id)
							.countCards - rival.countCards
			  )
			: []
		console.log('numCards', numCards)

		setTimeout(() => {
			giveCardToRivals(numCards, newRivals, isStart)
		}, delay)
	}

	// Положить карту на стол
	function onDragEnd(result: any) {
		let destinationName = result.destination?.droppableId || ''
		if (destinationName.startsWith('droppable-table-card')) {
			const destinationIndex = +destinationName.replace(
				'droppable-table-card-',
				''
			)

			// подкинуть карту
			const currentRivalCountCards = rivals.find(
				rival => rival.tg_id === defendingPlayer
			)?.countCards
			if (
				!cardsOnTable[destinationIndex].length &&
				currentRivalCountCards !== 0
			) {
				if (cardsOnTable.length === 1) {
					playCard(game_ws.current, cards[result.source.index])
					console.log(cardsOnTable)
					setOldCardsOnTable(cardsOnTable)
					setOldCards(cards)
					setCardsOnTable([
						...cardsOnTable.slice(0, -1),
						[cards[result.source.index]]
					])
					setCards([
						...cards.slice(0, result.source.index),
						...cards.slice(result.source.index + 1)
					])
				} else {
					setOldCardsOnTable(cardsOnTable)
					setOldCards(cards)
					throwInCard(game_ws.current, cards[result.source.index])
					setCardsOnTable([
						...cardsOnTable.slice(0, -1),
						[cards[result.source.index]]
					])
					setCards([
						...cards.slice(0, result.source.index),
						...cards.slice(result.source.index + 1)
					])
				}
			}
			// побить карту
			else {
				if (
					cardsOnTable[destinationIndex].filter(item => item !== null)
						.length === 1 &&
					defendingPlayer === tg_id
				) {
					setOldCardsOnTable(cardsOnTable)
					setOldCards(cards)
					setCardsOnTable([
						...cardsOnTable.slice(0, destinationIndex),
						[...cardsOnTable[destinationIndex], cards[result.source.index]],
						...cardsOnTable.slice(destinationIndex + 1)
					])
					setCards([
						...cards.slice(0, result.source.index),
						...cards.slice(result.source.index + 1)
					])
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
				className='flex select-none flex-col items-center justify-berween h-full relative'
			>
				<div
					ref={flyingCardsRef}
					className='floating-cards overflow-visible relative z-10 w-0 h-0'
				>
					{currentFlyingCards}
				</div>
				<Rivals
					rivals={rivals}
					defendingPlayer={defendingPlayer}
					attackPlayer={attackPlayer}
					handlerShowModal={handlerShowModal}
				/>
				<div className='absolute flex gap-base-x2 top-40'>
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

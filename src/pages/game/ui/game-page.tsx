import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getId } from '@/entities/auth/lib/auth.helper'

import { Fall, FlyingCard, Pack, Rivals } from './components'
import { ICurrentPlayer, TPositionCard } from '../model/game.interface'
import {
	attack,
	beat,
	defendCard,
	nextThrow,
	playCard,
	ready,
	take,
	throwInCard,
} from '../lib/game.utils'
import Layout from '@/app/layout/Layout'
import Loader from '@/shared/ui/loader/Loader'
import Icon from '@/shared/ui/icon/Icon'
import { Typography } from '@/shared/ui/typography'
import { useSelector } from 'react-redux'
import { RootState } from '@/app'
import { TPlayer } from '@/entities/player/model/player.model'
import { SocketConnection } from '@/entities/socket/model/socket-factory'
import {
	putAttackCardOnTable,
	removeCardFromHand,
} from '@/entities/game/model/game-session.slice'
import { Fan } from '@/pages/game/ui/components/Fan'
import { Table } from '@/pages/game/ui/components/Table'
import { DndProvider, useDragDropManager } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { GameTable } from '@/widgets/game/table/ui/game-table'
import { Hand } from '@/widgets/game/hand/ui/hand'
import { HTML5Backend } from 'react-dnd-html5-backend'

export function GamePage(): ReactElement {
	// Информация о состоянии игры от сервера
	const gameData = useSelector(
		(state: RootState) => state.remoteGameData.data,
	)

	// Информация о состоянии игры на фронте
	const localGameData = useSelector((state: RootState) => state.localGameData)

	// Инстанс WebSocket
	const socket = SocketConnection.getInstance()

	// ID игрока
	const chat_id = getId()

	// Информация о состоянии игрока
	const currentPlayer: TPlayer = gameData.players
		.map((player, index) => ({ ...player, index }))
		.find((player: TPlayer) => player.chat_id === chat_id)
	console.log('DEV | CURRENT PLAYER: ', currentPlayer)

	// Информация о состоянии соперников
	const rivals: TPlayer[] = gameData.players
		.map((player, index) => ({ ...player, index })) // Добавляем индекс в объект
		.filter(player => player.chat_id !== currentPlayer?.chat_id)
	console.log('DEV | RIVALS: ', rivals)

	// const onSubmit = () => {
	// 	switch (button.action) {
	// 		case 'take': {
	// 			setButton(null)
	// 			take(game_ws.current)
	// 			if (defendingPlayer === tg_id) {
	// 				spawnCardWithCords(
	// 					'cover',
	// 					[window.innerHeight / 2, 0],
	// 					[window.innerHeight + 50, -50],
	// 				)
	// 			}
	// 			return
	// 		}
	// 		case 'beat': {
	// 			setButton(null)
	// 			beat(game_ws.current)
	// 			return
	// 		}
	// 		case 'next_throw': {
	// 			setButton(null)
	// 			nextThrow(game_ws.current)
	// 			return
	// 		}
	// 	}
	// }

	// useEffect(() => {
	// 	if (
	// 		!cardsOnTable.length &&
	// 		cardsOnTable.length < 6 &&
	// 		attackPlayer === tg_id
	// 	) {
	// 		setCardsOnTable([...cardsOnTable, []])
	// 	}
	// }, [attackPlayer])

	// Соперник кладет карту (добавление на стол)
	// const rivalAddCard = (
	// 	players_cards: object,
	// 	cards_on_table: string[][],
	// 	card: string,
	// 	rivalId: string,
	// ) => {
	// 	const rivalNum = Object.keys(players_cards).indexOf(String(rivalId))
	//
	// 	let poses = []
	//
	// 	if (game.num_players === 2) {
	// 		poses = [-100]
	// 	} else if (game.num_players === 3) {
	// 		poses = [-400, 200]
	// 	} else if (game.num_players === 4) {
	// 		poses = [-400, -100, 200]
	// 	}
	// 	spawnCardWithCords(
	// 		card,
	// 		[100, poses[rivalNum]],
	// 		[window.innerHeight / 2, -60],
	// 		100,
	// 		'top',
	// 		true,
	// 	)
	//
	// 	setTimeout(() => {
	// 		setCardsOnTable([...cards_on_table.slice(0, -1), [card]])
	// 	}, 600)
	// }
	//
	// // Соперник отбивает карту
	// const rivalBeatCard = (
	// 	players_cards: object,
	// 	card: string,
	// 	rivalId: string,
	// 	cards_on_table,
	// 	attack_player,
	// ) => {
	// 	const rivalNum = Object.keys(players_cards).indexOf(String(rivalId))
	// 	let poses = []
	//
	// 	if (game.num_players === 2) {
	// 		poses = [-100]
	// 	} else if (game.num_players === 3) {
	// 		poses = [-400, 200]
	// 	} else if (game.num_players === 4) {
	// 		poses = [-400, -100, 200]
	// 	}
	//
	// 	spawnCardWithCords(
	// 		card,
	// 		[100, poses[rivalNum]],
	// 		[window.innerHeight / 2, -60],
	// 		100,
	// 		'top',
	// 		true,
	// 	)
	//
	// 	setTimeout(() => {
	// 		if (attack_player === tg_id && cards_on_table.length < 6) {
	// 			setCardsOnTable([...cards_on_table, []])
	// 		} else {
	// 			setCardsOnTable([...cards_on_table])
	// 		}
	// 	}, 600)
	// }
	//
	// // Соперник берет карты
	// const rivalTakeCards = (players_cards: object, rivalId: string) => {
	// 	const rivalNum = Object.keys(players_cards).indexOf(String(rivalId))
	// 	let poses = []
	//
	// 	if (game.num_players === 2) {
	// 		poses = [-100]
	// 	} else if (game.num_players === 3) {
	// 		poses = [-400, 200]
	// 	} else if (game.num_players === 4) {
	// 		poses = [-400, -100, 200]
	// 	}
	//
	// 	spawnCardWithCords(
	// 		'6_of_clubs',
	// 		[window.innerHeight / 2, -60],
	// 		[100, poses[rivalNum]],
	// 		50,
	// 		'bottom',
	// 	)
	// }
	//
	// // Раздача карт соперникам
	// const giveCardToRivals = (
	// 	numCards: number[],
	// 	newRivals: ICurrentPlayer[],
	// 	isStart?: boolean,
	// ) => {
	// 	let poses = []
	// 	const updateRivals = isStart
	// 		? newRivals.map(rival => ({
	// 				...rival,
	// 				countCards: 0,
	// 			}))
	// 		: newRivals.map((rival, index) => ({
	// 				...rival,
	// 				countCards: rival.countCards - numCards[index],
	// 			}))
	//
	// 	// console.log('updateRivals', updateRivals)
	//
	// 	// Определение позиций
	// 	if (numCards.length === 1) {
	// 		poses = [-100]
	// 	} else if (numCards.length === 2) {
	// 		poses = [-400, 200]
	// 	} else if (numCards.length === 3) {
	// 		poses = [-400, -100, 200]
	// 	}
	//
	// 	let delay = 0
	// 	for (let i = 0; i < numCards.length; i++) {
	// 		for (let j = 0; j < numCards[i]; j++) {
	// 			setTimeout(() => {
	// 				spawnCardWithCords(
	// 					'',
	// 					[250, -600],
	// 					[100, poses[i]],
	// 					50,
	// 					'bottom',
	// 					false,
	// 				)
	//
	// 				updateRivals[i].countCards += 1
	// 				setRivals([...updateRivals])
	// 			}, delay)
	// 			delay += 200
	// 		}
	// 	}
	//
	// 	setTimeout(() => {
	// 		setRivals(updateRivals)
	// 	}, delay + 500)
	//
	// 	// console.log(updateRivals)
	// }
	//
	// // Раздача карт
	// const spawnCard = (card: string) => {
	// 	setCurrentFlyingCards([
	// 		...currentFlyingCards,
	// 		<FlyingCard
	// 			key={Date.now()}
	// 			type={card}
	// 			from={[160, -300]}
	// 			to={[window.innerHeight + 50, -50]}
	// 			scale={100}
	// 			animation={true}
	// 		/>,
	// 	])
	// 	setTimeout(() => {
	// 		setCards(actual => {
	// 			return [...actual, card]
	// 		})
	// 	}, 200)
	// }
	//
	// const spawnCardWithCords = (
	// 	card: string = 'cover',
	// 	from: number[],
	// 	to: number[],
	// 	scale: number = 78,
	// 	position: TPositionCard = 'top',
	// 	animation: boolean = false,
	// ) => {
	// 	setCurrentFlyingCards([
	// 		...currentFlyingCards,
	// 		<FlyingCard
	// 			key={Date.now()}
	// 			type={card}
	// 			from={from}
	// 			to={to}
	// 			scale={scale}
	// 			position={position}
	// 			animation={animation}
	// 		/>,
	// 	])
	// }
	//
	// // Раздача карт всем игрокам
	// const spawnCards = (
	// 	data: string[],
	// 	newRivals: ICurrentPlayer[],
	// 	isStart?: boolean,
	// 	oldRivals?: ICurrentPlayer[],
	// ) => {
	// 	let delay = 0
	//
	// 	// Раздача карт в начале игры
	// 	if (isStart) {
	// 		data.forEach((card, index) => {
	// 			setTimeout(() => {
	// 				spawnCard(card)
	// 			}, index * 200)
	// 			delay += index * 100
	// 		})
	// 	} else {
	// 		// Раздача карт
	// 		/*let currentCards = []
	//         setCards(prevState => {
	//             prevState.map(item => {
	//                 currentCards.push(item)
	//             })
	//             return prevState
	//         })
	//         console.log(currentCards)
	//         const newCards = data.filter(card => !currentCards.includes(card))
	//
	//         newCards.forEach((card, index) => {
	//             setTimeout(() => {
	//                 spawnCard(card)
	//             }, index * 200)
	//             delay += index * 200
	//         })*/
	// 	}
	//
	// 	// Массив новых карт соперников
	// 	const numCards = isStart
	// 		? newRivals.map(rival => rival.countCards || 0)
	// 		: !!oldRivals?.length
	// 			? oldRivals?.map(
	// 					rival =>
	// 						newRivals.find(
	// 							newRival => newRival.tg_id === rival.tg_id,
	// 						).countCards - rival.countCards,
	// 				)
	// 			: []
	//
	// 	setTimeout(() => {
	// 		giveCardToRivals(numCards, newRivals, isStart)
	// 	}, delay)
	// }
	//
	// Положить карту на стол
	// function onDragEnd(result: DropResult) {
	// 	const { source, destination } = result
	// 	if (!destination) return
	//
	// 	if (
	// 		source.droppableId === destination.droppableId &&
	// 		source.index === destination.index
	// 	) {
	// 		return
	// 	}
	//
	// 	let sourceList =
	// 		source.droppableId === 'droppable-empty-table'
	// 			? emptyTableCards
	// 			: gameData.game_board[
	// 					+source.droppableId.replace('droppable-table-card-', '')
	// 				]
	// 	let destinationList =
	// 		destination.droppableId === 'droppable-empty-table'
	// 			? emptyTableCards
	// 			: gameData.game_board[
	// 					+destination.droppableId.replace(
	// 						'droppable-table-card-',
	// 						'',
	// 					)
	// 				]
	//
	// 	const [movedCard] = sourceList.splice(source.index, 1)
	//
	// 	if (destination.droppableId === 'droppable-empty-table') {
	// 		setEmptyTableCards([...emptyTableCards, movedCard])
	// 	} else {
	// 		gameData.game_board[
	// 			+destination.droppableId.replace('droppable-table-card-', '')
	// 		].push(movedCard)
	// 		gameData.game_board.push([...gameData.game_board])
	// 	}
	// }

	// if (!isConnected) return <Loader />

	return (
		gameData && (
			<DndProvider backend={HTML5Backend}>
				<Layout
					noLogo
					className='absolute left-0 top-0 flex h-full select-none flex-col items-center justify-between'
				>
					<GameTable />
					<Hand
						playerCards={currentPlayer.card_in_hand}
						gameData={gameData}
						playerData={currentPlayer}
					/>
					{/*<div*/}
					{/*	ref={flyingCardsRef}*/}
					{/*	className='floating-cards relative z-10 h-0 w-0 overflow-visible'*/}
					{/*>*/}
					{/*	{currentFlyingCards}*/}
					{/*</div>*/}
					<Rivals rivals={rivals} gameInfo={gameData} />
					{/*<div className='absolute top-40 flex gap-base-x2'>*/}
					{/*	{gameData.currency && (*/}
					{/*		<Icon size={26} icon={gameData.currency} />*/}
					{/*	)}*/}
					{/*	<Typography variant='h1'>{gameData.bet}</Typography>*/}
					{/*</div>*/}
					{/*/!*<Fall beatDeckLength={beatDeckLength} />*!/*/}
					<Pack
						trumpCard={gameData.trump}
						remainingDeckLength={gameData.count_card_in_deck}
					/>
					{/*<Table*/}
					{/*	gameBoard={gameData.game_board}*/}
					{/*	gameData={gameData}*/}
					{/*	currentPlayer={currentPlayer}*/}
					{/*	emptyTableCards={}*/}
					{/*/>*/}
					{/*<Fan*/}
					{/*	gameData={gameData}*/}
					{/*	player={currentPlayer}*/}
					{/*	// onSubmit={onSubmit}*/}
					{/*	buttonText={''}*/}
					{/*/>*/}
				</Layout>
			</DndProvider>
		)
	)
}

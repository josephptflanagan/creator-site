import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_VIDEO_GAMES } from '../../utils/queries'
import { hydrateGames } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'

import GameBtn from '../GameBtn/GameBtn'

import './GameMenu.css'

const GameMenu = () => {
	// get data from DB with Apollo
	const { loading, data: gameData } = useQuery(QUERY_VIDEO_GAMES)

	const { games } = useSelector((state) => state)
	const dispatch = useDispatch()

	useEffect(
		() => {
			// if gameData exists or has changed from the response of useQuery, then run dispatch()
			if (gameData) {
				// execute our dispatch function with our action object indicating the type of action and the data to set our state for games to
				dispatch(hydrateGames(gameData.games))
				// also write to IndexedDB
				gameData.games.forEach((game) => {
					idbPromise('games', 'put', game)
				})
				// if app can't communicate with server, get games from indexedDB
			} else if (!loading) {
				idbPromise('games', 'get').then((games) => {
					dispatch(hydrateGames(games))
				})
			}
		},
		[ gameData, loading, dispatch ]
	)

	return (
		<>
			{loading ? null : (
				<div className='GameMenu m-2'>
					<h5 className='text-center'>Sort by game</h5>
					{games.map((game) => <GameBtn key={game._id} game={game} />)}
				</div>
			)}
		</>
	)
}

export default GameMenu
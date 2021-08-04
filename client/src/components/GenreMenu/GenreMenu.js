import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_VIDEO_GENRES } from '../../utils/queries'
import { hydrateGenres } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'

import GenreBtn from '../GenreBtn/GenreBtn'

import './GenreMenu.css'

const GenreMenu = () => {
	// get data from DB with Apollo
	const { loading, data: genreData } = useQuery(QUERY_VIDEO_GENRES)

	const { genres } = useSelector((state) => state)
	const dispatch = useDispatch()

	useEffect(
		() => {
			// if genreData exists or has changed from the response of useQuery, then run dispatch()
			if (genreData) {
				// execute our dispatch function with our action object indicating the type of action and the data to set our state for genres to
				dispatch(hydrateGenres(genreData.genres))
				// also write to IndexedDB
				genreData.genres.forEach((genre) => {
					idbPromise('genres', 'put', genre)
				})
				// if app can't communicate with server, get genres from indexedDB
			} else if (!loading) {
				idbPromise('genres', 'get').then((genres) => {
					dispatch(hydrateGenres(genres))
				})
			}
		},
		[ genreData, loading, dispatch ]
	)

	return (
		<>
			{loading ? null : (
				<div className='GenreMenu m-2'>
					<h5 className='text-center'>Sort by genre</h5>
					{genres.map((genre) => <GenreBtn key={genre._id} genre={genre} />)}
				</div>
			)}
		</>
	)
}

export default GenreMenu
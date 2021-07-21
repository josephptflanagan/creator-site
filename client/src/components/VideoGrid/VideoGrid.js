import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

import { QUERY_VIDEOS } from '../../utils/queries'
import { updateVideos } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'

import VideoTile from '../VideoTile/VideoTile'

import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import './VideoGrid.css'

const VideoGrid = () => {
	// query db for videos
	const { loading, data } = useQuery(QUERY_VIDEOS)

	const { videos, currentGenre } = useSelector((state) => state)

	const dispatch = useDispatch()

	useEffect(
		() => {
			// if there's data to be stored
			if (data) {
				// store it in the global state object
				dispatch(updateVideos(data.videos))

				// // also take each video and save it to the IndexedDB using the helper function
				data.videos.forEach((video) => {
					idbPromise('videos', 'put', video)
				})
				// add else if to check if 'loading' is undefined in 'useQuery()' hook. ie no internet connection to server
			} else if (!loading) {
				// since we're offline, get all of the data from the 'videos' store
				idbPromise('videos', 'get').then((videos) => {
					// use retrieved data to set global state for offline browsing
					dispatch(updateVideos(videos))
				})
				console.log('you are offline')
			}
		},
		[ data, loading, dispatch ]
	)

	function filterVideos() {
		// filter out videos who have not posted a song.  **keep in place until we refactor User from Video models
		//const actualVideos = videos.filter((video) => video.songs.length > 0)
        const actualVideos = videos; //temp measure to remove now useless original filter

		// if (!currentGenre) {
		// 	return videos;
		// }
		// ** ditto
		if (!currentGenre) {
			return actualVideos
		}

		// we have an array of videos.  each video has an array of genres.  we need to return a new array of videos, based on their array of genres containing a certain value (currentGenre which is the genre's _id)

		// return videos.filter((video) =>
		// 	video.genres.some((genre) => genre._id === currentGenre)
		// );
		// ** ditto
		return actualVideos.filter((video) =>
			video.genres.some((genre) => genre._id === currentGenre)
		)
	}

	return (
		<Col lg={12} className='VideoGrid'>
			{loading ? (
				<Spinner
					animation='border'
					role='status'
					style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}
				>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<div className='VideoGrid-tiles-container d-flex justify-content-center flex-wrap mx-auto'>
					{videos.length ? (
						filterVideos().map((video) => (
							<VideoTile {...video} key={video._id} />
						))
					) : (
						<h3>No Videos yet...</h3>
					)}
				</div>
			)}
			{/* <div className='VideoGrid-tiles-container d-flex justify-content-center flex-wrap mx-auto'>
				{videos.length ? (
					filterVideos().map((video) => <VideoTile {...video} key={video._id} />)
				) : (
					<h3>No Videos yet...</h3>
				)}
			</div> */}
		</Col>
	)
}

export default VideoGrid
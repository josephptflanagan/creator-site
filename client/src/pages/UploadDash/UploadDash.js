{/* THIS IS ALMOST ALL WRONG, NEED TO THING ABOUT SITE STRUCTURE*/}

import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { QUERY_VIDEOS } from '../../utils/queries'
import { updateVideos } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

import EditDescription from '../../components/EditDescription/EditDescription'
import EditGame from '../../components/EditGame/EditGame'
import EditGenres from '../../components/EditGenres/EditGenres'
import EditRecorded from '../../components/EditRecorded/EditRecorded'
import EditTags from '../../components/EditTags/EditTags'
import EditThumbnailUrl from '../../components/EditThumbnailUrl/EditThumbnailUrl'
import EditVideoUrl from '../../components/EditVideoUrl/EditVideoUrl'

import { BiPlay } from 'react-icons/bi'

import './VideoDash.css'

const VideoDash = () => {
	const imgDefault = 'Please add a picture to your profile'
	const descriptionDefault = 'Please tell us a little about yourself'
	const genresDefault = 'Please select your genres'
	const gamesDefault = 'Please add some games'

	const state = useSelector((state) => state)
	const { videos } = state
	const dispatch = useDispatch()

	// get current video's id from url
	const { id } = useParams()

	const [ curVideo, setCurVideo ] = useState({})

	const { loading, data } = useQuery(QUERY_VIDEOS)

	useEffect(
		() => {
			if (data) {
				setCurVideo(data.videos.find((video) => video._id === id))
				dispatch(updateVideos(data.videos))

				data.videos.forEach((video) => {
					idbPromise('videos', 'put', video)
				})
			} else if (!loading) {
				idbPromise('videos', 'get').then((indexedVideos) => {
					dispatch(updateVideos(indexedVideos))
				})
			}
		},
		[ videos, data, loading, dispatch, id ]
	)

	const playerRef = useRef(null)

	const handlePlayVideo = (videoUrl) => {
		playerRef.current.setAttribute('src', videoUrl)
		playerRef.current.play()
	}

	return (
		<>
			{loading ? (
				<Spinner
					animation='border'
					role='status'
					style={{
						width     : '75px',
						height    : '75px',
						margin    : 'auto',
						marginTop : '6rem',
						display   : 'block'
					}}
				>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<>
					{curVideo ? (
						<div className='VideoDash vh-100'>
							<h1 className='w-100 my-5 text-center'>{curVideo.stageName}</h1>
							<Row className='mt-4 d-flex justify-content-center '>
								<Col
									lg={5}
									className='d-flex flex-column align-items-center justify-content-start'
								>
									<div className='w-100 bskr-bg-secondary pt-2 mb-2 rounded'>
										<Card className='w-75 mx-auto bskr-bg-secondary'>
											{curVideo.imgUrl ? (
												<>
													<Card.Img
														variant='top'
														className='w-75 mx-auto rounded'
														src={curVideo.imgUrl}
													/>
													<Card.Body className='text-center'>
														<EditThumbnailUrl />
													</Card.Body>
												</>
											) : (
												<Card.Body className='text-center'>
													<p className='text-center'>{imgDefault}</p>
													<EditThumbnailUrl />
												</Card.Body>
											)}
										</Card>
									</div>

									<div className='bskr-bg-secondary rounded d-flex flex-row w-100 p-4 m-2'>
										<div className='bskr-bg-secondary rounded w-50 m-2 text-center'>
											<p>{curVideo.stageName}</p>
											<EditStageName curStageName={curVideo.stageName} />
										</div>

										<div className='bskr-bg-secondary rounded w-50 m-2 mb-3 text-center'>
											<p>{curVideo.recorded}</p>
											<EditRecorded curRecorded={curVideo.recorded} />
										</div>
									</div>

									<div className='bskr-bg-secondary rounded w-100 m-2 mb-3 p-4 text-center'>
										{curVideo.description ? (
											<p className='text-left'>{curVideo.description}</p>
										) : (
											<p className='mb-3'>{descriptionDefault}</p>
										)}
										<EditDescription curDescription={curVideo.description} />
									</div>
								</Col>
								<Col
									lg={5}
									className='d-flex flex-column align-items-center justify-content-start mt-0 mb-3'
								>
									<div className='bskr-bg-secondary w-100 mb-3 p-2 rounded d-flex flex-column justify-content-center align-items-center'>
										<h5 className='text-dark'>Genres</h5>
										{curVideo.genres && curVideo.genres.length ? (
											<ul className='d-flex flex-row flex-wrap justify-content-center mt-2 mb-3'>
												{/* {curVideo.genres.map((genre) => ( */}
												{/* remove All genre from display until refactor of All filter on VideoGrid */}
												{curVideo.genres
													.filter((genre) => genre.name !== 'All')
													.map((genre) => (
														<span
															key={genre._id}
															className='bskr-genre-btn-static d-inline-block text-center btn-sm m-1 text-white'
														>
															{genre.name}
														</span>
													))}
											</ul>
										) : (
											<p>{genresDefault}</p>
										)}

										<EditGenres curGenres={curVideo.genres} />
									</div>
									<div className='bskr-bg-secondary w-100 p-5 d-flex flex-column align-items-center rounded'>
										<h4 className='text-dark'>Available Tunes</h4>
										{curVideo.videos && curVideo.videos.length ? (
											<ul className='w-100'>
												{curVideo.videos.map((video) => (
													<li
														key={video._id}
														className='bskr-bg-search w-100 m-2 p-2 rounded text-dark'
													>
														<BiPlay
															className='fs-3'
															onClick={() => handlePlayVideo(video.videoUrl)}
														/>{' '}
														{video.title}
													</li>
												))}
											</ul>
										) : (
											<p>{gamesDefault}</p>
										)}
										<EditGame />
										{curVideo.video && curVideo.video.length ? (
											<div>
												<video ref={playerRef} controls>
													Your browser does not support the video element.
												</video>
											</div>
										) : null}
									</div>
								</Col>
							</Row>
						</div>
					) : null}
				</>
			)}
		</>
	)
}

export default VideoDash
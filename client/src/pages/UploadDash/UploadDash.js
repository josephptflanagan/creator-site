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
import EditVideoTitle from '../../components/EditVideoTitle/EditVideoTitle'
import EditVideoDescription from '../../components/EditVideoDescription/EditVideoDescription'
import EditVideoGame from '../../components/EditVideoGame/EditVideoGame'
import EditVideoGenres from '../../components/EditVideoGenres/EditVideoGenres'
import EditVideoRecorded from '../../components/EditVideoRecorded/EditVideoRecorded'
import EditVideoTags from '../../components/EditVideoTags/EditVideoTags'
import EditVideoThumbnailUrl from '../../components/EditVideoThumbnailUrl/EditVideoThumbnailUrl'
import EditVideo from '../../components/EditVideo/EditVideo'
import NoThumbnail from '../../assets/noThumbnail.jpg'
import { BiPlay } from 'react-icons/bi'
import './UploadDash.css'

const VideoDash = () => {
	const videoTitleDefault = 'No title yet added'
	const descriptionDefault = 'No description yet added'
	const tagsDefault = 'No tags yet added'
	const genresDefault = 'No genres yet added'
	const gamesDefault = 'Add or select the game from which this was created'

	const state = useSelector((state) => state)
	const { videos } = state
	const dispatch = useDispatch()

	// get current video's id from url
	const { id } = useParams()

	const [curVideo, setCurVideo] = useState({})

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
		[videos, data, loading, dispatch, id]
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
						width: '75px',
						height: '75px',
						margin: 'auto',
						marginTop: '6rem',
						display: 'block'
					}}
				>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
					<>

						<div className='VideoDash vh-100'>

							<h1 className='w-100 my-5 text-center'>Video Upload</h1>

							<Row className='mt-4 d-flex justify-content-center '>

								<Col lg={5} className='d-flex flex-column align-items-center justify-content-start'>

									<div className='w-100 ctrst-bg-secondary pt-2 mb-2 rounded'>

										<Card className='w-75 mx-auto ctrst-bg-secondary'>

											<Card.Title>Inputs</Card.Title>

											<Card.Body className='text-center'>
												<EditVideo />
												<EditVideoTitle />
												<EditVideoDescription />
												<EditVideoTags />
												<EditVideoThumbnailUrl />
												<EditVideoGenres />
												<EditVideoGame />
												<EditVideoRecorded />
											</Card.Body>

										</Card>

									</div>

								</Col>

								<Col lg={5} className='d-flex flex-column align-items-center justify-content-start mt-0 mb-3'>

									<div className='ctrst-bg-secondary w-100 mb-3 p-2 rounded d-flex flex-column justify-content-center align-items-center'>

										<Card.Body>

											<Card.Title>Preview</Card.Title>

											{curVideo.thumbnailUrl ? (

												<Card.Img
													variant='top'
													className='w-75 mx-auto rounded'
													src={curVideo.thumbnailUrl}
												/>

											) : (

													<Card.Img
														variant='top'
														className='w-75 mx-auto rounded'
														src={NoThumbnail}
													/>

												)}

											{curVideo.videoTitle ? (

												<p>{curVideo.videoTitle}</p>

											) : (

													<p>{videoTitleDefault}</p>

												)}

											{curVideo.tags && curVideo.tags.length ? (

												<ul className='d-flex flex-row flex-wrap justify-content-center mt-2 mb-3'>

													{curVideo.tags.map((tag) => (

														<span
															key={tag._id}
															className='ctrst-genre-btn-static d-inline-block text-center btn-sm m-1 text-white'
														>
															{tag.name}
														</span>

													))}

												</ul>

											) : (

													<p>{tagsDefault}</p>

												)}

											{curVideo.description ? (

												<p>{curVideo.description}</p>

											) : (

													<p>{descriptionDefault}</p>

												)}

											{curVideo.game ? (

												<p>{curVideo.game.gameTitle}</p>,
												<img src={curVideo.game.gameImgUrl}></img>

											) : (

													<p>{gamesDefault}</p>

												)}

											{curVideo.genres && curVideo.genres.length ? (

												<ul className='d-flex flex-row flex-wrap justify-content-center mt-2 mb-3'>

													{curVideo.genres.map((genre) => (

														<span
															key={genre._id}
															className='ctrst-genre-btn-static d-inline-block text-center btn-sm m-1 text-white'
														>
															{genre.genreName}
														</span>

													))}

												</ul>

											) : (

													<p>{genresDefault}</p>

												)}

										</Card.Body>

									</div>

								</Col>

							</Row>

						</div>

					</>
				)}
		</>
	)
}

export default VideoDash
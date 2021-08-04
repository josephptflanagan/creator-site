import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { QUERY_USERS } from '../../utils/queries'
import { updateUsers } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import './UserProf.css'

const UserProf = () => {
	// cache redux store
	const state = useSelector((state) => state)
	// destructure required variable
	const { users } = state
	// cache redux method to update store
	const dispatch = useDispatch()

	// get user id from url which was appended by Link
	const { id } = useParams()

	// initiate component level state to keep track of current user
	const [ curUser, setCurUser ] = useState({})

	const [ showAlert, setShowAlert ] = useState(false)

	// make db query to get all users, in case page is refreshed or user has not first visited landing page to initiate redux store from db
	const { loading, data } = useQuery(QUERY_USERS)

	// this will be called after initial render and each time one of the values in the dependency array (users, data, loading, dispatch, id, curUser) changes. checking the redux store first
	useEffect(
		() => {
			// if users are already in global store
			if (users.length) {
				// update component level state of curUser to be the user object from the redux store whose id matches the one from the url
				setCurUser(users.find((user) => user._id === id))
			} else if (data) {
				// if nothing was in global store, if there is any data retrieved from db on server, dispatch the action to update the users in the global store with the data from the db
				dispatch(updateUsers(data.users))
				// also, cache the products from the db in indexedDb
				data.users.forEach((user) => {
					idbPromise('users', 'put', user)
				})
			} else if (!loading) {
				// otherwise, if there is nothing in the redux store, and there is no internet connection (hence 'loading' is undefined in the useQuery() hook) get all the data from the cache in idb
				idbPromise('users', 'get').then((indexedUsers) => {
					// use data from indexedDb to update redux global store for offline browsing
					dispatch(updateUsers(indexedUsers))
				})
			}
		},
		[ users, data, loading, dispatch, id ]
	)

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
					{curUser ? (
						<div className='UserProf vh-100'>
							<h1 className='w-100 my-5 text-center'>{curUser.username}</h1>
							<Row className='d-flex justify-content-center '>
								<Col
									lg={5}
									className='d-flex flex-column justify-content-start align-items-start mt-1 mb-2'
								>
									<div className='w-100 bskr-bg-secondary pt-2 mt-1 mb-3 rounded'>
										<Card className='w-75 mx-auto bskr-bg-secondary'>
											<Card.Img
												variant='top'
												className='w-75 mx-auto rounded'
												src={curUser.profilePicUrl}
											/>
											<Card.Body className='text-center'>
												<Card.Text className='text-white text-center'>
													{curUser.location}
												</Card.Text>
											</Card.Body>
										</Card>
									</div>
									<div className='bskr-bg-secondary w-100 rounded p-4 text-center'>
										<h5 className='text-dark'>Bio</h5>
										<p className='text-left'>{curUser.bio}</p>
									</div>
								</Col>
								<Col
									lg={5}
									className='d-flex flex-column align-items-center justify-content-start mt-1 mb-3'
								>
									
								</Col>
							</Row>
						</div>
					) : null}
				</>
			)}
		</>
	)
}

export default UserProf
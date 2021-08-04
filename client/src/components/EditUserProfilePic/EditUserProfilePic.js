import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { UPLOAD_PHOTO } from '../../utils/mutations'
import { useToggle } from '../../hooks'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import './EditUserProfilePic.css'

const EditUserProfilePic = () => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false)

	const handleClose = () => toggleShow()
	const handleShow = () => toggleShow()

	const [ uploadPhoto, { loading } ] = useMutation(UPLOAD_PHOTO)

	const handleFileUpload = async (e) => {
		console.log('photo file received')
		e.preventDefault()
		var files = document.getElementById('photoupload').files

		handleClose()

		const file = files[0]

		try {
			await uploadPhoto({
				variables : {
					file
				}
			})
		} catch (err) {
			console.error(err)
		}
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
						marginBottom: '2rem',
						display: 'block'
					}}
				>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : null}
			<Button
				className='w-50 btn-sm bskr-btn-purple'
				variant='primary'
				onClick={handleShow}
			>
				edit profile photo
			</Button>

			<Modal
				className='EditUserProfilePicModal'
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>edit your profile photo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='m-2' onSubmit={handleFileUpload}>
						<Form.Group>
							<Form.File className='text-center' id='photoupload' />
						</Form.Group>
						<Button type='submit' variant='primary btn-sm bskr-btn-purple'>
							save
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default EditUserProfilePic
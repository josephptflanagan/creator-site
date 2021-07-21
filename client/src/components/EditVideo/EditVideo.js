import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { UPLOAD_VIDEO } from '../../utils/mutations'
import { useToggle } from '../../hooks'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import './EditVideo.css'

const EditVideo = () => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false)

	const handleClose = () => toggleShow()
	const handleShow = () => toggleShow()

	const [ uploadVideo, { loading } ] = useMutation(UPLOAD_VIDEO)

	const handleFileUpload = async (e) => {
		console.log('video file received')
		e.preventDefault()
		var files = document.getElementById('videoupload').files

		handleClose()

		const file = files[0]

		try {
			await uploadVideo({
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
				Choose Video File
			</Button>

			<Modal
				className='EditVideoModal'
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Choose your video file</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='m-2' onSubmit={handleFileUpload}>
						<Form.Group>
							<Form.File className='text-center' id='videoupload' />
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

export default EditVideo
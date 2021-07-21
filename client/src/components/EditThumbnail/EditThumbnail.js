import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { UPLOAD_THUMBNAIL_URL } from '../../utils/mutations'
import { useToggle } from '../../hooks'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import './EditThumbnail.css'

const EditThumbnail = () => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false)

	const handleClose = () => toggleShow()
	const handleShow = () => toggleShow()

	const [ uploadThumbnail, { loading } ] = useMutation(UPLOAD_THUMBNAIL_URL)

	const handleFileUpload = async (e) => {
		console.log('thumbnail file received')
		e.preventDefault()
		var files = document.getElementById('thumbnailupload').files

		handleClose()

		const file = files[0]

		try {
			await uploadThumbnail({
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
				Edit Video Thumbnail
			</Button>

			<Modal
				className='EditThumbnailModal'
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>edit your video thumbnail</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='m-2' onSubmit={handleFileUpload}>
						<Form.Group>
							<Form.File className='text-center' id='thumbnailupload' />
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

export default EditThumbnail
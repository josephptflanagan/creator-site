import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { useToggle, useInputState } from '../../hooks'
import { UPDATE_USER_BIO } from '../../utils/mutations'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import './EditBio.css'

const EditBio = ({ curBio }) => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false)
	// custom hook for controlling form
	const [ bio, setBio ] = useInputState(curBio)

	// MUTATION ON FORM SUBMIT
	const [ updateUserBio ] = useMutation(UPDATE_USER_BIO)

	const handleFormSubmit = async (e) => {
		// close modal
		handleClose()
		e.preventDefault()

		try {
			await updateUserBio({
				variables : {
					bio
				}
			})
		} catch (err) {
			console.error(err)
		}
	}

	// MODAL DISPLAY
	const handleClose = () => toggleShow()
	const handleShow = () => toggleShow()

	return (
		<>
			<Button
				className='w-50 btn-sm bskr-btn-purple'
				variant='primary'
				onClick={handleShow}
			>
				edit your bio
			</Button>

			<Modal
				className='EditBio '
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>edit your bio</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit}>
						<FormControl
							name='bio'
							rows='5'
							as='textarea'
							aria-label='With textarea'
							onChange={setBio}
							value={bio || ''}
							placeholder={curBio}
						/>
						<Button
							className='mt-3'
							type='submit'
							variant='primary btn-sm bskr-btn-purple'
						>
							save
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default EditBio
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useToggle, useInputState } from '../../hooks';
import { UPDATE_VIDEO_DESCRIPTION } from '../../utils/mutations';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import './EditDescription.css';

const EditDescription = ({ curDescription }) => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false);

	const [ description, setDescription ] = useInputState(curDescription);

	// MUTATION ON FORM SUBMIT
	const [ updateVideoDescription ] = useMutation(UPDATE_VIDEO_DESCRIPTION);

	const handleFormSubmit = async (e) => {
		// close modal
		handleClose();
		e.preventDefault();

		// update database with new description
		try {
			await updateVideoDescription({
				variables : {
					description
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	// MODAL DISPLAY
	const handleClose = () => toggleShow();
	const handleShow = () => toggleShow();

	return (
		<>
			<Button
				className="EditDesc-Btn p-2 w-50 btn-sm bskr-btn-purple"
				variant="primary"
				onClick={handleShow}
			>
				Edit the Video's Description
			</Button>

			<Modal
				className="EditDesc "
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>
                    Edit the Video's Description{' '}
						<span className="desc-span"></span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit}>
						<FormControl
							name="description"
							aria-label="With input"
							onChange={setDescription}
							value={description || ''}
							placeholder={curDescription}
						/>
						<Button
							className="mt-3"
							type="submit"
							variant="primary btn-sm bskr-btn-purple"
						>
							save
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default EditDescription;
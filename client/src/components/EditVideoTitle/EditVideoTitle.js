import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useToggle, useInputState } from '../../hooks';
import { UPDATE_VIDEO_TITLE } from '../../utils/mutations';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import './EditVideoTitle.css';

const EditVideoTitle = ({ curTitle }) => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false);

	const [ videoTitle, setTitle ] = useInputState(curTitle);

	// MUTATION ON FORM SUBMIT
	const [ updateVideoTitle ] = useMutation(UPDATE_VIDEO_TITLE);

	const handleFormSubmit = async (e) => {
		// close modal
		handleClose();
		e.preventDefault();

		// update database with new title
		try {
			await updateVideoTitle({
				variables : {
					videoTitle
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
				className="EditVideoTitle-Btn p-2 w-50 btn-sm bskr-btn-purple"
				variant="primary"
				onClick={handleShow}
			>
				Edit the Video's Title
			</Button>

			<Modal
				className="EditVideoTitle "
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>
                    Edit the Video's Title{' '}
						<span className="title-span"></span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit}>
						<FormControl
							name="title"
							aria-label="With input"
							onChange={setTitle}
							value={videoTitle || ''}
							placeholder={curTitle}
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

export default EditVideoTitle;
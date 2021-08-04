import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useToggle, useInputState } from '../../hooks';
import { UPDATE_VIDEO_RECORDED } from '../../utils/mutations';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import './EditVideoRecorded.css';

const EditRecorded = ({ curRecorded }) => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false);

	const [ recorded, setRecorded ] = useInputState(curRecorded);

	// MUTATION ON FORM SUBMIT
	const [ updateVideoRecorded ] = useMutation(UPDATE_VIDEO_RECORDED);

	const handleFormSubmit = async (e) => {
		// close modal
		handleClose();
		e.preventDefault();

		// update database with the date the video was recorded
		try {
			await updateVideoRecorded({
				variables : {
					recorded
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
				className="EditRecorded-Btn p-2 w-50 btn-sm bskr-btn-purple"
				variant="primary"
				onClick={handleShow}
			>
				Date Recorded
			</Button>

			<Modal
				className="EditRecorded "
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Recorded>
                    Edit the date the Video was Recorded{' '}
						<span className="recorded-span"></span>
					</Modal.Recorded>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit}>
						<FormControl
							name="recorded"
							aria-label="With input"
							onChange={setRecorded}
							value={recorded || ''}
							placeholder={curRecorded}
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

export default EditRecorded;
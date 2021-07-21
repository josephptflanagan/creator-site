import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useToggle, useInputState } from '../../hooks';
import { UPDATE_USER_LOCATION } from '../../utils/mutations';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import './EditLocation.css';

const EditLocation = ({ curLocation }) => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false);

	const [ location, setLocation ] = useInputState(curLocation);

	// MUTATION ON FORM SUBMIT
	const [ updateUserLocation ] = useMutation(UPDATE_USER_LOCATION);

	const handleFormSubmit = async (e) => {
		// close modal
		handleClose();
		e.preventDefault();

		// update database with new location
		try {
			await updateUserLocation({
				variables : {
					location
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
				className="EditLocation-Btn p-2 w-50 btn-sm bskr-btn-purple"
				variant="primary"
				onClick={handleShow}
			>
				edit your location
			</Button>

			<Modal
				className="EditLocation "
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						edit your location{' '}
						<span className="city-span">(e.g. Austin, TX)</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit}>
						<FormControl
							name="location"
							aria-label="With input"
							onChange={setLocation}
							value={location || ''}
							placeholder={curLocation}
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

export default EditLocation;
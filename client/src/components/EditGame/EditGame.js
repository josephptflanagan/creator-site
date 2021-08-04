import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useToggle, useInputState } from '../../hooks';
import { UPDATE_VIDEO_GAME } from '../../utils/mutations';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import './EditGame.css';

const EditGame = ({ curGame }) => {
	// MODAL TOGGLE
	const [ show, toggleShow ] = useToggle(false);

	const [ game, setGame ] = useInputState(curGame);

	// MUTATION ON FORM SUBMIT
	const [ updateVideoGame ] = useMutation(UPDATE_VIDEO_GAME);

	const handleFormSubmit = async (e) => {
		// close modal
		handleClose();
		e.preventDefault();

		// update database with new game
		try {
			await updateVideoGame({
				variables : {
					game
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
				className="EditGame-Btn p-2 w-50 btn-sm bskr-btn-purple"
				variant="primary"
				onClick={handleShow}
			>
				Edit the Video's Game
			</Button>

			<Modal
				className="EditGame "
				centered
				show={show}
				onHide={handleClose}
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>
                    Edit the Video's Game{' '}
						<span className="game-span"></span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit}>
						<FormControl
							gameTitle="game"
							aria-label="With input"
							onChange={setGame}
							value={game || ''}
							placeholder={curGame}
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

export default EditGame;
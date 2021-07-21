import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { useToggle } from '../../hooks'
import { QUERY_GENRES } from '../../utils/queries';
import { UPDATE_VIDEO_GENRES } from '../../utils/mutations';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './EditGenres.css';

// destructure genre objects of current video from props
const EditGenres = ({ curGenres }) => {
  // MODAL TOGGLE
  const [ show, toggleShow ] = useToggle(false);

	const [ allGenres, setAllGenres ] = useState([]);

	// map an array of the ids of current genres to set defaultChecked of checkboxes for matched ids
	const curGenresIds = curGenres?.map(genre => genre._id);

  // query to get all genres
	const { loading, data } = useQuery(QUERY_GENRES);

  // initialize mutation function to update video genres
	const [ updateVideoGenres ] = useMutation(UPDATE_VIDEO_GENRES);

  // update component state when data arrives from db query
	useEffect(
		() => {
			if (data) {
				setAllGenres(data);
			}
		},
		[ data, loading ]
	);

	// MODAL FUNCTIONALITY
	const handleClose = () => toggleShow();
	const handleShow = () => toggleShow();

  // call mutation function with array of updated genre id's
	const handleFormSubmit = async (e) => {
    e.preventDefault();
    // close modal
		handleClose();
		// array-like iterable (RadioNodeList) of all checkbox els
		const genres = e.target.elements['updatedGenres'];
		// initialize array of updated genres
		let updatedGenres = [];
		// iterate over RadioNodeList and push the value (genre name) of each checked box into the array
		for (let i = 0; i < genres.length; i++) {
			genres[i].checked && updatedGenres.push(genres[i].value);
		}

    try {
      const mutationResponse = await updateVideoGenres({
        variables : {
          genres : updatedGenres
        }
			});
      console.log('mutationResponse', mutationResponse);

			// window.location.reload()
		} catch (err) {
			console.error(err);
		}    
	};

	return (
		<>
			{allGenres ? (
				<>
					<Button
						className="w-50 btn-sm bskr-btn-purple"
						variant="primary"
						onClick={handleShow}
					>
						Genres
					</Button>

					<Modal
						className="EditGenresModal"
						centered
						show={show}
						onHide={handleClose}
						animation={false}
					>
						<Modal.Header closeButton>
							<Modal.Title>Pick the Video's Genres</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form onSubmit={handleFormSubmit}>
								<Form.Group>
                  {/* All is included until refactor of All filter on CreatrGrid */}
									{allGenres.genres?.map((genre) => (
									<div key={genre._id} className="mb-3">
										<Form.Check
                      // type="checkbox"
                      disabled={genre.name === 'All'}
											name="updatedGenres"
											label={genre.name}
											value={genre._id}
											defaultChecked={curGenresIds?.includes(genre._id)}
										/>
									</div>
									))}
								</Form.Group>
								<Button
									variant="primary btn-sm bskr-btn-purple"
									type="submit"
								>
									save
								</Button>
							</Form>
						</Modal.Body>
					</Modal>
				</>
			) : null}
		</>
	);
};

export default EditGenres;
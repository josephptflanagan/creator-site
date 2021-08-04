import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { useToggle } from '../../hooks'
import { QUERY_VIDEO_TAGS } from '../../utils/queries';
import { UPDATE_VIDEO_TAGS } from '../../utils/mutations';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './EditVideoTags.css';

// destructure tag objects of current video from props
const EditTags = ({ curTags }) => {
  // MODAL TOGGLE
  const [ show, toggleShow ] = useToggle(false);

	const [ allTags, setAllTags ] = useState([]);

	// map an array of the ids of current tags to set defaultChecked of checkboxes for matched ids
	const curTagsIds = curTags?.map(tag => tag._id);

  // query to get all tags
	const { loading, data } = useQuery(QUERY_VIDEO_TAGS);

  // initialize mutation function to update video tags
	const [ updateVideoTags ] = useMutation(UPDATE_VIDEO_TAGS);

  // update component state when data arrives from db query
	useEffect(
		() => {
			if (data) {
				setAllTags(data);
			}
		},
		[ data, loading ]
	);

	// MODAL FUNCTIONALITY
	const handleClose = () => toggleShow();
	const handleShow = () => toggleShow();

  // call mutation function with array of updated tag id's
	const handleFormSubmit = async (e) => {
    e.preventDefault();
    // close modal
		handleClose();
		// array-like iterable (RadioNodeList) of all checkbox els
		const tags = e.target.elements['updatedTags'];
		// initialize array of updated tags
		let updatedTags = [];
		// iterate over RadioNodeList and push the value (tag name) of each checked box into the array
		for (let i = 0; i < tags.length; i++) {
			tags[i].checked && updatedTags.push(tags[i].value);
		}

    try {
      const mutationResponse = await updateVideoTags({
        variables : {
          tags : updatedTags
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
			{allTags ? (
				<>
					<Button
						className="w-50 btn-sm bskr-btn-purple"
						variant="primary"
						onClick={handleShow}
					>
						Tags
					</Button>

					<Modal
						className="EditVideoTagsModal"
						centered
						show={show}
						onHide={handleClose}
						animation={false}
					>
						<Modal.Header closeButton>
							<Modal.Title>Pick the Video's Tags</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form onSubmit={handleFormSubmit}>
								<Form.Group>
                  {/* All is included until refactor of All filter on CreatrGrid */}
									{allTags.tags?.map((tag) => (
									<div key={tag._id} className="mb-3">
										<Form.Check
                      // type="checkbox"
                      disabled={tag.tagName === 'All'}
											tagName="updatedTags"
											label={tag.tagName}
											value={tag._id}
											defaultChecked={curTagsIds?.includes(tag._id)}
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

export default EditTags;
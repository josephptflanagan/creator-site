import React from 'react';
import { useDispatch } from 'react-redux';

import { updateCurrentGenre } from '../../utils/actions';

import './GenreBtn.css';

const GenreBtn = ({ genre }) => {
	const dispatch = useDispatch();

	const handleClick = (id) => {
		dispatch(updateCurrentGenre(id));
	};

	return (
		<button
			className="creator-site-genre-btn text-white py-2 rounded m-2"
			onClick={() => handleClick(genre._id)}
		>
			{genre.genreName}
		</button>
	);
};

export default GenreBtn;
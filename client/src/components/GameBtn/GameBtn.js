import React from 'react';
import { useDispatch } from 'react-redux';

import { updateCurrentGame } from '../../utils/actions';

import './GameBtn.css';

const GameBtn = ({ game }) => {
	const dispatch = useDispatch();

	const handleClick = (id) => {
		dispatch(updateCurrentGame(id));
	};

	return (
		<button
			className="creator-site-game-btn text-white py-2 rounded m-2"
			onClick={() => handleClick(game._id)}
		>
			{game.gameTitle}
		</button>
	);
};

export default GameBtn;
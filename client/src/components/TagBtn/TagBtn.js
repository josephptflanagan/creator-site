import React from 'react';
import { useDispatch } from 'react-redux';

import { updateCurrentTag } from '../../utils/actions';

import './TagBtn.css';

const TagBtn = ({ tag }) => {
	const dispatch = useDispatch();

	const handleClick = (id) => {
		dispatch(updateCurrentTag(id));
	};

	return (
		<button
			className="creator-site-tag-btn text-white py-2 rounded m-2"
			onClick={() => handleClick(tag._id)}
		>
			{tag.tagName}
		</button>
	);
};

export default TagBtn;
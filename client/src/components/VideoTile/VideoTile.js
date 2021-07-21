import React from 'react';
import { Link } from 'react-router-dom';

import './VideoTile.css';

const VideoTile = ({ _id, title, ThumbnailUrl }) => {
	let tileStyle = {
		backgroundImage    : 'url(' + ThumbnailUrl + ')',
		position           : 'relative',
		backgroundRepeat   : 'no-repeat',
		backgroundSize     : 'cover',
		backgroundPosition : 'center'
	};
	return (
		<Link to={`/profile/${_id}`} className="VideoTile">
			<div className="VideoTile-tile m-2" style={tileStyle}>
				<h3>{title}</h3>
			</div>
		</Link>
	);
};

export default VideoTile;
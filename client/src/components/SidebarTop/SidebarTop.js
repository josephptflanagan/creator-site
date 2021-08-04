import React from 'react';

import Col from 'react-bootstrap/Col';

import GenreMenu from '../GenreMenu/GenreMenu';
import GameMenu from '../GameMenu/GameMenu';
import TagMenu from '../TagMenu/TagMenu';

import './SidebarTop.css';

const SidebarTop = () => {
	return (
		<Col
			lg={12}
			className="SidebarTop w-100 d-flex justify-content-center text-center"
		>
			<GenreMenu />
			<GameMenu />
			<TagMenu />
		</Col>
	);
};

export default SidebarTop;
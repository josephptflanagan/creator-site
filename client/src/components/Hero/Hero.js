  
import React from 'react';

import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';

import './Hero.css';

const Hero = () => {
	return (
		<Col lg={12} className="p-0">
			<Jumbotron className="Hero">
				<Image />
			</Jumbotron>
		</Col>
	);
};

export default Hero;
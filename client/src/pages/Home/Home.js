import React from 'react';
import Row from 'react-bootstrap/Row';
import './Home.css';

import Hero from '../../components/Hero/Hero';
import SidebarTop from '../../components/SidebarTop/SidebarTop';
import VideoGrid from '../../components/VideoGrid/VideoGrid';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    return (
            <>
			<Hero />
			<Row>
				<SidebarTop />
			</Row>
			<Row>
				<VideoGrid />
			</Row>
			<Footer />
        </>    
    );
};

export default Home;
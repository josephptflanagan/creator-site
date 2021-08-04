import React from 'react';
import './About.css';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';

const About = () => {
	return (
		<>
			<Col lg={12} className="p-0">
				<Jumbotron className="AbtHero">
					<Image />
				</Jumbotron>
			</Col>
			<main className="vh-100 d-flex flex-column align-items-center mt-5 pt-5">
				<h1 className="Abt mb-5">About Me</h1>
				<div className="col-lg-9 col-sm-12 p-4">
                <p>
                    Hello, I'm the Irresolute Cartographer, and this is a little bit of information about who I am.
                </p>
                <br />
                <p>
                    I'm a lifelong (almost) lover of video games, starting young with Warcraft, Railroad Tychoon, and Doom (the originals of all three). I've been playing games since 
                    floppy disks were actually floppy. I'm also a lover of maps of all types. I believe that maps can be one of the most effective tools in storytelling,
                    and I've drawn maps for fun since the third grade. Other than gaming and cartography, I enjoy learning as much as I can about almost any topic. In
                    literature I thoroughly enjoy the works of Robert Heinlein, Jerry Pournelle and Larry Niven, especially "The Moon is a Harsh Mistress," "Lucifer's Hammer,"
                    and "Falkenberg's Legion."
                </p>
                <br />
                <p>
                   I'm currently a manufacturing/mechanical engineer by trade, though I apsire to move into the world of software development and love making videos for my
                   YouTube channel. I'm a native Texan, where I live with my wife, dog and two cats.
                </p>
				</div>
			</main>
		</>
	);
};

export default About;
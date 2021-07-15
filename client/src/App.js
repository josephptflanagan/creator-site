import React, { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Blog from './components/Blog';
import Videos from './components/Videos';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Footer from "./components/Footer";

function App() {

    const [currentPage, handlePageChange] = useState('Home');

    const renderPage = () => {
        switch (currentPage) {
            case 'Home':
                return <Home />;
            case 'Blog':
                return <Blog />;
            case 'Videos':
                return <Videos />;
            case 'Shop':
                return <Shop />;
            case 'About':
                return <About />;
            case 'Contact':
                return <Contact />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="page-container">
            <Nav
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            ></Nav>
            <main>
                <div>{renderPage(currentPage)}</div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
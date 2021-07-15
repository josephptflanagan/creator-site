import React, { useEffect } from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';

function Nav(props) {
    const {
        currentPage,
        handlePageChange
    } = props;

    useEffect(() => {
        document.title = capitalizeFirstLetter(currentPage);
    }, [currentPage]);

    return (
        <header className="flex-row px-1">
            <nav>
                <ul className="flex-row">
                    <li className={`mx-2 ${currentPage === "Home" && `navActive`}`}>
                        <span onClick={() => handlePageChange("Home")} className={currentPage === "Home" ? 'nav-link active' : 'nav-link'}>Home</span>
                    </li>
                    <li className={`mx-2 ${currentPage === "Blog" && `navActive`}`}>
                        <span onClick={() => handlePageChange("Blog")} className={currentPage === "Blog" ? 'nav-link active' : 'nav-link'}>Blog</span>
                    </li>
                    <li className={`mx-2 ${currentPage === "Videos" && `navActive`}`}>
                        <span onClick={() => handlePageChange("Videos")} className={currentPage === "Videos" ? 'nav-link active' : 'nav-link'}>Videos</span>
                    </li>
                    <li className={`mx-2 ${currentPage === "Shop" && `navActive`}`}>
                        <span onClick={() => handlePageChange("Shop")} className={currentPage === "Shop" ? 'nav-link active' : 'nav-link'}>Shop</span>
                    </li>
                    <li className={`mx-2 ${currentPage === "About" && `navActive`}`}>
                        <span onClick={() => handlePageChange("About")} className={currentPage === "About" ? 'nav-link active' : 'nav-link'}>About</span>
                    </li>
                    <li className={`mx-2 ${currentPage === "Contact" && `navActive`}`}>
                        <span onClick={() => handlePageChange("Contact")} className={currentPage === "Contact" ? 'nav-link active' : 'nav-link'}>Contact</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;
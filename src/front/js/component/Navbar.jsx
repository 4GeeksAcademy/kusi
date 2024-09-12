import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg bg-light" style={{height:"100px"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0  d-flex justify-content-center align-items-center">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                    <div className="d-flex" role="search">
                        <button className="btn" type="button">
                            <FontAwesomeIcon icon={faCircleUser} />
                        </button>
                        <button className="btn" type="button">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
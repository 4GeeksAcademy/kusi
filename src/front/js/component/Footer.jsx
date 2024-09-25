import React from "react";
import kusiLogo from "../../assets/images/kusi-logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

//npm install @fortawesome/free-brands-svg-icons


export const Footer = () => {
    return(
        <footer className="text-black p-4 text-center">
            <div className="container">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="#">
                            <FontAwesomeIcon className="fs-4 fw-bold" style={{color:"#F44322"}} icon={faFacebook} />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">
                            <FontAwesomeIcon className="fs-4 fw-bold" style={{color:"#F44322"}} icon={faInstagram} />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">
                            <FontAwesomeIcon className="fs-4 fw-bold" style={{color:"#F44322"}} icon={faXTwitter} />
                        </a>
                    </li>
                </ul>
                <small>&copy; 2024 KUSI</small>
            </div>
        </footer>


    )
}
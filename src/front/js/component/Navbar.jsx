import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/navbar.css';
import kusiLogo from '../../assets/images/kusi-logo.png';

// TODO: Navbar should be imported in the main screen page.
export const Navbar = () => {
    const [role, ] = useState('client');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const navbarItemsByRole = {
        client: [
            { title: 'Menú', link: '#' },
            { title: 'Pedidos', link: '#' }
        ],
        chef: [
            { title: 'Pedidos', link: '#' }
        ],
        admin: [
            { title: 'Menú', link: '#' },
            { title: 'Pedidos', link: '#' },
            { title: 'Personal', link: '#' },
            { title: 'Reportes', link: '#' }
        ]
    };

    const navbarItems = navbarItemsByRole[role];

    return(
        <nav
            className="navbar navbar-expand-lg bg-white"
            style={{ minHeight:"100px" }}
        >
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <button
                        className="navbar-toggler border-0 d-lg-none me-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon
                            style={{ color:'#736F6F' }}
                            icon={faBars}
                        />
                    </button>
                    <Link to="/">
                        <div className="navbar-brand ms-lg-3 mx-auto d-flex justify-content-center align-items-center">
                            <img
                                className="navbar-logo"
                                src={kusiLogo}
                                alt="Kusi logo"
                                style={{ maxHeight: '50px', width: '60%' }}
                            />
                        </div>
                    </Link>
                </div>
                <div className="navbar-nav flex-row ms-auto order-lg-last">
                    {/* TODO: Link this to profile page */}
                    <button
                        className="btn"
                        type="button"
                    >
                        <FontAwesomeIcon
                            className="fs-2"
                            style={{ color: '#F44322' }}
                            icon={faCircleUser}
                        />
                    </button>
                    {/* TODO: Link this to cart page */}
                    <button
                        className="btn"
                        type="button"
                    >
                        <FontAwesomeIcon
                            className="fs-2"
                            style={{ color: '#F44322' }}
                            icon={faCartShopping}
                        />
                    </button>
                </div>
                
                <div className="collapse navbar-collapse order-lg-2 w-100 pt-0" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {navbarItems.map((item, index) => (
                            <li
                                key={index}
                                className="nav-item px-0 py-0 my-0 px-lg-5 mx-lg-2"
                            >
                                <a
                                    className="nav-link fs-4" 
                                    style={{ color: activeTabIndex === index ? "#F44322" : "black" }}
                                    href={item.link}
                                    onClick={() => setActiveTabIndex(index)}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

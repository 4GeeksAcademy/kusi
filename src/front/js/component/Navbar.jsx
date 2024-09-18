import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import kusiLogo from '../../assets/images/kusi-logo.png';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';





// TODO: Navbar should be imported in the main screen page.
export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [userId, setUserId] = useState(7);
    const navigate = useNavigate();

    // const token = store.token;

    // useEffect(() => {
  
    //     if (token) {
    //         try {
    //             const decodedToken = jwtDecode(token);
    //             setUserId(decodedToken.sub);
    //         } catch (error) {
    //             console.error("Error decoding token:", error);
    //         }
    //     }
    // },[token])

    const Roles = Object.freeze({
        CLIENT: 1,
        CHEF: 2,
        ADMIN: 3,
    });


    const handleViewProfile = () => {
        navigate("/profile");
    };

    useEffect(() => {
        if(userId){
            const fetchData = async () => {
                try {
                    await actions.getUsers();
                    await actions.getUsersById(userId)
                } catch (e) {
                    console.error("Error al obtener los datos del usuario", e);
                }
            };
            fetchData();
        }
    }, [userId]);


    const menuItemsByRole = {
        [Roles.CLIENT]: [
            { title: "Menú", link: "#" },
            { title: "Pedidos", link: "#" }
        ],
        [Roles.CHEF]: [
            { title: "Pedidos", link: "#" }
        ],
        [Roles.ADMIN]: [
            { title: "Menú", link: "#" },
            { title: "Pedidos", link: "#" },
            { title: "Personal", link: "#" },
            { title: "Reportes", link: "#" }
        ]
    };


    const roleId = store.dataUsersById?.role_id;
    const menuItems = menuItemsByRole[roleId] || menuItemsByRole[Roles.CLIENT];

    return (
        <nav className="navbar navbar-expand-lg bg-white" style={{ minHeight: "100px" }}>
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <button className="navbar-toggler border-0 d-lg-none me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon style={{ color: "#736F6F" }} icon={faBars} />
                    </button>
                    <Link to="/">
                        <div className="navbar-brand ms-lg-3 mx-auto d-flex justify-content-center align-items-center">
                            <img className="navbar-logo" src={kusiLogo} alt="Logo Kusi" style={{ maxHeight: "60px", width: "60%" }} />
                        </div>
                    </Link>
                </div>

                <div className="navbar-nav flex-row ms-auto order-lg-last">
                    <button className="btn" type="button">
                        <FontAwesomeIcon className="fs-2" style={{ color: "#F44322" }} icon={faCircleUser} onClick={handleViewProfile} />
                    </button>
                    {roleId === Roles.CLIENT && (
                        <button className="btn" type="button">
                            <FontAwesomeIcon className="fs-2" style={{ color: "#F44322" }} icon={faCartShopping} />
                        </button>
                    )}
                </div>

                <div className="collapse navbar-collapse order-lg-2 w-100 pt-0" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {menuItems.length > 0 ? menuItems.map((item, index) => (
                            <li className="nav-item px-0 py-0 my-0 px-lg-5 mx-lg-2" key={index}>
                                <a className="nav-link fs-4"
                                   style={{ color: activeTabIndex === index ? "#F44322" : "black" }}
                                   href={item.link}
                                   onClick={() => setActiveTabIndex(index)}>
                                    {item.title}
                                </a>
                            </li>
                        )) : (
                            <li className="nav-item px-0 py-0 my-0 px-lg-5 mx-lg-2">
                                <span className="nav-link fs-4">No hay opciones disponibles</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
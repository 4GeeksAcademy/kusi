import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
<nav className="navbar bg-light">
  <div className="container text-center">
    <div className="row g-0 w-100">
      <div className="col d-flex justify-content-start align-items-center">
        <Link to="/">
          {/* Logo KUSI */}
          <span className="navbar-brand mb-0 h1" style={{ color: '#F44322' }}>Kusi</span>
        </Link>
      </div>
      <div className="col d-flex justify-content-center align-items-center">
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item mx-5">
            <Link to="/" className="nav-link" style={{ color: 'red' }}>Menú</Link>
          </li>
          <li className="nav-item mx-5">
            <Link to="/" className="nav-link" style={{ color: 'red' }}>Pedidos</Link>
          </li>
        </ul>
      </div>
      <div className="col d-flex justify-content-end align-items-center">
        <Link to="/profile" className="nav-link">
          <button className="btn btn-danger rounded-circle">
            <i className="fa-solid fa-user" style={{ color: "#F44322" }}></i>
          </button>
        </Link>
        <Link to="/cart" className="nav-link">
          <i className="fa-solid fa-cart-shopping" style={{ color: '#F44322', fontSize: '1.5rem' }}></i>
        </Link>
      </div>
    </div>
  </div>
</nav>


	);
};

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { BiHomeAlt, BiHeart, BiCameraMovie, BiSearch } from "react-icons/bi";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <BiCameraMovie className="brand-icon" />
          <span>MovieHub</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            <BiHomeAlt className="nav-icon" />
            <span className="nav-text">Home</span>
          </Link>
          <Link to="/" className="nav-link mobile-only">
            <BiSearch className="nav-icon" />
            <span className="nav-text">Search</span>
          </Link>
          <Link
            to="/favourites"
            className={`nav-link ${isActive("/favourites") ? "active" : ""}`}
          >
            <BiHeart className="nav-icon" />
            <span className="nav-text">Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

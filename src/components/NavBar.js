import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ currentUser }) {
  return (
    <header>
      <div>
        <NavLink to="/bakers">Bakers</NavLink>
        <NavLink to="/favorites">My Favorites</NavLink>
      </div>
    </header>
  );
}

export default NavBar;

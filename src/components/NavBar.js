import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ currentUser, setCurrentUser}) {

  function logout() {

    setCurrentUser(null);
  }

  return (
    <header>
      <div>
        {currentUser ?  (
          <>
            <h1>Welcome, {currentUser.username}!</h1>
            <NavLink to="/bakers">Bakers</NavLink>
            <NavLink to="/favorites">My Favorites</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/bakers">Bakers</NavLink>
          </>
          )}

      </div>
    </header>
  );
}

export default NavBar;

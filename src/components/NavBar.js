import React from "react";
import { NavLink, useHistory } from "react-router-dom";

function NavBar({ currentUser, setCurrentUser}) {
  const history = useHistory();
  function logout() {
    setCurrentUser(null);
    history.push('/login');
  }
  
  return (
    <header>
      <div>
      <img className="logo" src="../mainLogo.png" />
        {currentUser ?  (
          <>
            <h1 className="welcome" >Welcome, {currentUser.username}!</h1>
            <NavLink to="/bakers">Bakers</NavLink>
            <NavLink to="/favorites">My Favorites</NavLink>
            <button className="logout" onClick={logout}>Logout</button>
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

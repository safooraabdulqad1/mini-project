import React, { useEffect, useState } from "react";
import "../Allstyles/styles.css";
import CreepyHeader from "./CreepyHeader.js";

function HHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      if (loginStatus !== isLoggedIn) {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isLoggedIn]);

  const handleClick = (event) => {
    const link = event.target;
    link.classList.add("active");

    setTimeout(() => {
      link.classList.remove("active");
    }, 1200);
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    // Redirect to the home page
    window.location.href = "/";
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/AddHaunt" onClick={handleClick}>
                ADD YOUR HAUNT
              </a>
            </li>
            <li>
              <a href="/ContactUs" onClick={handleClick}>
                CONTACT US
              </a>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <a href="/Register" onClick={handleClick}>
                    REGISTER
                  </a>
                </li>
                <li>
                  <a href="/signin" onClick={handleClick}>
                    LOGIN
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/profile" onClick={handleClick}>
                    PROFILE
                  </a>
                </li>
                <li>
                  <a href="/" onClick={handleLogout}>
                    LOGOUT
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
        {/* <CreepyHeader>Haunt Explorer</CreepyHeader> */}
        <h1 style={{color: '#480202', textAlign: 'center', fontSize: '4pc', fontFamily: 'Exquisite Corpse'}}>Haunt Explorer</h1>
      </header>
      <nav className="main-nav">
        <ul>
          <li>HAUNT EXPLORER</li>
          <li>
            <a href="/" onClick={handleClick}>
              HOME
            </a>
          </li>
          <li>
            <a href="places" onClick={handleClick}>
              HAUNTED PLACES
            </a>
          </li>
          <li>
            <a href="movies" onClick={handleClick}>
              HORROR MOVIES
            </a>
          </li>
          <li>
            <a href="books" onClick={handleClick}>
              HORROR BOOKS
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HHeader;

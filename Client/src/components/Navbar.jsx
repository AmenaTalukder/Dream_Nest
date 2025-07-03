import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../Styles/variable.scss";
import "../Styles/navbar.scss";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [dropdownMenu, setDropdownMenu] = useState(false);

  useEffect(() => {
    console.log("User from redux:", user);
    if (user?.profileImagePath) {
      console.log(
        "Profile image URL:",
        `http://localhost:3000${user.profileImagePath}`
      );
    }
  }, [user]);

  return (
    <div className="navbar">
      <a href="/">
        <img src="/Assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search....."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          disabled={search === ""}
          onClick={() => navigate(`/properties/search/${search}`)}
        >
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        <a href={user ? "/create-listing" : "/login"} className="host">
          Become A Host
        </a>

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey, fontSize: 30 }} />
          ) : (
            <img
              src={
                user.profileImagePath
                  ? `http://localhost:3000${user.profileImagePath}`
                  : "/Assets/defaultProfile.png"
              }
              alt="profile photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/Assets/defaultProfile.png";
              }}
            />
          )}
        </button>

        {dropdownMenu && (
          <div className="navbar_right_accountmenu">
            {!user ? (
              <>
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to={`/${user._id}/trips`}>Trip List</Link>
                <Link to={`/${user._id}/wishList`}>Wish List</Link>
                <Link to={`/${user._id}/properties`}>Property List</Link>
                <Link to={`/${user._id}/reservations`}>Reservation List</Link>
                <Link to="/create-listing">Become A Host</Link>
                <Link to="/login" onClick={() => dispatch(setLogout())}>
                  Log Out
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <nav>
        <div className="title">
          <h4>Share Recipes</h4>
          <div className="underline"></div>
        </div>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <CancelIcon className="icon" />
          ) : (
            <MenuIcon className="icon" />
          )}
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          {userInfo && (
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>
          )}
          {userInfo && (
            <li>
              <NavLink to={`/profile/${userInfo._id}`}>Profile</NavLink>
            </li>
          )}
          {userInfo && (
            <li className="navUser">
              <NavLink to={`posts/userPosts/${userInfo._id}`}>
                  {userInfo.userName}'s Recipes
              </NavLink>
            </li>
          )}
          {userInfo && (
            <li className="navUser">
              <h4>
                Hello, <span>{userInfo.userName}</span>!!
              </h4>
            </li>
          )}
          {!userInfo && (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          )}
          {userInfo && (
            <li onClick={handleLogout}>
              <ExitToAppRoundedIcon className="logout" />
            </li>
          )}
        </ul>
      </nav>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--clr-primary-4);
    color: white;
    position: sticky;
    top: 0;
    height: 6rem;
    padding: 2rem;
    z-index: 200;
  }
  nav .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  nav .title h4 {
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
    color: white;
  }

  nav .title .underline {
    background-color: var(--clr-white);
    height: 0.4rem;
    width: 65%;
  }

  nav ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  nav ul li {
    list-style: none;
  }

  nav ul li a {
    display: block;
    text-decoration: none;
    font-style: italic;
    color: var(--clr-white);
    font-size: 1.2rem;
    padding: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 0.5rem;
  }

  nav ul li a:hover {
    background-color: var(--clr-brown);
  }

  nav .menu {
    display: none;
    top: 0.75rem;
    right: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  nav .navUser h4 {
    margin-top: 0.3rem;
    font-style: italic;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0.5rem;
    line-height: 0;
    margin-bottom: 0;
  }

  nav .navUser h4 span {
    color: var(--clr-red);
  }

  .logout {
    cursor: pointer;
    font-size: 3rem;
  }

  .logout:hover {
    color: var(--clr-red);
  }

  @media screen and (max-width: 1120px) {
    nav .menu {
      display: block;
      cursor: pointer;
    }

    nav {
      flex-direction: column;
      height: 10rem;
      width: 100%;
    }

    nav ul {
      display: none;
      width: 100%;
    }

    nav ul.open {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--clr-primary-3);
      width: 60%;
      padding: 1rem;
    }

    nav ul li {
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    nav ul li a {
      margin: 0 0.5rem;
    }

    nav .title h4 {
      font-size: 2rem;
    }

    .navUser h4 {
      font-size: 0.8rem;
      padding: 1rem;
    }

    .icon {
      font-size: 5rem;
      padding: 1rem;
      color: var(--clr-white);
    }
  }
`;
export default Navbar;
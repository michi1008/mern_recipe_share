import React, {useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import img from "../assets/logo.png"
import { toggleSidebar, logout, reset } from "../features/users/userSlice"
import MenuSharpIcon from "@mui/icons-material/MenuSharp"
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)


  const toggle = () => {
    dispatch(toggleSidebar())
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <Wrapper>        
    <div className="navbarContainer">
        <div className="navbarHeader"> 
          <img src={img} alt="logo" />    
          <div className="title">
          Share Recipe
          <div className='underline'></div>       
          </div>
          <button type="button" className="nav-toggle" onClick={toggle}>
          <MenuSharpIcon />
          </button>
        </div>
        
        <div>
          <ul className="navbarLinks">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about" >About</Link><div id='underline'></div></li>
            {user && (<li><Link to="/create">Create</Link></li>)}
            {user && (<li><Link to={`/posts/userPosts/${user._id}`} >{user.userName}'s Recipes</Link></li>)}
            {user && <li className="navUser">Hello, {user.userName}!!</li>}
            {!user && (<><li><Link to="/login">Login</Link></li>      
            <li><Link to="/signup">Signup</Link></li></>)}
            {user && (<li onClick={onLogout}><ExitToAppRoundedIcon fontSize="large" sx={{ "& :hover": { color: "#b39656"} }} /></li>)} 
          </ul>  
        </div> 
    </div> 
    </Wrapper>   
  )
  
}
const Wrapper = styled.section`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
 

.navbarContainer{
  margin: 0 auto;
  width: 90vw;
  max-width: var(--max-width);
}

.navbarHeader{
  display: flex;
  justify-content: space-between;
  img {
    width: 3rem;
    margin-left: 1rem;
    margin-top: 1rem; 
  }
}

.nav-toggle {
  background: transparent;
  border: transparent;
  color: var(--clr-green);
  cursor: pointer;
  svg {
    font-size: 2rem;
  }
}

.navbarLinks {
  display: none;
}

.title {
  margin-left: 0.4rem;
  margin-top: 1rem;
  color: var(--clr-white);
  text-align: center;
  font-size: 2rem;
}


@media screen and (min-width: 800px){
  background-color: var(--clr-green);
  top: 0;
  z-index: 100;
  height: 7rem;
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  align-self: flex-start;
  
  .nav-toggle {
    display: none;
  }

  .navbarContainer {
    top: 0;
    width:100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }

  .navbarHeader {
    img {
      width: 5rem;
      margin: 1rem;
    }
    margin-top: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .navbarLinks {
    display: flex;
    justify-content: start;
    li {
      margin: 0 0.5rem;
    }
    a {
      color: var(--clr-white);
      font-size: 1.2rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      padding: 0.5rem;
      &:hover {
        border-bottom: 2px solid var(--clr-green);
      }
    } 
  .navUser {
    color: var(--clr-gold);
    font-size: 1.2rem;
  }
}

`
export default Navbar
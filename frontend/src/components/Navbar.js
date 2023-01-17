import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import img from "../assets/logo.png"
import { logout, reset } from "../features/users/userSlice"

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <Wrapper>        
    <div className="navbarContainer">
        <div className="navbarLeft"> 
        <img className="logo" src={img} alt="logo" />    
            <div className="title">
            <h4>Share Recipe</h4>
            <div className='underline'></div>       
            </div>
        </div>
        <div className="navbarCenter">
          <ul className="navbarList">
            <li className="navbarListItem"><Link className="link" to="/">Home</Link><div id='underline'></div></li>
            <li className="navbarListItem"><Link className="link" to="/about" >About</Link><div id='underline'></div></li>
            {user && (<li className="navbarListItem"><Link className="link" to="/create">Create</Link><div id='underline'></div></li>)}
            {user && (<li className="navbarListItem"><Link className="link" to={`/posts/userPosts/${user._id}`} >My Receips</Link><div id='underline'></div></li>)}
          </ul>
        </div>
        <div className="navbarRight">
            {user && <div className="navbarUser">Hello, {user.userName}!!</div>}
            {!user && (<><li className="navbarListItem"><Link className="link" to="/login">Login</Link><div id='underline'></div></li>      
            <li className="navbarListItem"><Link className="link" to="/signup">Signup</Link><div id='underline'></div></li></>)}
            {user && (<li className="navbarListItem" onClick={onLogout}><div id="logout">Logout</div><div id='underline'></div></li>)}   
        </div> 
    </div> 
    </Wrapper>   
  )
  
}
const Wrapper = styled.section`

.navbarContainer{
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center; 
  position: sticky;
  top: 0;
  z-index: 999;
}

.logo{
  margin-top: 1rem;
  margin-left: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.5%;
  object-fit: cover;
}

.navbarLeft{
  flex: 3;
  display: flex;
  justify-content: center;
}

.title{
  margin-left: 0.4rem;
  margin-top: 1rem;
  color: var(--clr-dark);
  text-align: center;
}

h4{
  font-size: 0.8rem;
}

.navbarCenter{
  flex: 6;
}

.navbarList{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.navbarListItem{
  color: var(--clr-dark);
  font-size: 0.75rem;
  font-weight: 400;
  cursor: pointer;
  margin-left: 0.3rem;
  margin-right: 0.5rem;
  display:block;
}

a:hover {
  color: var(--clr-gold);
}

#logout:hover{
  color: var(--clr-gold);
}

.navbarRight{
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: var(--clr-green);
}

.navbarUser{
  color: var(--clr-brown);
  font-size: 0.75rem;
}

@media screen and (min-width: 800px){
  .navbarContainer{
    height: 5rem;
  }
  
  .logo{
    margin-top; 0.8rem;
    width: 4rem;
    height: 4rem;
  }
  
  h4 {
    font-size: 1.5rem;
  }

  .title {
    margin: 2rem;
  }

  .underline{
    width: 80%;
    height: 0.25rem;
    background: var(--clr-green);
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.5rem; 
  }
  
  .navbarListItem{
    font-size: 1.4rem;
    font-weight: 500;
    margin-right: 1.2rem;
  }
  
  .navbarUser{
    font-size: 1.3rem;
  }
}

`
export default Navbar
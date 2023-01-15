import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updateUser } from "../features/users/userSlice"
import img from "../assets/signup.jpg"
import Spinner from "../components/Spinner"


const Profile = () => {
  const {id} = useParams()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user)
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    const updatedUser = {
      userId: user._id,
      userName,
      email,
      password,
    };
   
    if (updatedUser) {
      console.log(updatedUser)
    dispatch(updateUser(updatedUser))
    toast.success("Your profile was updated")
    }
  }

  const handleClear = () => {
    setUserName("")
    setEmail("")
    setPassword("")
  }

  if (isLoading) {
    return <Spinner />
  }

return (
  <Wrapper>
    <div className="signup">
    <span className="signupTitle">Profile</span>
    <form className="signupForm" onSubmit={onSubmit} >
      <label>Username</label>
      <input
        type="text"
        className="signupInput"
        id="userName"
        name="userName"
        placeholder={user.userName}
        onChange={(e) => setUserName(e.target.value)} 
      />
      <label>Email</label>
      <input
        type="email"
        className="signupInput"
        id="email"
        name="email"
        placeholder={user.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        className="signupInput"
        id="password"
        name="password"
        placeholder={user.password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signupButton" type="submit">
        Update
      </button>
    </form>
    <button className="signupLoginButton">
      <Link className="link" to="/login">
        Login
      </Link>
    </button>
  </div>
  </Wrapper>
)
}


const Wrapper = styled.section`
.signup{
background: url(${img});
min-height: 100%;
backgound-size: cover;
height:calc(100vh - 5rem);
width: 100%;
background-repeat: no-repeat;
background-position: center;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
opacity: 0.8;
}

/* .signup::before{
content: "";
background: url("/assets/signup.avif");
background-size: cover;
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
opacity: 0.6;
} */

.signupTitle{
font-size: 6rem;
color: var(--clr-dark);
margin-left: 2rem;
position: relative;
opacity: 1;
}

.signupForm{
position:relative;
margin-top: 1.2rem;
display: flex;
flex-direction: column;
opacity: 1;
z-index: 1000 !important;
}

.signupForm > Label{
margin: 1rem 0; 
color: var(--clr-dark);
}

.signupInput{
padding: 0.8rem;
background-color: var(--clr-white);
border: none;
border-radius: 0.5rem;

}

.signupButton{
margin-top: 1.2rem;
cursor: pointer;
background-color: var(--clr-brown);
border: none;
color: var(--clr-white);
border-radius: 0.5rem;
padding: 0.7rem;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.signupLoginButton{
position: absolute;
top: 6rem;
right: 1rem;
background-color: var(--clr-gold);
color: var(--clr-white);
border-radius: 0.5rem;
padding: 0.6rem;
cursor:pointer;
border: none;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
`

export default Profile
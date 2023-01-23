import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/users/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import img from "../assets/login.jpg"
import Spinner from "../components/Spinner"

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData)).unwrap().then(() => {
      navigate("/")
      window.location.reload()     
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  
    return (
      <Wrapper>
        <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="email"
            className="loginInput"
            placeholder="Enter your email..."
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter your password..."
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <button className="btn loginBtn" type="submit">
            Login
          </button>
        </form>
        <button className="btn loginSignupBtn">
          <Link className="link" to="/signup">
            Signup
          </Link>
        </button>
      </div>   
      </Wrapper>    
    )
  }
  
  
const Wrapper = styled.section`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-top: 2rem;

.login{
width:60%;
background-image: linear-gradient(
  rgba(255, 255, 255, 0.2),
  rgba(255, 255, 255, 0.2)
), url(${img});
border-radius: 3px;
background-color: var(--clr-gold);
background-repeat: no-repeat;
padding-top: 2rem;
padding-bottom: 2rem;
height:calc(100vh-5rem);
background-blend-mode: multiply; 
}
  
.loginTitle{
  font-size: 2rem;
  color: var(--clr-white);
  margin-left: 2rem;
}

.loginForm{
  margin: 1.2rem;
  display: flex;
  flex-direction: column;
}

.loginForm > Label{
  margin: 1rem 0; 
  color: var(--clr-white);
}

.loginInput{
  padding: 0.8rem;
  background-color: var(--clr-white);
  border: none;
  border-radius: 0.5rem;
}

.loginBtn{
  margin-top: 1.2rem;
  cursor: pointer;
  background-color: var(--clr-white);
  border: none;
  color: var(--clr-green);
  border-radius: 0.5rem;
  padding: 0.7rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.loginSignupBtn{
  position: absolute;
  top: 6rem;
  right: 2rem;
  margin-top: 1.2rem;
  cursor: pointer;
  background-color: var(--clr-gold);
  border: none;
  color: var(--clr-brown);
  border-radius: 0.5rem;
  padding: 0.7rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.loginSignupBtn:hover{
  background-color: var(--clr-blue);
}

@media screen and (min-width: 800px){
  .login{
    width:40%;
  }

  .loginTitle{
    font-size: 4rem;
    margin-left: 2rem;
    margin-top: 2rem;
  }
  
  .loginForm{
    margin-top: 1.2rem;
  }
  
  .loginForm > Label{
    margin: 1rem 0; 
  }
  
  .loginInput{
    padding: 0.8rem;
    border-radius: 0.5rem;
  }
  
  .loginBtn{
    margin-top: 1.2rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
  
  .loginSignupBtn{
    top: 6rem;
    right: 12rem;
    border-radius: 0.5rem;
    padding: 0.6rem;
  } 
}

`
export default Login


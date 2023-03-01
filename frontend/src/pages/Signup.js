import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signup, reset } from "../features/users/userSlice"
import img from "../assets/signup.jpg"
import Spinner from "../components/Spinner"

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
  })
  const { userName, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate("/")
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

    if (password !== password2) {
      toast.error("Passwords do not match 😅")
    } else {
      const userData = {
        userName,
        email,
        password,
      }

      dispatch(signup(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

return (
  <Wrapper>
    <div className="signup">
    <form className="signupForm" onSubmit={onSubmit}>
      <button className="btn signupLoginBtn">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      <span className="signupTitle">Signup</span>
      <label>Username</label>
      <input
        type="text"
        className="signupInput"
        id="userName"
        name="userName"
        value={userName}
        placeholder="Enter your name..."
        onChange={onChange} 
      />
      <label>Email</label>
      <input
        type="email"
        className="signupInput"
        id="email"
        name="email"
        value={email}
        placeholder="Enter your email..."
        onChange={onChange}
      />
      <label>Password</label>
      <input
        type="password"
        className="signupInput"
        placeholder="Enter your password..."
        id="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <label>Confirm Password</label>
      <input
        type="password"
        className="signupInput"
        placeholder="Confirm your password..."
        id="password2"
        name="password2"
        value={password2}
        onChange={onChange}
      />
      <button className="btn signupBtn" type="submit">
        Sign up
      </button>
    </form>
    
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
margin-bottom: 2rem;

.signup {
width: 60%;
background-image: linear-gradient(
  rgba(255, 255, 255, 0.4),
  rgba(255, 255, 255, 0.4)
), url(${img}); 
border-radius: 3px;
background-color: var(--clr-green);
background-repeat: no-repeat;
padding-top: 2rem;
padding-bottom: 2rem;
height:calc(100vh-5rem);
}

input::placeholder {
  color: var(--clr-brown);
}

input:focus {
  outline: 2px solid var(--clr-brown);
}

.signupTitle {
font-size: 2rem;
color: var(--clr-brown);
opacity: 1;
}

.signupForm {
position:relative;
margin-top: 1.2rem;
padding: 2rem;
display: flex;
flex-direction: column;
opacity: 1;
}

.signupForm > Label {
margin: 1rem 0; 
color: var(--clr-brown);
font-weight: 700;
}

.signupInput {
padding: 0.8rem;
background-color: var(--clr-white);
border: none;
border-radius: 0.5rem;
}

.signupBtn {
margin-top: 1.2rem;
cursor: pointer;
background-color: var(--clr-blue);
border: none;
color: var(--clr-white);
border-radius: 0.5rem;
padding: 0.7rem;
box-shadow:var(--dark-shadow);
}

.signupBtn:hover {
  background-color: var(--clr-white);
  color: var(--clr-blue);
}

.signupLoginBtn {
position: absolute;
top: 7rem;
right: 2rem;
background-color: var(--clr-blue);
border-radius: 0.3rem;
padding: 0.7rem;
cursor:pointer;
border: none;
box-shadow: var(--dark-shadow);
}

.signupLoginBtn a {
  color: var(--clr-lightblue);
}

.signupLoginBtn:hover {
  background-color: var(--clr-white);
  color: var(--clr-blue);
}

@media screen and (min-width: 800px){
  .signup {
    width:40%;
    border-radius: 3px;
    padding-top: 2rem;
    padding-bottom: 2rem;
    min-height: calc(100vh-8rem);
    }
    
    .signupTitle {
    font-size: 4rem;
    }
    
    .signupForm {
    margin-top: 1.2rem;
    padding: 2rem;
    }
    
    .signupForm > Label {
    margin: 1rem 0; 
    font-weight: 700;
    }
    
    .signupInput {
    padding: 0.8rem;
    border-radius: 0.5rem;
    }
    
    .signupBtn {
    margin-top: 1.2rem;
    border-radius: 0.5rem;
    padding: 0.7rem;
    }
    
    .signupLoginBtn {
    top: -3rem;
    right: 3rem;
    border-radius: 0.3rem;
    padding: 0.4rem;
    font-size: 1.5rem;
    }
}

`

export default Signup
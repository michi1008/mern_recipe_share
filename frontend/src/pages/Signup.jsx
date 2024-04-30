import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import img from "../assets/signup.jpg";
import Spinner from "../components/Spinner";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const isPasswordStrong = (password) => {
    // Define the criteria for password strength
    const minLength = 8; // Minimum length
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const digitRegex = /[0-9]/; // At least one digit
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // At least one special character
  
    // Check if the password meets all criteria
    return (
      password.length >= minLength &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else if (!isPasswordStrong(password)) {
      toast.error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
    } else {
      try {
        const res = await register({ userName, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div className="signup">
        <form className="signupForm" onSubmit={submitHandler}>
          <span className="signupTitle">Signup</span>
          <label>Username</label>
          <input
            type="text"
            className="signupInput"
            id="userName"
            name="userName"
            value={userName}
            placeholder="Enter your name..."
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            className="signupInput"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="signupInput"
            placeholder="Enter your password..."
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            className="signupInput"
            placeholder="Confirm your password..."
            id="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="btnContainer">
            <button
              className="btn signupBtn"
              type="submit"
              disabled={isLoading}
            >
              Sign up
            </button>
            <button className="btn signupLoginBtn">
              <Link
                className="link"
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
              >
                Login
              </Link>
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .signup {
    width: 40%;
    border-radius: 3px;
    padding-top: 2rem 0;
    min-height: calc(100vh-8rem);
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 0.4)
      ),
      url(${img});
    background-color: var(--clr-primary-4);
    background-repeat: no-repeat;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  input::placeholder {
    color: var(--clr-brown);
    font-size: 1.2rem;
  }

  input:focus {
    outline: 2px solid var(--clr-brown);
  }

  .signupTitle {
    font-size: 3rem;
    color: var(--clr-primary-4);
    opacity: 1;
  }

  .signupForm {
    position: relative;
    margin-top: 1.2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    opacity: 1;
  }

  .signupForm > Label {
    margin: 1rem 0;
    color: var(--clr-primary-4);
    font-size: 1.2rem;
    font-weight: 600;
  }

  .signupInput {
    padding: 0.8rem;
    background-color: var(--clr-white);
    border: none;
    border-radius: 0.5rem;
  }

  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .signupBtn {
    width: 8rem;
    font-size: 0.8rem;
    cursor: pointer;
    background-color: var(--clr-blue);
    border: none;
    color: var(--clr-white);
    border-radius: 0.5rem;
    padding: 0.7rem;
    box-shadow: var(--dark-shadow);
    font-size: 1rem;
    margin-top: 1rem;
  }

  .signupBtn:hover {
    background-color: var(--clr-red);
    color: var(--clr-white);
  }

  .signupLoginBtn {
    width: 8rem;
    background-color: var(--clr-red);
    border-radius: 0.3rem;
    padding: 0.7rem;
    cursor: pointer;
    border: none;
    box-shadow: var(--dark-shadow);
    font-size: 1rem;
    margin-top: 1rem;
  }

  .signupLoginBtn:hover {
    background-color: var(--clr-blue);
    color: var(--clr-white);
  }

  @media screen and (max-width: 800px) {
    .signup {
      width: 60%;
    }
    .signupTitle {
      font-size: 2rem;
    }
    .signupBtn {
      width: 6rem;
      font-size: 0.8rem;
    }
    .signupLoginBtn {
      width: 6rem;
      font-size: 0.8rem;
    }
    .signupForm > Label {
    font-size: 1rem;
    font-weight: 400;
    }
    input::placeholder {
      font-size: 1rem;
    }
  }
`;

export default Signup;

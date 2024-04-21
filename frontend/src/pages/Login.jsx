import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import img from "../assets/login.jpg";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div className="login">
        <h2 className="loginTitle">Login</h2>
        <form className="loginForm" onSubmit={submitHandler}>
          <label>Email</label>
          <input
            type="email"
            className="loginInput"
            placeholder="Enter your email..."
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter your password..."
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btnContainer">
            <button className="btn loginBtn" type="submit" disabled={isLoading}>
              Login
            </button>
            <button className="btn loginSignupBtn">
              <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
                Signup
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
  padding: 2rem;
  min-height: calc(100vh-5rem);

  .login {
    width: 40%;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2)
      ),
      url(${img});
    border-radius: 3px;
    background-color: var(--clr-primary-4);
    background-repeat: no-repeat;
    padding-top: 2rem;
    padding-bottom: 2rem;
    min-height: calc(100vh-5rem);
    background-blend-mode: multiply;
  }

  .loginTitle {
    font-size: 4rem;
    margin-left: 2rem;
    margin-top: 2rem;
    color: var(--clr-white);
    font-weight: 400;
  }

  .loginForm {
    margin: 1.2rem;
    display: flex;
    flex-direction: column;
  }

  .loginForm > Label {
    margin: 1rem 0;
    font-size: 1.3rem;
    color: var(--clr-white);
  }

  input:focus {
    outline: 2px solid var(--clr-brown);
  }

  .loginInput {
    padding: 0.8rem;
    background-color: var(--clr-white);
    border: none;
    border-radius: 0.5rem;
  }

  input::placeholder {
    color: var(--clr-brown);
    opacity: 1;
    font-size: 1.2rem;
  }

  .loginInput::-ms-input-placeholder {
    color: var(--clr-brown);
    font-size: 1.2rem;
  }

  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .loginBtn {
    width: 5rem;
    cursor: pointer;
    background-color: var(--clr-white);
    border: none;
    color: var(--clr-primar-4);
    border-radius: 0.3rem;
    padding: 0.5rem;
    box-shadow: var(--dark-shadow);
    font-size: 1.2rem;
    margin-top: 2rem;
  }

  .loginBtn:hover {
    background-color: var(--clr-brown);
    color: var(--clr-white);
  }

  .loginSignupBtn {
    width: 6rem;
    cursor: pointer;
    background-color: var(--clr-brown);
    border: none;
    border-radius: 0.3rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    box-shadow: var(--dark-shadow);
    margin-top: 2rem;
  }

  .loginSignupBtn:hover {
    background-color: var(--clr-white);
    color: var(--clr-brown);
  }

  @media screen and (max-width: 800px) {
    .login {
      width: 60%;
    }
    .loginTitle {
      font-size: 2rem;
    }
  }
`;
export default Login;

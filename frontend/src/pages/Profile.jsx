import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Spinner from "../components/Spinner";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.userName);
    setEmail(userInfo.email);
  }, [userInfo.userName, userInfo.email]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          userName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Wrapper>
      <div className="profilContainer">
        <div className="profile">
          <h2 className="profileTitle">User Profile</h2>
          <form className="Form" onSubmit={submitHandler}>
            <div className="formItem">
              <label>userName</label>
              <input
                type="text"
                placeholder="Enter your name..."
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="formItem">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email..."
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="formItem">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password..."
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="formItem">
              <label>Password Confirm</label>
              <input
                type="password"
                placeholder="Confirm your password..."
                id="password"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="profileBtnContainer">
              <button type="submit">Update</button>
            </div>
            {loadingUpdateProfile && <Spinner />}
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  /* main */
  .profileContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin: 3rem;
  }

  /* profile */
  .profile {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }
  .profileTitle {
    color: var(--clr-primary-4);
    margin: 2rem;
    font-size: 2.5rem;
  }

  .profileBtnContainer {
    padding-top: 2rem;
  }

  .formItem {
    margin-bottom: 2rem;
  }

  .formItem label {
    font-size: 1.2rem;
  }

  input:focus {
    outline: 2px solid var(--clr-brown);
  }

  @media (max-width: 1200px) {
    .profile-container {
      width: 90%;
      height: auto;
      flex-direction: column;
    }
  }
`;
export default Profile;

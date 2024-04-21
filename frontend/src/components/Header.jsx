import React from "react";
import styled from "styled-components";
import img from "../assets/header.jpg";

const Header = () => {
  return (
    <Wrapper>
      <div className="headerTitle">
        <h3>
          Let's share our favorite recipes with our friends and families! 🧑🏻‍🍳
        </h3>
      </div>
      <img className="headerImg" src={img} alt="cooking" />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .headerTitle h3 {
    color: var(--clr-primary-4);
    text-align: center;
    padding: 3rem;
  }

  .headerImg {
    width: 75%;
    height: 15rem;
    margin-top: 1rem;
    object-fit: cover;
    box-shadow: var(--light-shadow);
  }

  @media screen and (max-width: 800px) {
    .headerTitle {
      font-size: 1.5rem;
    }
  }
`;
export default Header;

import React from "react";
import styled from "styled-components";

const HowItWorks = () => {
  return (
    <Wrapper>
      <div className="title">
        <h2>How It Works</h2>
        <div className="underlineHow"></div>
      </div>
      <div className="steps">
        <div className="step">
          <h3>Step 1</h3>
          <p>Go to "Sign up" to register and then log in!</p>
        </div>
        <div className="step">
          <h3>Step 2</h3>
          <p>Go to "Create" to create your recipe and "Submit" to share!</p>
        </div>
        <div className="step">
          <h3>Step 3</h3>
          <p>
            You can find your recipe in "Home"! If you want to edit or delete,
            when you go to "Your recipes", you can edit or delete.{" "}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-primary-4);
  margin: 2rem;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .underlineHow {
    background-color: var(--clr-white);
    height: 0.4rem;
    width: 65%;
    margin-bottom: 2rem;
  }

  h2 {
    color: var(--clr-white);
    padding-top: 2rem;
  }

  h3 {
    color: var(--clr-primary-2);
  }

  p {
    color: var(--clr-white);
    font-size: 1.2rem;
  }

  .step {
    width: 30%;
  }

  .steps {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-between;
    padding: 1rem;
    gap: 1rem;
  }

  @media screen and (max-width: 800px) {
    .steps {
      flex-direction: column;
      align-items: center;
    }

    .step {
      width: 100%;
      padding: 1rem;
    }
  }
`;

export default HowItWorks;

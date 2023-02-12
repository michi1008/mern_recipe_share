import React from "react"
import styled from "styled-components"

const HowItWorks = () => {
  return (
    <Wrapper><h2>How It Works</h2>
    <div className="steps">
    <div className="step"><h3>Step 1</h3><p>Go to "Sign up" to register and then log in!</p></div>
    <div className="step"><h3>Step 2</h3><p>Go to "Create" to create your recipe and "Submit" to share!</p></div>
    <div className="step"><h3>Step 3</h3><p>You can find your recipe in "Home"! If you want to edit or delete, when you go to "Your recipes", you can edit or delete. </p></div>
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;

    h2{
    padding: 2rem;
    color: var(--clr-green)
    }

    p{
    color: var(--clr-light)
    }

    .steps{
        display:flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
    }


@media screen and (min-width: 800px){
    .steps{
        flex-direction: row;
        align-items: space-between;
    }

    .step{
        width: 30%;
        padding: 1rem;
    }
}

`

export default HowItWorks
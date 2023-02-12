import React from "react"
import styled from "styled-components"
import img from "../assets/header.jpg"

const Header = () => {
  return (
    <Wrapper>
        <div className="headerTitle">Let's share our favorite recipes with our friends and families! 🧑🏻‍🍳</div>
        <img className="headerImg" src={img} atl="cooking" />
    </Wrapper>
    
  )
}

const Wrapper = styled.section`
margin-top: 3rem;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 2rem;
background-color: var(--clr-background-2);

h4 {
  color: var(--clr-gold);
  text-align: center;
}

.headerTitle {
  color: var(--clr-green);
  font-size: 1.2rem;
  text-align: center;
}

.headerImg {
    width: 75%;
    height: 15rem;
    margin-top: 3rem;
    object-fit: cover;
    box-shadow: var(--light-shadow);
}

@media screen and (min-width: 800px){
  .headerTitle {
    font-size: 1.8rem;
  }
}

`
export default Header
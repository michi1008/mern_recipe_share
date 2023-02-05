import React from "react"
import styled from "styled-components"
import img from "../assets/header.jpg"

const Header = () => {
  return (
    <Wrapper>
        <div className="headerTitle">Let's share your favorite recipes with your friends and families! 🧑🏻‍🍳</div>
        <div><h4>Please sign up and create your recipe. 🍱</h4></div>
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

h4 {
  color: var(--clr-gold);
  text-align: center;
}

.headerTitle {
  color: var(--clr-brown);
  font-size: 1.5rem;
  text-align: center;
}

.headerImg {
    width: 75%;
    height: 15rem;
    margin-top: 3rem;
    object-fit: cover;
}

@media screen and (min-width: 800px){
  .headerTitle {
    font-size: 2rem;
  }
}

`
export default Header
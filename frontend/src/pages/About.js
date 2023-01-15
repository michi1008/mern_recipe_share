import React from "react"
import styled from "styled-components"
import img from "../assets/about.jpg"

const About = () => {
  return (
    <Wrapper>
        <div className="about">
        <div className="aboutTitle"><h1>About this site</h1></div>
        <div className="aboutContent">
            <p>This website is to share recipes among friends. <br></br>
                When I invite my friends for a dinner party, many of them ask me for my food recipes. My dishes are usally my own creations. I don"t follow any recipes. With this website, I can easily share my recipes with my friends. <br></br>
                In addition, I realized that many people think Japanese people only eat Sushi or Ramen. This is not the case. We have many home made varieties of food, including regional dishes within Japan. <br></br>
                You can find many recipes on Japanese websites, but they are mostly in Japanese. So I want to share some Japanese receipes on this site. <br></br>
                Last but not least, I created this site for my son, who lives in Japan. Since we don"t live in the same place, I can"t show him how to cook. With this website, I can share my recipes with him and he can also share his recipes. <br></br>
                I hope this recipe sharing website can help poeple to cook healthy and delicious meals and share their recipes with other friends and families. 
            </p>
        </div>
        </div>
    </Wrapper>
    

  )
}

const Wrapper = styled.section`
display: flex;
align-items: center;
justify-content: center;

.about{
    width: 60%;
    margin-top: 3rem;
    padding: 2rem;
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

.aboutTitle{
    color: var(--clr-dark);
}

p{
    color: var(--clr-green);
}


`
export default About
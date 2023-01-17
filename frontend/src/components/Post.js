import React, {useState} from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Post = ({ post }) => {
  
  const { _id, title, desc, image, user } = post
  
  return (
    <Wrapper>
      <div className="post">
        <div className="title"><h4>{title}</h4></div>
        <div className="desc"><p>{desc}</p></div>
        <div className="imageContainer"><img className="image" src={image.url} /></div>
        <Link to={`/posts/${_id}`} className="link">
            <span className="recipeLink">Go to recipe</span>
        </Link> 
      </div>
   </Wrapper>
  )
}

const Wrapper = styled.section`
.post {
  width: 20rem;
  margin: 2rem 1.2rem 2rem 1.2rem;
}

.title{
  color:var(--clr-green);
}

.image{
width: 100%;
height: 15rem;
object-fit: cover;
border-radius: 0.2rem;
box-shadow: var(--dark-shadow);
margin-bottom: 1rem;
}

.desc {
font-size: 1rem;
color: var(--clr-light);
font-style: italic;
line-height: 1.2rem;
margin-top: 1rem;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
}

.recipeLink {
  color: var(--clr-brown);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

.recipeLink:hover{
  color: var(--clr-red);
}

@media screen and (min-width: 800px){
  .post {
    width: 25rem;
    margin: 2rem 1.2rem 2rem 1.2rem;
  }
  
  .image{
  width: 100%;
  height: 20rem;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  }
  
  .desc {
  font-size: 1.2rem;
  line-height: 1.2rem;
  margin-top: 1rem;
  }
  
  .recipeLink {
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
  }

}


`
export default Post
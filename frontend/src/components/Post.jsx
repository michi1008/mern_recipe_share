import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import search from "../assets/search.png";

const Post = ({ post }) => {
 
  return (
    <Wrapper>
      <div className="post">
        <div className="title"><h4>{post.title}</h4></div>
        <div className="desc"><p>{post.desc}</p></div>
        <div className="imageContainer"><img className="image" src={post.image} /></div>
        <div className="userContainer">
        <div className="user"><p>Created by: {post.user ? post.user.userName : "Unknown"}</p></div> 
        <Link to={`/posts/${post._id}`} className="link">
            <div className="link-icon"><img src={search} alt="search" /></div>
        </Link>
        </div>
      </div>
   </Wrapper>
  )
}

const Wrapper = styled.section`
.post {
  width: 18rem;
  height: 30rem;
  background-color: var(--clr-primary-2);
  padding: 2rem;
  border-radius: 5px;
  box-shadow: var(--dark-shadow);
}

.title {
  color: var(--clr-primary-4);
  font-size: 1rem;
}

.image {
width: 100%;
height: 12rem;
object-fit: cover;
border-radius: 0.2rem;
box-shadow: var(--dark-shadow);
margin-bottom: 1rem;
}

.desc {
font-size: 1rem;
color: var(--clr-brown);
font-style: italic;
line-height: 1.2rem;
margin-top: 1rem;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
}

.userContainer {
  display: flex;
  flex-direction: row;
  align-itmes: center;
  justify-content: space-between;
}

.user p {
  color: var(--clr-primary-4);
}

.link-icon {
  color: var(--clr-primary-3);
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
}

.link-icon:hover {
  color: var(--clr-brown);
}

@media screen and (max-width: 800px){
  .post {
    width: 20rem;
    height: 25rem;
  }
  
  .image {
  width: 100%;
  height: 15rem;
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
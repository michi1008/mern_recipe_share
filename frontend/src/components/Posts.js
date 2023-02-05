import React from  "react"
import styled from "styled-components"
import Post from "./Post"

const Posts = ({ posts }) => {
  return (
    <Wrapper>
    <div className="posts">{posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <h3 className="no_posts">No recipe 😞</h3>
      )} </div>
      </Wrapper>
  )
}

const Wrapper = styled.section`
.posts {
    flex: 9;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}

.no_posts {
  margin-top: 2rem;
}

`
export default Posts
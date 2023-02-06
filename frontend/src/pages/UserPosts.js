import React, {useEffect} from "react"
import styled from "styled-components"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { getPostsByUser, deletePost, reset } from "../features/posts/postSlice"
import Spinner from "../components/Spinner"
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone"
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone"
import { toast } from "react-toastify"

const UserPosts = () => {
  const { user } = useSelector(state => (state.user))
  const { userPosts, isLoading, isError, message} = useSelector((state) => ({...state.post}))
  const userId = user._id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if(!user) {
      navigate("/login")
    }
    if(userId)
      dispatch(getPostsByUser(userId))
  }, [userId, navigate, isError, message, dispatch])

  const handledDeletePost = ( (id) => {
    if(window.confirm("Are you sure you want to delete this recipe?"))
    dispatch(deletePost(id))
    toast.success("Your post was deleted")
    navigate(`/posts/userPosts/${id}`)
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Wrapper>
      <div className="userPostsTitle">
        <div>{user && user.userName}'s recipes</div>
        <div className="underline"></div> 
      </div> 
      <div className="posts">
      {userPosts?.length > 0 ? (userPosts.map((post) => (
        <div className="post" key={post._id}>
          <div className="title"><h4>{post.title}</h4></div>
          <div className="desc"><p>{post.desc}</p></div>
          <div className="imageContainer"><img className="image" src={post.image} /></div>
          <div className="iconContainer">
          <Link to={`/posts/userPosts/${post._id}/edit`}><EditTwoToneIcon className="icon" /></Link>
          <DeleteTwoToneIcon className="icon" onClick={()=> handledDeletePost(post._id)} />
          </div>
        </div>        
      ))) : (
        <h3>You don't have any recipes...🥲</h3>
      )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 2rem;

.posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; 
}

.userPostsTitle {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.underline {
  width: 60%;
  height: 0.25rem;
  background: var(--clr-green);
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5rem; 
}

.post {
  width: 20rem;
  height: 26rem;
  margin: 2rem 1.2rem 2rem 1.2rem;
  background-color: var(--clr-background);
  padding: 1rem;
  border: 2px solid var(--clr-light);
  border-radius: 5px;
  box-shadow: var(--dark-shadow);
}

.title {
  color:var(--clr-green);
}

.image {
width: 100%;
height: 15rem;
object-fit: cover;
border-radius: 0.2rem;
box-shadow: var(--dark-shadow);
}

.desc {
font-size: 0.8rem;
color: var(--clr-gold);
font-style: italic;
line-height: 1.2rem;
margin-top: 1rem;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
}

.content {
  color: var(--clr-dark)
  font-size: 1.2rem;
  margin-top: 2rem;
}

.iconContainer {
  display: flex;
  justify-content : flex-end; 
}

.icon {
  color: var(--clr-green);
  margin-top: 0.5rem;
}

@media screen and (min-width: 800px){
  .userPostsTitle {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  
  .underline {
    height: 0.25rem;
    margin-top: 0.5rem; 
  }
  
  .post {
    width: 22rem;
    height: 30rem;
    margin: 2rem 1.2rem 2rem 1.2rem;
    border-radius: 5px; 
  }
  
   .image {
    width: 100%;
    height: 20rem; 
   }
  
   .desc {
    font-size: 1rem;
    line-height: 1.2rem;
    margin-top: 1rem;
  }
  
  .content {
    font-size: 1.5rem;
    margin-top: 2rem;
  }
  
  .icon {
    margin-top: 0.5rem;
  } 
}

`

export default UserPosts
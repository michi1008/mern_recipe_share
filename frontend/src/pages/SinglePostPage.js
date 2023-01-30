import React, { useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector} from "react-redux"
import { useParams, useNavigate} from "react-router-dom"
import { getPost, reset } from "../features/posts/postSlice"
import Spinner from "../components/Spinner"


  const SinglePostPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()  
    const navigate = useNavigate()

    const { post, isLoading, isError, message} = useSelector((state) =>({...state.post}))
    const { user } = useSelector((state)=> (state.user)) 

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    useEffect(() => {
      if (isError) {
        console.log(message)
      }  
      if(id) {
        dispatch(getPost(id))
      }
      return () => {
        dispatch(reset())
      }
    }, [id, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

    return (
      <Wrapper>
        <div className="leftContainer">
          <div className="title"><h3>{post?.title}</h3></div>
          <div className="image"><img className="image" src={post?.image} /></div>
          <div className="desc"><h4>{post?.desc}</h4></div>
          <div className="infoContainer">
            <div className="dateContainer">
              <div><p>Created at : {new Date(post?.createdAt).toLocaleString("en-US", options)}</p></div> 
            </div>
          </div>
        </div>
        <div className="recipeContainer">
          <div className="contentTitle"><h3>Recipe 👨🏽‍🍳</h3></div>
          <div className="ingredientContainer">
            <h4 className="arrayTitle">Ingredients</h4>
            {post?.ingredients &&
                post?.ingredients.map((i, index) => (
                <ul key={index}>
                    {post?.ingredients && <li>{i}</li>}
                </ul>
            ))}
          </div>             
          <div className="instructionContainer">
          <h4 className="arrayTitle">Instructions</h4>
          {post?.instructions &&
          post?.instructions.map((i, index) => (
          <ol key={index}>
              {post?.instructions && <li>{index+1} : {i}</li>}
          </ol>
            ))}
          </div> 
          </div>      
     </Wrapper>
    )
  }
  
const Wrapper = styled.section`
display:flex;
flex-direction: row;
justify-content: center;
align-items: center;

.leftContainer {
  display: flex;
  flex-direction: column;
  justfiy-content: center;
  align-items: center;
}

.image{
width: 100%;
height: 8rem;
object-fit: cover;
border-radius: 0.1rem;
box-shadow: var(--dark-shadow);
}

.desc {
font-size: 0.25rem;
color: var(--clr-green);
margin-top: 1rem;
font-style: italic;
}

.title {
  color: var(--clr-dark);
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1rem;
  cursor: pointer;
}

.recipeContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40rem;
}

.contentTitle{
  color: var(--clr-green);
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.instructionContainer{
  color: var(--clr-green)
}

.content {
  color: var(--clr-dark)
  font-size: 1.2rem;
  
}

.arrayTitle{
  color: var(--clr-brown);
}

.infoContainer{
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
}

.ingredientContainer{
  color: var(--clr-green);
}


.dateContainer{
  display:flex;
  flex-direction: row;
  color: var(--clr-gold);
}

@media screen and (min-width: 800px) {
  .recipeContainer{
    margin-left: 2rem;
  }
  
  .image{
  height: 20rem;
  border-radius: 0.1rem;
  }
  
  .desc {
  margin-top: 1rem;
  }
  
  .title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-top: 1rem;
  }
  
  .recipeContainer{
    margin-left: 3rem;
  } 

  .contentTitle{
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .content {
    font-size: 1.2rem;  
  }

}

`

export default SinglePostPage
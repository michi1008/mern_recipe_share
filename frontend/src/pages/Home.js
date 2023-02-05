import React, {useEffect} from "react"
import styled from "styled-components"
import { toast } from "react-toastify"
import { getPosts, reset } from "../features/posts/postSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Posts from "../components/Posts"
import Header from "../components/Header"
import Spinner from "../components/Spinner"

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { posts, isLoading, isError, message} = useSelector((state) => state.post)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <Wrapper>
      <Header />
      <div className="home"><Posts posts={posts} /></div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.home {
  display: flex;
  justify-content: center;
  align-items: center;
}

`
export default Home
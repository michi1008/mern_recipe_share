import React, { useState } from "react"
import styled from "styled-components"
import { Spinner } from "react-bootstrap"
import img from "../assets/write.jpg"
import { toast } from "react-toastify"
import { createPost } from "../features/posts/postSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import no_img from "../assets/no_image.jpg"
import Resizer from "react-image-file-resizer"

const NewPost = () => {

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [desc, setDesc] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, error } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.user)
  const id = user._id

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      400,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

  const handleImage = async (e) =>{
  const file = e.target.files[0]
  const base64 = await resizeFile(file)
  setImage(base64)
  }

  const ingredientAdd=()=>{
    const newIngredients=[...ingredients,[]]
    setIngredients(newIngredients)
  }

  const handleIngredientChange=(e,i)=>{
    const inputdata=[...ingredients]
    inputdata[i]=e.target.value
    setIngredients(inputdata)
  }

  const ingredientDelete=(i)=>{
    const deletIngredients=[...ingredients]
    deletIngredients.splice(i,1)
    setIngredients(deletIngredients)  
  }

  const instructionAdd=()=>{
    const newInstructions=[...instructions,[]]
    setInstructions(newInstructions)
  }

  const handleInstructionChange=(e,i)=>{
    const inputdata=[...instructions]
    inputdata[i]=e.target.value;
    setInstructions(inputdata)
  }

  const instructionDelete=(i)=>{
    const deletInstructions=[...instructions]
    deletInstructions.splice(i,1)
    setInstructions(deletInstructions)  
  }

  function handlePublish(e){
    e.preventDefault()
    if(!title || !image || !desc || !ingredients || !instructions){
      toast.error("Please fill all the fields")
    }
    if(title && image && desc && ingredients && instructions){
      const postData = {
        title,
        image,
        desc,
        ingredients,
        instructions,
      }
      dispatch(createPost(postData))
      toast.success("Recipe was created! 🚀")  
      navigate(`/posts/userPosts/${id}`)
      handleClear() 
    }
  } 

  const handleClear = () => {
    setTitle("")
    setImage("")
    setDesc("")  
    setIngredients([])
    setInstructions([])
  } 


 
if(isLoading){
  return <Spinner/>
}
  return (
    <Wrapper>
        <div className="titleContainer">
          <div className="mainTitle">Create a recipe!</div>
          <img className="writeImg" src={img} alt="" />
        </div>
        <form className="writeForm" enctype="multipart/form-data" onSubmit={handlePublish}>    
          <div className="topContainer"> 
            <label htmlFor="text">Title</label>
            <input
              className="writeTitle"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />   
            <label htmlFor="text">Description</label>
            <input
              className="writeDesc"
              type="text"
              name="desc"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            /> 
          </div>               
          <div className="imageContainer">
            <div className="imageUpload">
              {!image && <div className="imageText">Please upload an image before submitting your recipe!</div>}
              <input className="chooseBtn" type="file" name="image" accept=".jpeg, .png, .jpg" onChange={handleImage} />    
            </div>
            <div className="image">
              <div className="no_image">
              { !image && <img src={no_img}/>}
              {image && <img src={image} className="uploaded_image"/>}
              </div>
            </div>
          </div>
          <div className="arrayContainer">
            <div className="ingredients">
              <div>
                <div className="arrayTitleContainer">
                <div className="add_title">Ingredients</div>
                
                </div>
                    {ingredients.map((data,i)=>{
                        return(
                          <div className="form" key={i}>
                                <input className="arrayInput ingredients" type="text" value={data} onChange={e=>handleIngredientChange(e,i)} />
                                <button className="delete_btn" onClick={()=>ingredientDelete(i)}>x</button>
                          </div>
                        )
                    })}
                  <button className="add_btn" type="button" onClick={() => ingredientAdd()}>Add</button>
              </div>
            </div>
          <div className="instructions">
            <div>
              <div className="arrayTitleContainer">
              <div className="add_title">Instructions</div>
              
              </div>
                  {instructions.map((data,i)=>{
                      return(
                        <div className="form" key={i}>
                              <div className="order">{i+1} </div>
                              <textarea className="arrayInput instructions" type="text" value={data} onChange={e=>handleInstructionChange(e,i)} />
                              <button className="delete_btn" onClick={()=>instructionDelete(i)}>X</button>
                        </div>
                      )
                  })}
                  <button className="add_btn" type="button" onClick={() => instructionAdd()}>Add</button>
              </div>
            </div>
          </div>          
            <div className="buttonContainer">
            <button className="btn submitButton" type="submit" disabled={!title || !desc || !image || !ingredients || !instructions} onSubmit={handlePublish}>Submit</button>
            </div> 
          </form>
    </Wrapper>   
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 7rem);
  overflow: auto;

.titleContainer {
  color: var(--clr-brown);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.mainTitle {
  font-size: 1.2rem;
}

.writeImg {
  width: 50vw;
  height: 15vh;
  border-radius: 0.3rem;
  object-fit: cover;
  margin: 2rem;
  box-shadow: var(--light-shadow);
  margin: 0 auto;
}

.writeForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: var(--clr-background-2);
  padding: 1rem;

}

.topContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

label {
  font-size: 1rem;
  color: var(--clr-brown);
}

.writeTitle {
  border: 1px solid var(--clr-light);
  width: 15rem;
  height: 2rem;
}

.writeDesc {
  border: 1px solid var(--clr-light);
  width: 20rem;
  height: 2rem;
}

input {
  background-color: var(--clr-background);
}

input:focus {
  outline: 1px solid var(--clr-gold);
}

.imageContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 2rem auto;
}

.imageUpload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.imageText {
  color: var(--clr-brown);
  font-size: 0.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

.image {
  margin: 2rem;
}

.chooseBtn {
  background: var(--clr-green);
  color:var(--clr-white);
  width: 14rem;
  display: inline-block;
  padding: 1.2rem, 1.2rem;
  border: 1px solid var(--clr-dark);
  text-align: center;
}

.imageSubmit {
  padding: 0.3rem 2rem;
  border: 1px solid #000;
  width: 4rem;
  background: var(--clr-light);
  color: var(--clr-white);
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  appearance: button;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.arrayContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--clr-brown);
}

.ingredients {
  display:flex;
  flex-direction: column;
}

.arrayInput {
  border: 1px solid var(--clr-light);
}

.arrayInput:focus {
  outline: 1px solid var(--clr-gold);
}

.instructions {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-button: 1rem;
  margin-top: 1rem;
}

textarea {
  background-color: var(--clr-white);
  color:var(--clr-green);
  border: 1px solid var(--clr-green);
  border-radius: 2px;
  padding-left: 2px;
  height: 4rem;
}

textarea:focus {
  outline: 1px solid var(--clr-gold);
}

.order {
  color: var(--clr-green);
  font-size: 0.8rem;
  margin-right: 1rem;
}

.add_btn {
  padding: 0.2rem 0.2rem;
  border: 1px solid #000;
  width: 2rem;
  background: var(--clr-green);
  color: var(--clr-white);
  font-size: 0.6rem;
  font-weight: 400;
  cursor: pointer;
  text-align: center;
  appearance: button;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.delete_btn {
padding: 0.2rem 0.2rem;
border: 1px solid #000;
width: 1.8rem;
border-radius: 4px;
background: var(--clr-red);
color: var(--clr-white);
font-size: 1rem;
font-weight: 500;
cursor: pointer;
text-align: center;
appearance: button;
display: flex;
justify-content: center;
margin-left: 1rem;
}

.image{
  margin-bottom: 2rem;
}

.no_image {
  width: 8rem;
  height: 8rem;
}

img{
  width:8rem;
  height:8rem;
  object-fit:cover;
}

.buttonContainer {
  align-self: flex-end; 
  padding-bottom: 2rem;
}

.submitButton {
  color: var(--clr-white);  
  background-color: var(--clr-brown);
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  width: 6rem;
  text-align: center;
}

.submitButton:disabled {
  background: var(--clr-grey);
  color: var(--clr-white);
  cursor: not-allowed;
}

@media screen and (min-width: 800px){
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

.writeImg {
  width: 30vw;
  height: 25vh;
  margin: 2rem;
}

.mainTitle {
  font-size: 2rem;
}

.writeForm {
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  align-items: flex-start;
  margin-top: 2rem;
  padding: 0.5rem 2rem;
  border: 2px solid var(--clr-light); 
}

.titleContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

label {
  font-size: 1.5rem;
}

.writeTitle {
  width: 30rem;
}

.writeDesc  {
  width: 35rem;
}

.submitButton {
  padding: 0.5rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  width: 6rem;
  margin-botton: 2rem;
}

.imageContainer {
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-buttom: 3rem;
  margin-right: 2rem;
}

.imageUpload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.imageText {
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: start;
}

.image {
  margin-bottom: 2rem;
  margin-left: 2rem;
}

.chooseBtn {
  width: 15rem;
  padding: 1.2rem, 1.2rem;
  align-self: start;
}

.imageSubmit {
  padding: 0.3rem 2rem;
  border: 1px solid #000;
  width: 6rem;
  font-size: 1rem;
  margin-top: 1rem;
}

.image {
  margin-bottom: 2rem;
}

.no_image {
  width: 8rem;
  height: 8rem;
}

img {
  width: 8rem;
  height: 8rem;
  object-fit: cover;
}

.arrayContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 2rem;
  min-height: 20rem;
  width: 80%;
}

.ingredients {
  width: 25rem;
}

.instructions {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  width: 25rem;
}


.add_title {
  font-size: 1.5rem;
}

textarea {
  border-radius: 2px;
  padding-left: 2px;
  height: 4rem;
}

.order {
  font-size: 1rem;
  margin-right: 1rem;
  font-weight: 700;
}

.add_btn {
  padding: 0.2rem 0.2rem;
  border: 1px solid #000;
  width: 6rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
}

.delete_btn {
padding: 0.2rem 0.2rem;
border: 1px solid #000;
width: 1.8rem;
border-radius: 4px;
font-size: 1rem;
font-weight: 500;
margin-left: 1rem;
}

.buttonContainer {
  align-self: flex-end; 
  padding: 2rem;
}
}
`
export default NewPost
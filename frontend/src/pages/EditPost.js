import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Spinner } from "react-bootstrap"
import img from "../assets/write.jpg"
import { toast } from "react-toastify"
import { updatePost } from "../features/posts/postSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const EditPost = () => {
  const {id} = useParams()
  const userPosts = useSelector((state) => (state.post.userPosts))
  const postToEdit = userPosts.find((post) => post._id === id)
  const [title, setTitle] = useState(postToEdit.title)
  const [desc, setDesc] = useState(postToEdit.desc)
  const [ingredients, setIngredients] = useState(postToEdit.ingredients)
  const [instructions, setInstructions] = useState(postToEdit.instructions)
  const [image, setImage] = useState(postToEdit.image)

  const dispatch = useDispatch()
  const navigate = useNavigate()    

  const { isLoading } = useSelector((state) => ({...state.post}))

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

  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  //handle and convert it in base 64
  const handleImage = async (e) =>{
  const file = e.target.files[0]
  const base64 = await convertToBase64(file)
  console.log(base64)
  setImage(base64)
  }

  function handleUpdate(e){
    e.preventDefault()
    if(!title || !image || !desc || !ingredients || !instructions){
      toast.error("Please fill all the fields")
    }
    if(title && desc && image && ingredients && instructions){
      const updatePostData = {
        title,
        desc,
        ingredients,
        instructions,
        image, 
      }
      dispatch(updatePost({id, updatePostData}))
      toast.success("Recipe was updated! 🚀") 
      navigate(`/posts/userPosts/${id}`)
      
    }
    handleClear()
  } 

  const handleClear = () => {
    setTitle("")
    setDesc("")  
    setImage("")
    setIngredients([])
    setInstructions([])
  } 



  if(isLoading){
    return <Spinner/>
  }

  return (
    <Wrapper>
        <div className="titleContainer">
          <h3>Eidt your recipe!</h3>
          <img className="writeImg" src={img} alt="" />
        </div>
        <form className="writeForm" onSubmit={handleUpdate}>    
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
            <div><div className="imageText">The max file size is 100KB.</div>

            <input className="chooseBtn" type="file" name="image" accept=".jpeg, .png, .jpg" onChange={(e) => handleImage(e)} />    
            </div>
            <div className="image">
              <div className="no_image">
              {image && <img src={image} className="uploaded_image"/>}
              </div>
            </div>
          </div>
          <div className="arrayContainer">
            <div className="ingredients">
              <div>
                <div className="arrayTitleContainer">
                <div className="add_title">Ingredients</div>
                <button className="add_btn" type="button" onClick={() => ingredientAdd()}>Add</button>
                </div>
                    {ingredients.map((data,i)=>{
                        return(
                          <div className="form" key={i}>
                                <input className="arrayInput" type="text" value={data} onChange={e=>handleIngredientChange(e,i)} />
                                <button className="delete_btn" onClick={()=>ingredientDelete(i)}>x</button>
                          </div>
                        )
                    })}
              </div>
            </div>
          <div className="instructions">
            <div>
              <div className="arrayTitleContainer">
              <div className="add_title">Instructions</div>
              <button className="add_btn" type="button" onClick={() => instructionAdd()}>Add</button>
              </div>
                  {instructions.map((data,i)=>{
                      return(
                        <div className="form" key={i}>
                              <div className="order">{i+1} : </div>
                              <textarea className="arrayInput" type="text" value={data} onChange={e=>handleInstructionChange(e,i)} />
                              <button className="delete_btn" onClick={()=>instructionDelete(i)}>X</button>
                        </div>
                      )
                  })}
              </div>
            </div>
          </div> 
      <div className="buttonContainer">
      <button className="btn submitButton" type="submit" disabled={!title || !desc || !image || !ingredients || !instructions} onSubmit={handleUpdate}>Edit</button>
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
  margin: 2rem auto;
}

.mainTitle {
  font-size: 1.2rem;
}

.writeImg {
  width: 50vw;
  height: 15vh;
  border-radius: 0.3rem;
  object-fit: cover;
  margin-top: 2rem;
  box-shadow: var(--light-shadow);
}

.writeForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.topContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
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
  min-height: 12rem;
  color: var(--clr-brown);
  margin: 2rem auto;
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
  background-color: var(--clr-backgound);
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
  margin: 2rem auto;
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
  padding: 1rem;

.writeImg {
  width: 30vw;
  height: 25vh;
}

.mainTitle {
  font-size: 2rem;
}

.writeForm {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
  padding: 0.5rem 5rem;
  border: 2px solid var(--clr-light); 
}

.topContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
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
  align-items: center;
  flex-direction: row;
  margin-buttom: 3rem;
  margin-top: 2rem;
  margin-right: 2rem;
}

.imageText {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.image {
  margin-bottom: 2rem;
  margin-left: 2rem;
}

.chooseBtn {
  width: 15rem;
  padding: 1.2rem, 1.2rem;
}

.imageSubmit {
  padding: 0.3rem 2rem;
  border: 1px solid #000;
  width: 6rem;
  font-size: 1rem;
  margin-top: 1rem;
}

.arrayContainer {
  display: flex;
  flex-direction: column;
  align-items : flex-start;
  justify-content: flex-start;
  margin-top: 2rem;
  min-height: 20rem;
}

.instructions {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
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
`
export default EditPost


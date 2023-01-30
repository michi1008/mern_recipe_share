import React, { useState } from "react"
import styled from "styled-components"
import { Spinner } from "react-bootstrap"
import img from "../assets/write.jpg"
import { toast } from "react-toastify"
import { createPost } from "../features/posts/postSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import no_img from "../assets/no_image.jpg"

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
      navigate("/")
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

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
      toast.error("Image size is too big. The maxium is 50KB")
    }
  })
}
//handle and convert it in base 64
const handleImage = async (e) =>{
const file = e.target.files[0]
const base64 = await convertToBase64(file)
setImage(base64)
}
 
if(isLoading){
  return <Spinner/>
}
  return (
    <Wrapper>
      <div className="writeContainer">
        <div className="title">
          <h2>Create a recipe!</h2>
          <img className="writeImg" src={img} alt="" />
        </div>
        <div className="formContainer">
            <form className="writeForm" onSubmit={handlePublish}>    
              <div className="titleContainer"> 
                <label htmlFor="text"><h4>Title</h4></label>
                <input
                  className="writeTitle"
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />   
                 <label htmlFor="text"><h4>Description</h4></label>
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
                <div>{!image && <div className="imageText">Please upload an image before publishing your recipe! <br></br>The max file size is 100KB.</div>}

                <input className="chooseBtn" type="file" name="image" accept=".jpeg, .png, .jpg" onChange={(e) => handleImage(e)} />    
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
                <div className="inputForm">
                  <div className="add_title"><h4>Ingredients</h4></div>
                  <button className="add_btn" type="button" onClick={() => ingredientAdd()}>Add</button>
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
              <div className="inputForm">
                <div className="add_title"><h4>Instructions</h4></div>
                <button className="add_btn" type="button" onClick={() => instructionAdd()}>Add</button>
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
          <button className="writeSubmit" type="submit" disabled={!title || !desc || !image || !ingredients || !instructions} onSubmit={handlePublish}>Publish</button>
          </form>      
        </div>
      </div>
    </Wrapper>   
  )
}

const Wrapper = styled.section`

.writeContainer{
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-botoom: 3rem;
  min-height: calc(100vh - 7rem);
  overflow: auto;
}
.title{
  color: var(--clr-dark);
  text-align: center;
}
.writeImg{
  width: 30vw;
  height: 20vh;
  border-radius: 0.3rem;
  object-fit: cover;
  margin-top: 2rem;
  box-shadow: var(--light-shadow);
}
.titleContainer{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.writeTitle{
  background-color: var(--clr-white);
  border-radius: 0.3rem; 
  border-color: var(--clr-green);
  width: 18%;
}
.writeDesc{
  background-color: var(--clr-white);
  border-radius: 0.3rem; 
  border-color: var(--clr-green);
  width: 28%;
  margin-left: 1rem;
}
.writeForm{
  position: relative;
  margin-top: 2rem;
}
label{
  font-size: 1rem;
  color: var(--clr-green);
  margin-right : 1rem;
  margin-left: 1rem;
}
.formContainer{
  display:flex;
  align-items: center;
  flex-direction: column;
}
.writeSubmit{
  position: absolute;  
  top: -6rem;
  right: 2rem;
  color: var(--clr-white);  
  background-color: var(--clr-green);
  padding: 1rem;
  border: none;
  border-radius: 0.3rem;
  cursor:pointer;
  font-size: 1rem;
}
.writeSubmit:disabled{
  background: var(--clr-grey);
  color: var(--clr-white);
  cursor: not-allowed;
}
.imageContainer{
  display:flex;
  align-items: center;
  flex-direction: row;
  margin-buttom: 3rem;
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
}
.imageText{
  color: var(--clr-light);
  font-size: 1rem;
  margin-bottom: 1rem;
}
.image{
  margin-bottom: 2rem;
  margin-left: 1rem;
}
.chooseBtn{
  background: var(--clr-light);
  color:var(--clr-white);
  width: 12rem;
  display: inline-block;
  padding: 1.2rem, 1.2rem;
  border: 1px solid var(--clr-green);
  border-radius: 0.2rem;
  text-align: center;
}
.imageSubmit {
  padding: 0.3rem 2rem;
  border: 1px solid #000;
  width: 4rem;
  border-radius: 5px;
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
  align-items : center;
  justify-content: flex-start;
  margin-top: 2rem;
  height: 40rem;
}
.ingredients {
  display:flex;
  flex-direction: row;
}
.instructions {
  display: flex;
  flex-direction: row;
}

.form_text {
  margin-top: 1rem;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-button: 1rem;
  margin-top: 1rem;
}
input {
  background-color: var(--clr-backgound);
  color:var(--clr-green);
  border: 2px solid var(--clr-dark);
  border-radius: 4px;
  text-align:center;
}
textarea {
  background-color: var(--clr-backgound);
  color:var(--clr-green);
  border: 2px solid var(--clr-dark);
  border-radius: 2px;
  padding-left: 2px;
  height: 4rem;
}
.order {
  color: var(--clr-green);
  font-size: 1rem;
  margin-right: 1rem;
}
.add_btn {
  padding: 0.2rem 0.2rem;
  border: 1px solid #000;
  width: 6rem;
  border-radius: 4px;
  background: var(--clr-green);
  color: var(--clr-white);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  appearance: button;
  display: flex;
  justify-content: center;
  margin-left: 2rem;
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

@media screen and (min-width: 800px){

  label{
    font-size: 3rem;
  }

  .formContainer{
    display:flex;
    align-items: center;
    flex-direction: column;
  }
  .writeSubmit{
    position: absolute;  
    top: -6rem;
    right: -6rem;
    font-size: 1rem;
  }

  .imageContainer{
    display:flex;
    align-items: center;
    flex-direction: row;
    margin-buttom: 3rem;
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .imageText{
    font-size: 1rem;
    word-wrap: break-word;
    margin-bottom: 1rem;
  }
  
  .chooseBtn{
    width: 15rem;
  }

  .imageSubmit {
    padding: 0.3rem 2rem;
    width: 5rem;
    font-size: 1rem;
    margin-top: 1rem;
  }
  
  .arrayContainer {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 2rem;
    height: 40rem;
  }

  .arrayInput {
    width: 18rem;
  }
  textarea {
    height: 4rem;
  }
  .order {
    color: var(--clr-green);
    font-size: 1rem;
    margin-right: 1rem;
  }

  .add_btn {
    padding: 0.2rem 0.2rem;
    border: 1px solid #000;
    width: 6rem;
    font-size: 1rem;
    font-weight: 500;
    margin-left: 2rem;
  }

  .delete_btn {
  padding: 0.2rem 0.2rem;
  border: 1px solid #000;
  width: 1.8rem;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 1rem;
  }
  
  .image{
    margin-bottom: 2rem;
  }
  
  .no_image {
    width: 12rem;
    height: 12rem;
  }
  
  img{
    width: 15rem;
    height: 15rem;
  }
}
`
export default NewPost
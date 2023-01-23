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
  const [image, setImage] = useState(postToEdit.image.url)

  const dispatch = useDispatch()
  const navigate = useNavigate()    

  const { error, isLoading } = useSelector((state) => ({...state.post}))

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

  //handle and convert it in base 64
  const handleImage = (e) =>{
    const file = e.target.files[0]
    setFileToBase(file)
  }
  
  const setFileToBase = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () =>{
      setImage(reader.result)
    }
  }

  function handleUpdate(e){
    e.preventDefault()
    if(!title || !image || !desc || !ingredients || !instructions){
      toast.error("Please fill all the fields")
      return
    }
    if(title && desc && image && ingredients && instructions){
      const updatePostData = {
        title: title,
        desc: desc,
        ingredients : ingredients,
        instructions : instructions,
        image: image
      }
      dispatch(updatePost({id, updatePostData}))
      toast.success("Recipe was updated! 🚀") 
      navigate(`/posts/userPosts/${id}`)
      
    }
    handleClear();
  } 

  const handleClear = () => {
    setTitle("")
    setDesc("")  
    setImage(null)
    setIngredients([])
    setInstructions([])
  } 

  if(isLoading){
    return <Spinner/>
  }

  return (
    <Wrapper>
    <div className="write">
      <div className="title">
        <h2>Edit your recipe!</h2>
        <img className="writeImg" src={img} alt="" />
      </div>
      <div className="formContainer">
          <form className="writeForm" onSubmit={handleUpdate}>    
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
              <div><h4 className="imageText">Please re-upload image if you want to change it!</h4>
                <input className="chooseBtn" type="file" onChange={handleImage} />      
              </div>          
              <div>
              <img src={image} className="uploaded_image"/>
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
                                <input type="text" value={data} onChange={e=>handleIngredientChange(e,i)} />
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
                              <textarea type="text" value={data} onChange={e=>handleInstructionChange(e,i)} />
                              <button className="delete_btn" onClick={()=>instructionDelete(i)}>x</button>
                        </div>
                      )
                  })}
              </div>
            </div>
            </div>

        <button className="writeSubmit" type="submit" disabled={ !image || !ingredients || !instructions} onSubmit={handleUpdate}>Edit</button>
        </form>      
      </div>
    </div>
  </Wrapper>   
  )
}

const Wrapper = styled.section`
min-height: calc(100vh - 5rem);
margin: 1rem;

h3{
  color: var(--clr-green);
  font-size: 1.8rem;
}

.write{
  padding-top: 2.5rem;
  display: flex;
  align-items : center;
  flex-direction: column;
  justify-content: flex-start;
  padding-botoom: 3rem;
}

.title{
  color: var(--clr-dark);
  text-align: center;
}

.writeImg{
  width: 30%;
  height: auto;
  border-radius: 0.3rem;
  object-fit: cover;
  margin-top: 2rem;
  box-shadow: var(--light-shadow);
}

.titleContainer{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.writeTitle{
  background-color: var(--clr-white);
  border-radius: 0.3rem; 
  border-color: var(--clr-green);
  width: 20%;
}

.writeDesc{
  background-color: var(--clr-white);
  border-radius: 0.3rem; 
  border-color: var(--clr-green);
  width: 35%;
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
  right: 1rem;
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
}

.imageText{
  color: var(--clr-light);
  font-size: 0.8rem;
  margin-right: 4rem;
}

.image{
  margin-bottom: 2rem;
}

.chooseBtn{
  background: var(--clr-light);
  color:var(--clr-white);
  width: 14rem;
  display: inline-block;
  padding: 1.2rem, 2rem;
  border: 1px solid var(--clr-green);
  border-radius: 0.3rem;
}

.imageSubmit {
  padding: 0.3rem 2rem;
  border: 1px solid #000;
  width: 5rem;
  border-radius: 5px;
  background: var(--clr-light);
  color: var(--clr-white);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  appearance: button;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.no_image{
  width: 100%;
  height: 20vh;
  object-fit:cover;
}

.uploaded_image{
  width: 100%;
  height: 15rem;
  object-fit:cover;
}

.arrayContainer {
  display: flex;
  flex-direction: row;
  align-items : start;
  justify-content: space-between;
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
  margin-button: 1rem;
  margin-top: 1rem;
}

textarea {
  background-color: var(--clr-backgound);
  color:var(--clr-green);
  border: 2px solid var(--clr-dark);
  border-radius: 4px;
  text-align:center;
}

input {
  background-color: var(--clr-backgound);
  color:var(--clr-green);
  border: 2px solid var(--clr-dark);
  border-radius: 4px;
  text-align:center;
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

`
export default EditPost
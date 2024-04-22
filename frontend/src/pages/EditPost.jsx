import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../assets/write.jpg";
import { toast } from 'react-toastify';
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../slices/postsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import Spinner from "../components/Spinner";

const EditPost = () => {
  const { postId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const { data: post, isLoading, refetch, error } = useGetPostByIdQuery(postId);

  const [title, setTitle] = useState(post ? post.title : "");
  const [desc, setDesc] = useState(post ? post.desc : "");
  const [ingredients, setIngredients] = useState(post ? post.ingredients : []);
  const [instructions, setInstructions] = useState(
    post ? post.instructions : []
  );
  const [image, setImage] = useState(post ? post.image : "");
  const [category, setCategory] = useState(post ? post.category : "");

  const [updatePost, { isLoading: loadingUpdate }] = useUpdatePostMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ingredientAdd = () => {
    const newIngredients = [...ingredients, []];
    setIngredients(newIngredients);
  };

  const handleIngredientChange = (e, i) => {
    const inputdata = [...ingredients];
    inputdata[i] = e.target.value;
    setIngredients(inputdata);
  };

  const ingredientDelete = (i) => {
    const deletIngredients = [...ingredients];
    deletIngredients.splice(i, 1);
    setIngredients(deletIngredients);
  };

  const instructionAdd = () => {
    const newInstructions = [...instructions, []];
    setInstructions(newInstructions);
  };

  const handleInstructionChange = (e, i) => {
    const inputdata = [...instructions];
    inputdata[i] = e.target.value;
    setInstructions(inputdata);
  };

  const instructionDelete = (i) => {
    const deletInstructions = [...instructions];
    deletInstructions.splice(i, 1);
    setInstructions(deletInstructions);
  };

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

  //handle and convert it in base 64
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await resizeFile(file);
    setImage(base64);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Check if any required fields are empty
      if (
        !title ||
        !desc ||
        !ingredients ||
        !instructions ||
        !image ||
        !category
      ) {
        throw new Error("Please fill in all fields");
      }

      // Call the updatePost mutation with the correct arguments
      await updatePost({
        postId,
        data: {
          title,
          desc,
          ingredients,
          instructions,
          image,
          category,
        },
      }).unwrap();

      // Show success toast
      toast.success("Post updated");

      // Refetch data and navigate to the homepage
      refetch();
      navigate(`/posts/userPosts/${userId}`);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setImage(post.image || "");
      setDesc(post.desc || "");
      setIngredients(post.ingredients || []);
      setInstructions(post.instructions || []);
      setCategory(post.category || "");
    }
  }, [post]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div className="titleContainer">
        <h1>Edit your recipe!</h1>
        <div className="underline"></div>
        <img className="writeImg" src={img} alt="" />
      </div>
      {loadingUpdate && <Spinner />}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="error">{error?.data?.message || error.error}</div>
      ) : (
        <form className="writeForm" onSubmit={submitHandler}>
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
            <label htmlFor="text">Category</label>
            <select
              className="writeCagegory"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              <option value="meat">Meat</option>
              <option value="fish">Fish</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="noodle">Noodle</option>
              <option value="dessert">Desert</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="imageContainer">
            <div className="imageUpload">
              <div className="imageText">
                <p>
                  If you need to update the image, please upload the new image.
                </p>
              </div>
              <input
                className="chooseBtn"
                type="file"
                name="image"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleImage(e)}
              />
            </div>
            <div className="image">
              <div className="no_image">
                {image && <img src={image} className="uploaded_image" />}
              </div>
            </div>
          </div>
          <div className="arrayContainer">
            <div className="ingredients">
              <div>
                <div className="arrayTitleContainer">
                  <div className="arrayTitle">Ingredients</div>
                </div>
                {ingredients.map((data, i) => {
                  return (
                    <div className="form" key={i}>
                      <input
                        className="arrayInput ingredients"
                        type="text"
                        value={data}
                        onChange={(e) => handleIngredientChange(e, i)}
                      />
                      <button
                        className="deleteBtn"
                        onClick={() => ingredientDelete(i)}
                      >
                        x
                      </button>
                    </div>
                  );
                })}
                <button
                  className="addBtn"
                  type="button"
                  onClick={() => ingredientAdd()}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="instructions">
              <div>
                <div className="arrayTitleContainer">
                  <div className="arrayTitle">Instructions</div>
                </div>
                {instructions.map((data, i) => {
                  return (
                    <div className="form" key={i}>
                      <div className="order">{i + 1} </div>
                      <textarea
                        className="arrayInput instructions"
                        type="text"
                        value={data}
                        onChange={(e) => handleInstructionChange(e, i)}
                      />
                      <button
                        className="deleteBtn"
                        onClick={() => instructionDelete(i)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
                <button
                  className="addBtn"
                  type="button"
                  onClick={() => instructionAdd()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="buttonContainer">
            <button
              className="btn submitButton"
              type="submit"
              onSubmit={submitHandler}
            >
              Edit
            </button>
          </div>
        </form>
      )}
      ;
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 7rem);
  overflow: auto;
  margin: 2rem 0;

  .titleContainer {
    color: var(--clr-brown);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  .underline {
    background-color: var(--clr-brown);
    height: 0.4rem;
    width: 65%;
    margin-bottom: 3rem;
  }

  .writeImg {
    width: 35vw;
    height: 25vh;
    border-radius: 0.3rem;
    object-fit: cover;
    box-shadow: var(--light-shadow);
    margin: 0 auto;
  }

  // From

  .writeForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: var(--clr-primary-2);
    padding: 2rem;
    margin-top: 3rem;
  }

  .topContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  label {
    font-size: 1.5rem;
    color: var(--clr-primary-4);
  }

  .writeTitle {
    width: 15rem;
    height: 2rem;
  }

  .writeDesc {
    border: 1px solid var(--clr-primary-3);
    width: 25rem;
    height: 2rem;
  }

  input {
    background-color: var(--clr-primary-3);
    color: var(--clr-white);
    margin-bottom: 2rem;
  }

  input:focus {
    outline: 1px solid var(--clr-brown);
  }

  .writeCagegory {
    width: 15rem;
    height: 2rem;
    background-color: var(--clr-primary-3);
    color: var(--clr-white);
    border-radius: 0.3rem;
  }

  .writeCategory:focus {
    outline: 2px solid var(--clr-brown);
  }

  // image

  .imageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 2rem auto;
  }

  .imageUpload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .imageText {
    color: var(--clr-prrimay-4);
    font-size: 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .image {
    margin: 2rem;
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

  .chooseBtn {
    background: var(--clr-primary-4);
    color: var(--clr-white);
    width: 16rem;
    display: inline-block;
    padding: 1.2rem, 1.2rem;
    border: 1px solid var(--clr-primary-4);
    text-align: center;
    font-size: 1rem;
  }

  // Array

  .arrayContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: var(--clr-primary-4);
    padding: 2rem 0;
  }

  .arrayTitleContainer {
    padding: 2rem 0;
  }

  .arrayTitle {
    color: var(--clr-primary-4);
    font-size: 1.5rem;
  }
  
  .ingredients {
    display: flex;
    flex-direction: column;
  }

  .arrayInput {
    border: 2px solid var(--clr-primary-3);
  }

  .arrayInput:focus {
    outline: 2px solid var(--clr-brown);
  }

  input.arrayInput.ingredients {
    width: 25rem; 
  }

  .instructions {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }

  .form {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  textarea {
    background-color: var(--clr-primary-3);
    color: var(--clr-white);
    border: 1px solid var(--clr-primary-3);
    border-radius: 5px;
    height: 5rem;
    width: 40rem;
    font-size: 1rem;
    padding: 0.5rem;
  }

  .order {
    color: var(--clr-primary-4);
    font-size: 1rem;
    margin-right: 1rem;
  }

  .addBtn {
    padding: 0.2rem 0.2rem;
    border: 1px solid var(--clr-primary-4);
    width: 5rem;
    background: var(--clr-primary-4);
    color: var(--clr-white);
    font-size: 1.2rem;
    font-weight: 400;
    cursor: pointer;
    text-align: center;
    appearance: button;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    border-radius: 5px;
  }

  .addBtn:hover {
    background: var(--clr-white);
    color: var(--clr-primary-4);
  }

  .deleteBtn {
    padding: 0.2rem 0.2rem;
    border: 1px solid var(--clr-primary-4);
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

  .buttonContainer {
    align-self: flex-start;
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

  .submitButton:hover {
    color: var(--clr-brown);
    background-color: var(--clr-white);
  }

  .submitButton:disabled {
    background: var(--clr-primary-2);
    color: var(--clr-brown);
    cursor: not-allowed;
  }

  @media screen and (max-width: 800px) {
    .writeForm {
      padding: 1rem;
    }

    .topContainer {
      align-items: center;
    }

    .writeTitle,
    .writeDesc,
    .writeCategory,
    .arrayInput,
    input {
      width: 100%; 
    
    .arrayInput {
      margin-top: 0.5rem; 
    }

    .instructions {
      margin-top: 2rem; 
    }

    textarea {
      background-color: var(--clr-primary-4);
      color: var(--clr-white);
      border: 1px solid var(--clr-primary-4);
      border-radius: 5px;
      height: 5rem;
      width: 45rem;
      font-size: 1rem;
      padding: 0.5rem;
    }

    .addBtn,
    .deleteBtn,
    .submitButton {
      width: auto; 
      margin-top: 1rem; 
    }

    .buttonContainer {
      align-self: start; 
    }
  }
`;
export default EditPost;

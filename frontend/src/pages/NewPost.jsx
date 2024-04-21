import React, { useState } from "react";
import styled from "styled-components";
import img from "../assets/write.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import no_img from "../assets/no_image.jpg";
import Resizer from "react-image-file-resizer";
import {
  useCreatePostMutation,
  useGetPostsByUserQuery,
} from "../slices/postsApiSlice";
import Spinner from "../components/Spinner";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const navigate = useNavigate();

  const [createPost, { isLoading }] = useCreatePostMutation();

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

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await resizeFile(file);
    setImage(base64);
  };

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

  function handlePublish(e) {
    e.preventDefault();
    if (
      !title ||
      !image ||
      !desc ||
      !ingredients ||
      !instructions ||
      !category
    ) {
      toast.error("Please fill all the fields");
    } else {
      const postData = {
        title,
        image,
        desc,
        ingredients,
        instructions,
        category,
      };
      createPost(postData)
        .unwrap()
        .then((result) => {
          const postId = result.id;
          toast.success("Recipe was created! 🚀");
          navigate(`/posts/userPosts/${postId}`);
          handleClear();
        })
        .catch((error) => console.error("Failed to create post:", error));
    }
  }

  const handleClear = () => {
    setTitle("");
    setImage("");
    setDesc("");
    setCategory("");
    setIngredients([]);
    setInstructions([]);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Wrapper>
      <div className="titleContainer">
        <div className="mainTitle">
          <h2>Create a recipe!</h2>
        </div>
        <img className="writeImg" src={img} alt="" />
      </div>
      <form
        className="writeForm"
        encType="multipart/form-data"
        onSubmit={handlePublish}
      >
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
            className="category"
            id="category"
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
            {!image && (
              <div className="imageText">
                <p>Please upload an image before submitting your recipe!</p>
              </div>
            )}
            <input
              className="chooseBtn"
              type="file"
              name="image"
              accept=".jpeg, .png, .jpg"
              onChange={handleImage}
            />
          </div>
          <div className="image">
            <div className="no_image">
              {!image && <img src={no_img} />}
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
            disabled={
              !title || !desc || !image || !ingredients || !instructions
            }
            onSubmit={handlePublish}
          >
            Submit
          </button>
        </div>
      </form>
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

  .titleContainer {
    color: var(--clr-primary-4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }

  .writeImg {
    width: 30vw;
    height: 25vh;
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
    align-items: flex-start;
    margin: 0 auto;
    background-color: var(--clr-primary-2);
    padding: 2rem;
  }

  .topContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
  }

  .topContainer label {
    font-size: 1.5rem;
    color: var(--clr-primary-4);
  }

  .writeTitle {
    border: 2px solid var(--clr-primary-3);
    width: 15rem;
    height: 3rem;
    margin-bottom: 2rem;
  }

  .writeDesc {
    border: 2px solid var(--clr-primary-3);
    width: 22rem;
    height: 4rem;
    margin-bottom: 2rem;
  }

  input {
    background-color: var(--clr-primary-1);
  }

  input:focus {
    outline: 2px solid var(--clr-brown);
  }

  // category

  .category {
    padding: 0.5rem;
    background-color: var(--clr-primary-1);
    border: 2px solid var(--clr-primary-3);
    border-radius: 0.5rem;
    color: var(--clr-brown);
    font-size: 1.5rem;
    height: 3rem;
  }

  .category:focus {
    outline: 2px solid var(--clr-brown);
  }

  //image

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

  //array

  .arrayContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: var(--clr-primary-4);
    padding: 2rem;
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
    border: 2px solid var(--clr-primary-4);
  }

  .arrayInput:focus {
    outline: 2px solid var(--clr-brown);
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
    background-color: var(--clr-primary-1);
    color: var(--clr-green);
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
    align-self: flex-end;
    padding-bottom: 2rem;
  }

  .submitButton {
    color: var(--clr-white);
    background-color: var(--clr-brown);
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1.2rem;
    width: 7rem;
    text-align: center;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;

    .writeImg {
      width: 50vw;
      height: 25vh;
    }

    .mainTitle {
      font-size: 1.5rem;
    }

    .titleContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 2rem 0;
    }

    .topContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 2rem;
    }

    .topContainer label {
      font-size: 1rem;
    }

    .writeTitle {
      width: 20rem;
    }

    .writeDesc {
      width: 25rem;
    }

    .category {
      font-size: 1.2rem;
    }
  
    .submitButton {
      padding: 0.5rem;
      border-radius: 0.3rem;
      font-size: 0.8rem;
      width: 5rem;
      margin-botton: 2rem;
    }

    .imageContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-buttom: 3rem;
      margin-right: 2rem;
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
      width: 14rem;
      font-size: 0.8rem;
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

    .arrayTitle {
      font-size: 1.2rem;
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

    .addBtn {
      font-size: 1rem;
    }

    .deleteBtn {
      padding: 0.2rem 0.2rem;
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
`;
export default NewPost;

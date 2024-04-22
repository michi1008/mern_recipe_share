import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetPostByIdQuery,
  useCreateCommentMutation,
} from "../slices/postsApiSlice";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify';
import reply from "../assets/reply.png";

const SinglePostPage = () => {
  const { postId } = useParams();

  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const { data: post, isLoading, error, refetch } = useGetPostByIdQuery(postId);

  const [createComment, { isLoading: loadingComment }] =
    useCreateCommentMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createComment({
        postId,
        comment,
        user: userInfo._id,
      }).unwrap();
      refetch();
      toast.success("Your comment was added successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  if (!post) {
    return <Spinner />;
  }

  // Ensure post.comments is an array before mapping over it
  const postCommentsWithReplies = Array.isArray(post.comments)
    ? post.comments.map((comment) => ({
        ...comment,
      }))
    : [];

  const submitReply = async (parentCommentId) => {
    try {
      const newReply = await createComment({
        postId,
        comment,
        user: userInfo._id,
        parentCommentId,
      }).unwrap();

      // Find the parent comment's index based on its _id
      const parentCommentIndex = postCommentsWithReplies.findIndex(
        (comment) => comment._id === parentCommentId
      );

      // Add the new reply to the parent comment's replies array
      if (parentCommentIndex !== -1) {
        postCommentsWithReplies[parentCommentIndex].replies.push(newReply);
        refetch();
        toast.success("Your reply was added successfully");
      } else {
        toast.error("Parent comment not found");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div className="recipeTop">
        <div className="topLeft">
          <div className="title">
            <h3>{post?.title}</h3>
          </div>
          <div className="image">
            <img className="image" src={post?.image} />
          </div>
          <div className="desc">
            <h4>{post?.desc}</h4>
          </div>
          <div className="infoContainer">
            <div className="dateContainer">
              <div>
                <p>
                  Created at :{" "}
                  <span>
                    {new Date(post.createdAt).toLocaleString("en-US", options)}
                  </span>
                </p>
                <p>
                  Created by :{" "}
                  <span>
                    {post.user && post.user.userName
                      ? post.user.userName
                      : "Unknown"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="topRight">
          <div className="commentContainer">
            <h3>Comments</h3>
            {postCommentsWithReplies.map((postComment) => (
              <ul key={postComment._id}>
                <p
                  className={`comment ${
                    replyingTo === postComment._id ? "reply" : ""
                  }`}
                >
                  "{postComment.comment}" by <span>{postComment.userName}</span>
                </p>
                {/* Display the textarea only if the user is replying to this comment */}
                {replyingTo === postComment._id && (
                  <form onSubmit={() => submitReply(postComment._id)}>
                    <textarea
                      className="commentInput"
                      placeholder="Reply to this comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                  </form>
                )}
                {/* Display replies under the original comment */}
                {postComment.replies.length > 0 &&
                  postComment.replies.map((reply) => (
                    <ul key={reply._id}>
                      <p className={`comment reply`}>
                        "{reply.comment}" by <span>{reply.userName}</span>
                      </p>
                    </ul>
                  ))}
                {/* Display the "Reply" button for each comment */}
                {userInfo && (
                  <button
                    className="replyBtn"
                    onClick={() => handleReplyClick(postComment._id)}
                  >
                   reply
                  </button>
                )}
              </ul>
            ))}
          </div>
          <div className="createCommentContainer">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <label>
                  <h4 className="addCommentText">Add your Comment</h4>
                </label>
                <textarea
                  className="commentInput"
                  placeholder="Enter your comment..."
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button className="commentSubmit" type="submit">Submit</button>
              </form>
            ) : (
              <div className="commentAskLogin">
                <p>Please <Link to="/login">Login</Link> to comment</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="recipeDown">
        <div className="contentTitle">
          <h3>Recipe 👨🏽‍🍳</h3>
        </div>
        <div className="ingredientContainer">
          <h4 className="arrayTitle">Ingredients</h4>
          {post?.ingredients &&
            post?.ingredients.map((i, index) => (
              <ul className="arrayItems" key={index}>
                {post?.ingredients && <li>{i}</li>}
              </ul>
            ))}
        </div>
        <div className="instructionContainer">
          <h4 className="arrayTitle">Instructions</h4>
          {post?.instructions &&
            post?.instructions.map((i, index) => (
              <ol key={index}>
                {post?.instructions && (
                  <li className="arrayItems">
                    {index + 1}. {i}
                  </li>
                )}
              </ol>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;

  .recipeTop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 3rem;
  }

  .topLeft {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex:2;
  }

  .topRight {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start
    flex:1;
    margin-left: 3rem;
  }

  // recipe top overvew

  .image {
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    border-radius: 0.1rem;
    box-shadow: var(--dark-shadow);
  }

  .desc {
    font-size: 0.25rem;
    color: var(--clr-red);
    margin-top: 1rem;
    font-style: italic;
  }

  .title {
    color: var(--clr-primary-3);
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 1rem;
    cursor: pointer;
  }

  .infoContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .dateContainer {
    display: flex;
    flex-direction: row;
    color: var(--clr-brown);
  }

  // Recipe 


  .recipeDown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 3rem;
    margin-left: 3rem;
    gap: 3rem;
  }

  .contentTitle h3 {
    color: var(--clr-primary-3);
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .arrayTitle {
    color: var(--clr-red);
    font-size: 1.5rem;
  }

  .arrayItems {
    font-size: 1.2rem;
    color: var(--clr-primary-4);
  }

 
  // comments

  .commentContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
    flex; 1;
  }

  .commentContainer h3 {
    color: var(--clr-primary-3);
  }

  .comment {
    color: var(--clr-primary-4);
    font-size: 1rem;
  }

  .addCommentText{
    color: var(--clr-primary-3);
  }

  .createCommentContainer {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
  }

  textarea {
    background-color: var(--clr-primary-4);
    color: var(--clr-white);
    border: 1px solid var(--clr-primary-4);
    border-radius: 10px;
    padding: 1rem;
    height: 12rem;
    width: 100%;
    font-size: 1rem;
  }

  textarea::placeholder {
    color: var(--clr-white);
    padding: 1rem;
  }

  textarea:focus {
    outline: 2px solid var(--clr-brown);
  }

  span {
    font-weight: 700;
    color: var(--clr-red);
  }

  .replyBtn {
    border-radius: 5px;
    background-color: var(--clr-primary-4);
  }

  .comment.reply {
    margin-left: 2rem;
  }

  .commentSubmit {
    background-color: var(--clr-brown);
    border-radius: 5px;
  }

  .commentAskLogin p{
    font-size: 1.2rem;
    color: var(--clr-brown);
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;

    .image {
      width: 100%;
      height: 10rem;
      border-radius: 0.1rem;
    }

    .recipeTop {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 3rem;
    }
  }
`;

export default SinglePostPage;

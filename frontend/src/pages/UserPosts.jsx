import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetPostsByUserQuery,
  useDeletePostMutation,
} from "../slices/postsApiSlice";
import Spinner from "../components/Spinner";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { toast } from "react-toastify";

const UserPosts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;

  const [deletePost, { isLoading: isDeleting, error: deleteError }] =
    useDeletePostMutation();
  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    refetch,
  } = useGetPostsByUserQuery(userId);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      refetch(); // Refetch posts when user info changes
    }
  }, [userId, userInfo, navigate, refetch]);

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deletePost(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isPostsLoading || isDeleting) {
    return <Spinner />;
  }

  if (deleteError || postsError) {
    return <div>Error loading posts</div>;
  }

  return (
    <Wrapper>
      <div className="userPostsTitle">
        <div>{userInfo && userInfo.userName}'s recipes</div>
        <div className="underline"></div>
      </div>
      <div className="posts">
        {postsData?.length > 0 ? (
          postsData.map((post) => (
            <div className="post" key={post._id}>
              <div className="postTitle">
                <h5>{post.title}</h5>
              </div>
              <div className="desc">
                <p>{post.desc}</p>
              </div>
              <div className="imageContainer">
                <img className="image" src={post.image} alt={post.title} />
              </div>
              <div className="iconContainer">
                <Link to={`/posts/userPosts/${post._id}/edit`}>
                  <EditTwoToneIcon className="icon" />
                </Link>
                <DeleteTwoToneIcon
                  className="icon"
                  onClick={() => handleDeletePost(post._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <h3>You don't have any recipes...🥲</h3>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .userPostsTitle {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 2rem;
    color: var(--clr-primary-4);
    font-weight: 700;
    padding: 1rem;
  }

  .underline {
    width: 60%;
    height: 0.4rem;
    background: var(--clr-primary-3);
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.5rem;
  }

  .post {
    width: 20rem;
    height: 26rem;
    margin: 2rem 1.2rem 2rem 1.2rem;
    background-color: var(--clr-primary-2);
    padding: 1rem;
    border: 2px solid var(--clr-primary-2);
    border-radius: 5px;
    box-shadow: var(--dark-shadow);
  }

  .postTitle {
    color: var(--clr-primary-4);
    font-size: 1.5rem;
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
    color: var(--clr-brown);
    font-style: italic;
    line-height: 1.2rem;
    margin-top: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .iconContainer {
    display: flex;
    justify-content: flex-end;
  }

  .icon {
    color: var(--clr-primary-4);
    margin-top: 0.5rem;
  }

  @media screen and (max-width: 800px) {
    .userPostsTitle {
      font-size: 2rem;
    }
    .underline {
      height: 0.3rem;
    }
  }
`;

export default UserPosts;

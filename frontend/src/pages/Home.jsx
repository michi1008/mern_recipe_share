import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/Post";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Filter from "../components/Filter";
import Spinner from "../components/Spinner";
import Paginate from "../components/Paginate";
import { useGetPostsQuery } from "../slices/postsApiSlice";

const Home = () => {
  const { pageNumber, keyword } = useParams();

  const [filters, setFilters] = useState({
    category: "",
    sortBy: "",
  });

  const { category, sortBy } = filters;

  const { data, isLoading, error } = useGetPostsQuery({
    keyword,
    pageNumber,
    category,
    sortBy,
  });

  const handleFilterChange = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <Header />
      <HowItWorks />
      {error ? (
        <div className="error">{error?.data?.message || error.error}</div>
      ) : (
        <div className="home-content">
          <div className="gallery">
            <div className="titleContainer">
              <h1 className="galleryTitle">Recipe Gallery</h1>
              <div className="underline"></div>
            </div>
            <Filter onChange={handleFilterChange} />
            <div className="recipeContent">
              {keyword && (
                <Link to="/">
                  <button className="homeBackBtn">Go Back</button>
                </Link>
              )}
              {data.posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
              sortBy={sortBy ? sortBy : ""}
              category={category ? category : ""}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .homeContent {
    display: flex;
    flex-direcition: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .galleryTitle {
    color: var(--clr-primary-4);
  }

  .titleContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .underline {
    background-color: var(--clr-primary-3);
    height: 0.4rem;
    width: 65%;
    margin-bottom: 3rem;
  }

  .recipeContent {
    flex: 9;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
  }
`;

export default Home;

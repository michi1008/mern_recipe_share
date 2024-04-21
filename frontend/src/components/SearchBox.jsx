import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");
  const [isFocused, setIsFocused] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword(" ");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <input
          className="searchInput"
          type="text"
          name="q"
          value={keyword}
          placeholder={isFocused || keyword ? "" : "Search..."}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .searchInput::placeholder {
    color: var(--clr-white);
    opacity: 1;
  }

  .searchInput:focus {
    outline: 3px solid var(--clr-brown);
    color: var(--clr-white);
  }

  .searchInput {
    width: 9rem;
    height: 3rem;
    box-sizing: border-box;
    border: 2px solid var(--clr-brown);
    border-radius: 5px;
    font-size: 1.2rem;
    color: var(--clr-white);
    background-color: var(--clr-brown);
    transition: width 0.4s ease-in-out;
    margin-left: 1rem;
    padding: 0.8rem;
  }

  @media (max-width: 800px) {
    .searchInput {
      width: 12rem;
      margin: 1rem 0;
    }
  }
`;

export default SearchBox;

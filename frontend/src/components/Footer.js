import React from "react"
import styled from "styled-components"

const Footer = () => {
  return (
    <Wrapper><p className="copyright">Copyright &copy; <script>document.write(new Date().getFullYear())</script> Michiko Taguchi All Rights Reserved</p>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  text-align: center;
  background-color: var(--clr-green);
  bottom: 0px;
  height: 2rem;
  width: 100%;
  position: fixed;

  .copyright {
      font-size: 1rem;
      color: var(--clr-white);
      padding-top: 0.2rem;
      padding-bottom: 0.5rem;
  }

`
export default Footer
import { GrClose } from "react-icons/gr";
import styled from "styled-components";

function TitleBar() {
  return (
    <StyledContainer>
      <div className="close-btn">
        <GrClose />
      </div>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  width: 100%;
  height: 5vh;
  box-shadow: 0 1px 5px #000;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  .close-btn {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1rem;
    svg {
      font-size: 1.3rem;
    }
    &:hover {
      background-color: red;
      svg {
        color: #fff;
      }
      cursor: pointer;
    }
  }
`;
export default TitleBar;

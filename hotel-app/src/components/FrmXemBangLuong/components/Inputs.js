import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";
import { useEffect, useState } from "react";

function Inputs({ setRequestData, requestData, onHandleAdd }) {
  const [listYear, setListYear] = useState([]);
  useEffect(() => {
    let currentYear = new Date().getFullYear();
    let temp = [currentYear];
    for (let i = 1; i < 11; i++) {
      temp = [...temp, currentYear - i];
    }
    setListYear(temp);
  }, []);
  const handleOnSelect = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
    // console.log(e.target.value);
    // console.log(e.target.name);
  };
  const onHandleClear = () => {};
  return (
    <StyledContainer>
      <div className="input-container">
        <Container fluid>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Tháng"
                className="mb-3"
              >
                <Form.Select
                  name="thang"
                  value={requestData.thang}
                  onChange={(e) => handleOnSelect(e)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month, key) => {
                    return <option index={key}>{month}</option>;
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Năm"
                className="mb-3"
              >
                <Form.Select
                  name="nam"
                  value={requestData.nam}
                  onChange={(e) => handleOnSelect(e)}
                >
                  {listYear &&
                    listYear.length > 0 &&
                    listYear.map((year, index) => {
                      return <option key={index}>{year}</option>;
                    })}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
      <div className="btn-container">
        <Button variant="success" onClick={onHandleAdd}>
          Tính lương
        </Button>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  max-height: 45%;
  overflow-y: auto;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .input-container {
    display: flex;
    gap: 1rem;
  }
  .btn-container {
    display: flex;
    gap: 1.5rem;
    button {
      padding: 0.5rem 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Inputs;

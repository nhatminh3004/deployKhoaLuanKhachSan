import { Button, FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";

function Inputs({
  tangMoi,
  setTangMoi,
  onHandleAdd,
  onHandleUpdate,
  onHandleRefresh,
}) {
  const handleOnChange = (e) => {
    let tenField = e.target.name;
    if (tenField === "tenTang") {
      let soTang = Number(e.target.value.slice(5));
      if (!isNaN(soTang)) {
        setTangMoi({ ...tangMoi, [e.target.name]: e.target.value });
      }
    } else {
      setTangMoi({ ...tangMoi, [e.target.name]: e.target.value });
    }
  };
  const onHandleClear = () => {
    setTangMoi({
      maTang: 0,
      tenTang: "",
    });
  };
  return (
    <StyledContainer>
      <div className="input-container">
        <FloatingLabel
          controlId="floatingInput"
          label="Mã tầng"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Mã tầng"
            name="maTang"
            disabled={true}
            value={tangMoi && tangMoi.maTang != 0 ? tangMoi.maTang : ""}
            onChange={(e) => handleOnChange(e)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Tên tầng"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Tên tầng"
            name="tenTang"
            value={
              tangMoi &&
              tangMoi.tenTang &&
              tangMoi.tenTang.slice(0, 5) === "Tầng "
                ? tangMoi.tenTang
                : "Tầng "
            }
            onChange={(e) => handleOnChange(e)}
          />
        </FloatingLabel>
      </div>
      <div className="btn-container">
        <Button variant="success" onClick={() => onHandleAdd()}>
          Thêm
        </Button>
        <Button variant="primary" onClick={() => onHandleUpdate()}>
          Cập nhật
        </Button>
        <Button variant="danger" onClick={() => onHandleClear()}>
          Xóa rỗng
        </Button>
        <Button variant="warning" onClick={() => onHandleRefresh()}>
          <BiRefresh />
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

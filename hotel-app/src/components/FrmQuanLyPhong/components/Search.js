import { Button, Form } from "react-bootstrap";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";

function Search({
  search,
  setSearch,
  onHandleSearch,
  tempTang,
  tempLoaiPhong,
  onHandleRefresh,
}) {
  const onHandleChangeSelect = (e) => {
    if (e.target.value === "Theo tầng") {
      setSearch({ keyword: tempTang[0].maTang, theo: e.target.value });
    } else if (e.target.value === "Theo loại phòng") {
      setSearch({
        keyword: tempLoaiPhong[0].maLoaiPhong,
        theo: e.target.value,
      });
    } else {
      setSearch({ ...search, theo: e.target.value });
    }
  };
  const onHandleChangeText = (e) => {
    setSearch({ ...search, keyword: e.target.value });
  };

  const onHandleChangeOption = (e, name) => {
    setSearch({ keyword: e.target.value, theo: name });
  };
  return (
    <StyledContainer>
      {search.theo !== "Theo tầng" && search.theo !== "Theo loại phòng" && (
        <Form.Control
          type="text"
          placeholder="tìm kiếm"
          onChange={(e) => onHandleChangeText(e)}
        />
      )}

      {search.theo === "Theo tầng" && (
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => onHandleChangeOption(e, "Theo tầng")}
        >
          {tempTang &&
            tempTang.length > 0 &&
            tempTang.map((tang, index) => {
              return (
                <option value={`${tang.maTang}`} key={index}>
                  {tang.tenTang}
                </option>
              );
            })}
        </Form.Select>
      )}

      {search.theo === "Theo loại phòng" && (
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => onHandleChangeOption(e, "Theo loại phòng")}
        >
          {tempLoaiPhong &&
            tempLoaiPhong.length > 0 &&
            tempLoaiPhong.map((loaiPhong, index) => {
              return (
                <option value={`${loaiPhong.maLoaiPhong}`} key={index}>
                  {loaiPhong.tenLoaiPhong}
                </option>
              );
            })}
        </Form.Select>
      )}
      <Form.Select onChange={(e) => onHandleChangeSelect(e)}>
        <option value="Theo mã">Theo mã</option>
        <option value="Theo tên">Theo tên</option>
        <option value="Theo tầng">Theo tầng</option>
        <option value="Theo loại phòng">Theo loại phòng</option>
      </Form.Select>
      <Button variant="primary" onClick={() => onHandleSearch()}>
        Tìm
      </Button>
      {onHandleRefresh && (
        <Button variant="warning" onClick={() => onHandleRefresh()}>
          <BiRefresh />
        </Button>
      )}
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  height: 6%;
  margin: 1rem 0;
  display: flex;
  width: 60%;
  gap: 0.5rem;
  input {
    width: 50%;
  }
  select {
    width: 30%;
  }
  button {
    width: 10%;
  }
`;
export default Search;

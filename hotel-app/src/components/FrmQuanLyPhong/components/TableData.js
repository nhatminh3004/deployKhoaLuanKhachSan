import { Table } from "react-bootstrap";
import styled from "styled-components";

function TableData({ dsPhong, phongSelected, setPhongSelected }) {
  const onHandleSelect = (phong) => {
    if (phongSelected && phong.maPhong === phongSelected.maPhong) {
      setPhongSelected(undefined);
    } else {
      setPhongSelected(phong);
    }
  };
  return (
    <StyledContainer>
      <Table striped hover>
        <thead>
          <tr>
            <th>Mã phòng</th>
            <th>Tên phòng</th>
            <th>Loại phòng</th>
            <th>Tầng</th>
            <th>Giá</th>
            <th>Số giường</th>
            <th>Sức chứa</th>
            <th>Được hút thuốc</th>
            <th>Mang thú cưng</th>
            <th>Mô tả phòng</th>
          </tr>
        </thead>
        <tbody>
          {dsPhong &&
            dsPhong !== [] &&
            dsPhong.map((phongDto, index) => {
              // console.log(isSelected(room));
              return (
                <tr
                  key={index}
                  className={`${
                    phongSelected &&
                    phongSelected &&
                    phongSelected.maPhong === phongDto.maPhong
                      ? "row-selected"
                      : ""
                  }`}
                  onClick={() => onHandleSelect(phongDto)}
                >
                  <td>{phongDto.maPhong}</td>
                  <td>{phongDto.tenPhong}</td>
                  <td>{phongDto.tenLoaiPhong}</td>
                  <td>{phongDto.tenTang}</td>
                  <td>{phongDto.giaPhong.toLocaleString()}</td>
                  <td>{phongDto.soGiuong}</td>
                  <td>{phongDto.sucChua}</td>
                  <td>{phongDto.duocHutThuoc ? "Có" : "Không"}</td>
                  <td>{phongDto.mangThuCung ? "Có" : "Không"}</td>
                  <td>{phongDto.moTaPhong}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin-top: 1rem;
  padding: 0.5rem;
  height: 50%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  table {
    .row-selected {
      td {
        background-color: #9fbce7d1 !important;
      }
    }
  }
`;
export default TableData;

import { Table } from "react-bootstrap";
import styled from "styled-components";

function TableData({ loaiPhongSelected, setLoaiPhongSelected, dsLoaiPhong }) {
  const onHandleSelect = (loaiPhong) => {
    if (
      loaiPhongSelected &&
      loaiPhong.maLoaiPhong === loaiPhongSelected.maLoaiPhong
    ) {
      setLoaiPhongSelected(undefined);
    } else {
      setLoaiPhongSelected(loaiPhong);
    }
  };
  return (
    <StyledContainer>
      <Table striped hover>
        <thead>
          <tr>
            <th>Mã loại phòng</th>
            <th>Tên loại phòng</th>
            <th>Mô tả</th>
          </tr>
        </thead>
        <tbody>
          {dsLoaiPhong &&
            dsLoaiPhong !== [] &&
            dsLoaiPhong.map((loaiPhong, index) => {
              return (
                <tr
                  key={index}
                  className={`${
                    loaiPhongSelected &&
                    loaiPhongSelected.maLoaiPhong === loaiPhong.maLoaiPhong
                      ? "row-selected"
                      : ""
                  }`}
                  onClick={() => onHandleSelect(loaiPhong)}
                >
                  <td>{loaiPhong.maLoaiPhong}</td>
                  <td>{loaiPhong.tenLoaiPhong}</td>
                  <td
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: 200,
                    }}
                  >
                    {loaiPhong.moTaLoaiPhong}
                  </td>
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
  padding: 0.5rem;
  height: 65%;
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

import { useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

function TableData({ dsBangLuong, bangLuongSelected, setBangLuongSelected }) {
  const onHandleSelect = (bangLuong) => {
    if (
      bangLuongSelected &&
      bangLuong.maBangLuong === bangLuongSelected.maBangLuong
    ) {
      setBangLuongSelected(undefined);
    } else {
      setBangLuongSelected(bangLuong);
    }
  };
  return (
    <StyledContainer>
      <Table striped hover>
        <thead>
          <tr>
            <th>Mã bảng lương</th>
            <th>Mã nhân viên</th>
            <th>Tên nhân viên</th>
            <th>Tháng</th>
            <th>Năm</th>
            <th>Tổng lương</th>
          </tr>
        </thead>
        <tbody>
          {dsBangLuong &&
            dsBangLuong !== [] &&
            dsBangLuong.map((bangLuong, index) => {
              // console.log(isSelected(room));
              return (
                <tr
                  key={index}
                  className={`${
                    bangLuongSelected &&
                    bangLuongSelected.maBangLuong === bangLuong.maBangLuong
                      ? "row-selected"
                      : ""
                  }`}
                  onClick={() => onHandleSelect(bangLuong)}
                >
                  <td>{bangLuong.maBangLuong}</td>
                  <td>{bangLuong.nhanVien.maNhanVien}</td>
                  <td>{bangLuong.nhanVien.hoTen}</td>
                  <td>{bangLuong.thang}</td>
                  <td>{bangLuong.nam}</td>
                  <td>{bangLuong.tongLuong.toLocaleString()} VND</td>
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
  margin-top: 1rem;
  height: 95%;
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

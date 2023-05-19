import moment from "moment";
import { useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

function TableData({ dsCa, caSelected, setCaSelected, formatTime, isDate }) {
  const onHandleSelect = (ca) => {
    if (caSelected && ca.maCa === caSelected.maCa) {
      setCaSelected(undefined);
    } else {
      if (!isDate(ca.gioBatDau)) {
        ca.gioBatDau = new Date("2023-04-04T" + ca.gioBatDau);
      }
      setCaSelected(ca);
    }
  };

  // console.log(dsCa);

  return (
    <StyledContainer>
      <Table striped hover>
        <thead>
          <tr>
            <th>Mã ca làm việc</th>
            <th>Tên ca làm việc</th>
            <th>Giờ bắt đầu</th>
            <th>Sồ giờ làm</th>
            <th>Giờ kết thúc</th>
          </tr>
        </thead>
        <tbody>
          {dsCa &&
            dsCa.length != 0 &&
            dsCa.map((ca, index) => {
              // console.log(isSelected(room));
              return (
                <tr
                  key={index}
                  className={`${
                    caSelected && caSelected.maCa === ca.maCa
                      ? "row-selected"
                      : ""
                  }`}
                  onClick={() => onHandleSelect(ca)}
                >
                  <td>{ca.maCa}</td>
                  <td>{ca.tenCa}</td>
                  <td>
                    {isDate(ca.gioBatDau)
                      ? formatTime(ca.gioBatDau)
                      : formatTime(new Date("2011-04-20T" + ca.gioBatDau))}
                  </td>
                  <td>{ca.soGio}</td>
                  <td>
                    {isDate(ca.gioKetThuc)
                      ? formatTime(ca.gioKetThuc)
                      : formatTime(new Date("2011-04-20T" + ca.gioKetThuc))}
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
  margin-top: 0.5rem;
  padding: 0.5rem;
  height: 75%;
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

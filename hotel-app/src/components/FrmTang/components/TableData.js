import { useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

function TableData({ dsTang, tangSelected, setTangSelected }) {
  const onHandleSelect = (tang) => {
    if (tangSelected && tang.maTang === tangSelected.maTang) {
      setTangSelected(undefined);
    } else {
      setTangSelected(tang);
    }
  };
  return (
    <StyledContainer>
      <Table striped hover>
        <thead>
          <tr>
            <th>Mã tầng</th>
            <th>Tên tầng</th>
          </tr>
        </thead>
        <tbody>
          {dsTang &&
            dsTang !== [] &&
            dsTang.map((tang, index) => {
              // console.log(isSelected(room));
              return (
                <tr
                  key={index}
                  className={`${
                    tangSelected && tangSelected.maTang === tang.maTang
                      ? "row-selected"
                      : ""
                  }`}
                  onClick={() => onHandleSelect(tang)}
                >
                  <td>{tang.maTang}</td>
                  <td>{tang.tenTang}</td>
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

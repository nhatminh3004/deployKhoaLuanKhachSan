import axios from "axios";
import { useEffect, useState } from "react";
import { Button, CloseButton, Form, Table } from "react-bootstrap";
import styled from "styled-components";
import { getAllServiceRoute } from "../../../utils/APIRoutes";

function ListDichVu({ setDichVuNew, dichVuNew, showDichVu, setShowDichVu }) {
  const [listDichVu, setListDichVu] = useState([]);
  const [soLuongDichVu, setSoLuongDichVu] = useState([]);

  useEffect(() => {
    loadDichVuData();
  }, []);
  useEffect(() => {
    let temp = [...soLuongDichVu];
    for (let i = 0; i < dichVuNew.length; i++) {
      temp = [
        ...temp,
        { soLuong: dichVuNew[i].soLuongChon, maDichVu: dichVuNew[i].maDichVu },
      ];
    }
    setSoLuongDichVu([...temp]);
  }, [dichVuNew]);
  const loadDichVuData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getAllServiceRoute}`, {}, config);
    // console.log(data);
    setListDichVu(data);
  };
  const handleOnChangeSoLuong = (e) => {
    if (soLuongDichVu && soLuongDichVu.length > 0) {
      let temp = [...soLuongDichVu];
      for (let i = 0; i < soLuongDichVu.length; i++) {
        if (soLuongDichVu[i].maDichVu == e.target.name) {
          temp.splice(i, 1);
          setSoLuongDichVu([
            ...temp,
            {
              maDichVu: soLuongDichVu[i].maDichVu,
              soLuong: Number(e.target.value),
            },
          ]);
          return;
        }
        if (i === soLuongDichVu.length - 1) {
          setSoLuongDichVu([
            ...temp,
            {
              maDichVu: e.target.name,
              soLuong: Number(e.target.value),
            },
          ]);
        }
      }
    } else if (soLuongDichVu) {
      setSoLuongDichVu([
        ...soLuongDichVu,
        { maDichVu: e.target.name, soLuong: Number(e.target.value) },
      ]);
    }
  };
  const getSoLuong = (maDichVu) => {
    for (let i = 0; i < soLuongDichVu.length; i++) {
      if (soLuongDichVu[i].maDichVu == maDichVu) {
        return soLuongDichVu[i].soLuong;
      }
    }
  };
  const onHandleSelected = () => {
    let temp = [];
    for (let i = 0; i < listDichVu.length; i++) {
      let soLuongSelected = getSoLuong(listDichVu[i].maDichVu);
      if (soLuongSelected > 0) {
        temp = [
          ...temp,
          {
            ...listDichVu[i],
            soLuongChon: soLuongSelected,
            soLuong: listDichVu[i].soLuong - soLuongSelected,
          },
        ];
      }
    }
    // for (let i = 0; i < dichVuNew.length; i++) {
    //   for (let j = 0; j < temp.length; j++) {
    //     if (dichVuNew[i].maDichVu == temp[j].maDichVu) {
    //       temp[j] = {...temp, soLuongChon: temp[i].soLuongChon + dichVuNew[i].soLuong}
    //     }
    //   }

    // }

    setDichVuNew(temp);
    setShowDichVu(undefined);
  };
  // console.log(soLuongDichVu);
  // console.log(dichVuNew);
  return (
    <StyledContainer>
      <div className="container-styled">
        <div className="header">
          <h2 className="header-title">Chọn dịch vụ</h2>
          <CloseButton onClick={() => setShowDichVu(undefined)} />
        </div>
        <div className="filter-btn"></div>
        <div className="table-container">
          <Table striped hover>
            <thead>
              <tr>
                <th>Tên dịch vụ</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Số lượng tồn</th>
                <th>Đơn vị</th>
              </tr>
            </thead>
            <tbody>
              {listDichVu &&
                listDichVu !== [] &&
                listDichVu.map((dichVu, index) => {
                  // console.log(isSelected(room));
                  return (
                    <tr
                      key={index}
                    // className={`${isSelected(dichVu) ? "row-selected" : ""}`}
                    >
                      <td>{dichVu.tenDichVu}</td>
                      {/* <td
                        className={`${
                          room.trangThaiPhong ? "text-green" : "text-red"
                        }`}
                      >
                        {room.trangThaiPhong ? "Sẵn sàng" : "Không sẵn sàng"}
                      </td> */}
                      <td>{dichVu.giaDichVu.toLocaleString()}</td>
                      <td>
                        <Form.Control
                          type="number"
                          min={0}
                          max={dichVu.soLuong}
                          name={dichVu.maDichVu}
                          value={
                            soLuongDichVu &&
                              soLuongDichVu.length > 0 &&
                              getSoLuong(dichVu.maDichVu)
                              ? getSoLuong(dichVu.maDichVu)
                              : 0
                          }
                          onChange={(e) => handleOnChangeSoLuong(e)}
                        />
                      </td>
                      <td>{dichVu.soLuong}</td>
                      <td>{dichVu.donViLoaiDichVu}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        <div className="btn-container">
          {soLuongDichVu.length > 0 ? (
            <Button
              variant="primary"
              type="submit"
              onClick={() => onHandleSelected()}
            >
              Chọn
            </Button>
          ) : (
            <Button variant="secondary" type="submit">
              Chọn
            </Button>
          )}
        </div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .container-styled {
    width: 75%;
    padding: 0.5rem;
    height: 95%;
    display: flex;
    flex-direction: column;
    text-align: start;
    background-color: #fff;
    position: relative;
    .header {
      display: flex;
      height: 7%;
      justify-content: space-between;
      .header-title {
      }
    }
    .table-container {
      width: 100%;
      height: 86%;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 1px;
        &-thumb {
          background-image: linear-gradient(#373b44, #1095c1);
          width: 1px;
          border-radius: 1rem;
        }
      }
      tbody {
        .row-selected {
          td {
            background-color: #9fbce7d1 !important;
          }
        }
      }
    }
    .btn-container {
      display: flex;
      height: 7%;
      justify-content: flex-end;
    }
  }
  .text-red {
    font-weight: bold;
    color: red !important;
  }
  .text-green {
    font-weight: bold;
    color: green !important;
  }
`;
export default ListDichVu;

import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Table, Toast, ToastContainer } from "react-bootstrap";
import {
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";
import dayjs from "dayjs";

import {
  addBillsRoute,
  bookingServices,
  getBillsByCCCD,
  getBillsOrderDateRoute,
  searchBillsByPhongRoute,
} from "../../utils/APIRoutes";
import ListDichVu from "./components/ListDichVu";

function FrmDatDichVu() {
  const [toast, setToast] = useState(null);
  const [dsHoaDon, setDsHoaDon] = useState([]);
  const [hoaDonSelected, setHoaDonSelected] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [hoaDonPrice, setHoaDonPrice] = useState(0);
  const [selectPrice, setSelectPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dichVuNew, setDichVuNew] = useState([]);
  const [showDichVu, setShowDichVu] = useState(undefined);
  useEffect(() => {
    let price = 0;
    if (
      hoaDonSelected &&
      hoaDonSelected.dsChiTietDichVuDto &&
      hoaDonSelected.dsChiTietDichVuDto.length > 0
    )
      for (let i = 0; i < hoaDonSelected.dsChiTietDichVuDto.length; i++) {
        price +=
          hoaDonSelected.dsChiTietDichVuDto[i].giaDichVu *
          hoaDonSelected.dsChiTietDichVuDto[i].soLuong;
      }
    setHoaDonPrice(price);
  }, [hoaDonSelected]);
  useEffect(() => {
    let price = 0;
    if (dichVuNew && dichVuNew.length > 0)
      for (let i = 0; i < dichVuNew.length; i++) {
        price += dichVuNew[i].giaDichVu * dichVuNew[i].soLuongChon;
      }
    setSelectPrice(price);
  }, [dichVuNew]);
  useEffect(() => {
    loadHoaDon();
  }, []);
  const loadHoaDon = async () => {
    const { data } = await axios.get(
      `${getBillsOrderDateRoute}`,
      {},
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    if (data && data.length > 0) {
      setDsHoaDon(data);
    } else {
      setDsHoaDon([]);
    }
  };

  const onHandleSearch = async () => {
    const { data } = await axios.post(
      `${searchBillsByPhongRoute}`,
      { maPhong: searchInput },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    if (data && data.length > 0) {
      setDsHoaDon(data);
    }
  };

  const onHandleCheckIn = async () => {
    if (hoaDonSelected.maHoaDon && hoaDonSelected.tienNhan && validate()) {
      let dsMaPhong = [];
      if (hoaDonSelected && hoaDonSelected.dsPhong) {
        for (let i = 0; i < hoaDonSelected.dsPhong.length; i++) {
          dsMaPhong = [...dsMaPhong, hoaDonSelected.dsPhong[i].maPhong];
        }
      }
      const nhanVien = JSON.parse(localStorage.getItem("nhanVien"));

      const { data } = await axios.post(
        `${addBillsRoute}`,
        {
          maHoaDon: hoaDonSelected.maHoaDon,
          ngayLap: hoaDonSelected.ngayLap,
          ngayNhanPhong: hoaDonSelected.ngayNhanPhong,
          ngayTraPhong: hoaDonSelected.ngayTraPhong,
          tienNhan: hoaDonSelected.tienNhan,
          dsMaPhong,
          maPhieuDatPhong: hoaDonSelected.phieuDatPhong.maPhieuDatPhong,
          maKhachHang: hoaDonSelected.khachHang.maKhachHang,
          maNhanVien: nhanVien.maNhanVien,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      if (data) {
        setHoaDonSelected({});
        setToast({
          header: "Lập hóa đơn thành công",
          content: "",
          bg: "success",
          textColor: "#fff",
        });
        loadHoaDon();
      }
    }
  };
  const validate = () => {
    if (
      !hoaDonSelected ||
      !hoaDonSelected.tienNhan ||
      hoaDonSelected.tienNhan <= 0 ||
      hoaDonSelected.tienNhan - totalPrice < 0
    ) {
      setToast({
        header: "Tiền nhận phải >= tổng tiền",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }

    return true;
  };
  const onHandleChange = (e) => {
    if (hoaDonSelected && hoaDonSelected.maHoaDon) {
      setHoaDonSelected({ ...hoaDonSelected, [e.target.name]: e.target.value });
    }
  };
  const onHandleXoaDichVuSelected = (maDichVu) => {
    let temp = [...dichVuNew];
    for (let i = 0; i < dichVuNew.length; i++) {
      if (dichVuNew[i].maDichVu == maDichVu) {
        temp.splice(i, 1);
        setDichVuNew([...temp]);
        return;
      }
    }
  };
  const onHandleSaveDicHVu = async () => {
    let newDichVuUpdate = [];
    for (let i = 0; i < dichVuNew.length; i++) {
      if (
        hoaDonSelected.dsChiTietDichVuDto &&
        hoaDonSelected.dsChiTietDichVuDto.length > 0
      ) {
        for (let j = 0; j < hoaDonSelected.dsChiTietDichVuDto.length; j++) {
          if (
            dichVuNew[i].maDichVu ==
            hoaDonSelected.dsChiTietDichVuDto[j].maDichVu
          ) {
            newDichVuUpdate = [
              ...newDichVuUpdate,
              {
                maDichVu: dichVuNew[i].maDichVu,
                soLuongTong:
                  dichVuNew[i].soLuongChon +
                  hoaDonSelected.dsChiTietDichVuDto[j].soLuong,
                soLuongMoi: dichVuNew[i].soLuongChon,
              },
            ];
            break;
          }
          if (j === hoaDonSelected.dsChiTietDichVuDto.length - 1) {
            newDichVuUpdate = [
              ...newDichVuUpdate,
              {
                maDichVu: dichVuNew[i].maDichVu,
                soLuongTong:
                  dichVuNew[i].soLuongChon +
                  hoaDonSelected.dsChiTietDichVuDto[j].soLuong,
                soLuongMoi: dichVuNew[i].soLuongChon,
              },
            ];
          }
        }
      } else {
        newDichVuUpdate = [
          ...newDichVuUpdate,
          {
            maDichVu: dichVuNew[i].maDichVu,
            soLuongTong: dichVuNew[i].soLuongChon,
            soLuongMoi: dichVuNew[i].soLuongChon,
          },
        ];
      }
    }
    // console.log('dịch vụ đặt:',newDichVuUpdate);
    const { data } = await axios.post(
      `${bookingServices}`,
      {
        maHoaDon: hoaDonSelected.maHoaDon,
        dsDichVu: newDichVuUpdate,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    if (data && data.maHoaDon) {
      setHoaDonSelected(data);
      setDichVuNew([]);
      setToast({
        header: "Đặt dịch vụ thành công",
        content: "",
        bg: "success",
        textColor: "#fff",
      });
    }
  };
  // console.log(hoaDonSelected.dsChiTietDichVuDto);
  // console.log(dichVuNew);
  console.log(dsHoaDon);
  return (
    <StyledContainer>
      <div className="container">
        <h1>Đặt dịch vụ</h1>
        <div className="content">
          <div className="booking-container">
            <h4>Danh sách hóa đơn</h4>
            <div className="search-container">
              <Form.Control
                type="text"
                placeholder="nhập mã phòng"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button variant="success" onClick={() => onHandleSearch()}>
                <AiOutlineSearch />
              </Button>
              <Button variant="warning" onClick={() => loadHoaDon()}>
                <BiRefresh />
              </Button>
            </div>
            <div className="list-booking">
              {dsHoaDon &&
                dsHoaDon.length > 0 &&
                dsHoaDon.map((hoaDon, index) => {
                  return (
                    <div
                      className={`booking-item ${
                        hoaDonSelected.maHoaDon &&
                        hoaDon.maHoaDon === hoaDonSelected.maHoaDon
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => setHoaDonSelected(hoaDon)}
                      key={index}
                    >
                      <div className="item-header">
                        {hoaDon.khachHang.hoTen} -{" "}
                        {hoaDon.khachHang.cccdKhachHang}
                      </div>
                      <div className="item-body">
                        <div className="check-in-date">
                          Ngày nhận phòng:{" "}
                          <p>
                            {moment(hoaDon.ngayNhanPhong).format("DD/MM/YYYY")}
                          </p>
                        </div>
                        <div className="booking-date">
                          Phòng:{" "}
                          <p>
                            {hoaDon.dsPhong &&
                              hoaDon.dsPhong.length > 0 &&
                              hoaDon.dsPhong.map((phong, index) => {
                                return `${
                                  index === hoaDon.dsPhong.length - 1
                                    ? phong.maPhong + "."
                                    : phong.maPhong + ","
                                } `;
                              })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="booking-detail">
            <h3>Hóa đơn</h3>
            <div className="content-detail">
              <div className="guest-info">
                <h4>Thông tin chung</h4>
                <div className="info-content">
                  - Họ tên:{" "}
                  {hoaDonSelected &&
                    hoaDonSelected.khachHang &&
                    hoaDonSelected.khachHang.hoTen}
                  <br></br>- CCCD:{" "}
                  {hoaDonSelected &&
                    hoaDonSelected.khachHang &&
                    hoaDonSelected.khachHang.cccdKhachHang}
                  <br></br>- Phòng:{" "}
                  {hoaDonSelected.dsPhong &&
                    hoaDonSelected.dsPhong.length > 0 &&
                    hoaDonSelected.dsPhong.map((phong, index) => {
                      return `${
                        index === hoaDonSelected.dsPhong.length - 1
                          ? phong.maPhong + "."
                          : phong.maPhong + ","
                      } `;
                    })}
                  <br></br>- Ngày nhận phòng:{" "}
                  {hoaDonSelected &&
                    hoaDonSelected.ngayLap &&
                    moment(hoaDonSelected.ngayLap).format("DD/MM/YYYY")}
                </div>
              </div>
              <div className="room-info">
                <h4>Chi tiết dich vụ</h4>
                <div className="info-content">
                  <div className="phong-container">
                    <Table striped>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Tên</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Đơn vị</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hoaDonSelected &&
                        hoaDonSelected.dsChiTietDichVuDto &&
                        hoaDonSelected.dsChiTietDichVuDto.length > 0 ? (
                          hoaDonSelected.dsChiTietDichVuDto.map(
                            (dichVu, index) => {
                              // console.log(isSelected(room));
                              return (
                                <tr key={index}>
                                  <td></td>
                                  <td>{dichVu.tenDichVu}</td>
                                  <td>{dichVu.giaDichVu.toLocaleString()}</td>
                                  <td>{dichVu.soLuong}</td>
                                  <td>{dichVu.tenLoaiDichVu}</td>
                                  <td></td>
                                </tr>
                              );
                            }
                          )
                        ) : (
                          <></>
                        )}
                        {dichVuNew &&
                          dichVuNew.length > 0 &&
                          dichVuNew.map((dichVuSelected, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <AiFillCloseCircle
                                    style={{
                                      color: "red",
                                      fontSize: "2rem",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      onHandleXoaDichVuSelected(
                                        dichVuSelected.maDichVu
                                      )
                                    }
                                  />
                                </td>
                                <td>{dichVuSelected.tenDichVu}</td>
                                <td>
                                  {dichVuSelected.giaDichVu.toLocaleString()}
                                </td>
                                <td>{dichVuSelected.soLuongChon}</td>
                                <td>{dichVuSelected.donViLoaiDichVu}</td>
                              </tr>
                            );
                          })}
                        <tr
                          onClick={() => {
                            if (hoaDonSelected && hoaDonSelected.maHoaDon) {
                              setShowDichVu(true);
                            }
                          }}
                        >
                          <th
                            colSpan={5}
                            style={{ textAlign: "center", cursor: "pointer" }}
                          >
                            <AiOutlinePlusCircle />
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <div className="price-container">
                    <p>Tổng tiền dịch vụ</p>
                    <div className="total-price">
                      {(selectPrice + hoaDonPrice).toLocaleString()} VND
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-function">
              {hoaDonSelected &&
              hoaDonSelected.maHoaDon &&
              dichVuNew &&
              dichVuNew.length > 0 ? (
                <Button
                  variant="success"
                  type="submit"
                  onClick={() => onHandleSaveDicHVu()}
                >
                  Lưu
                </Button>
              ) : (
                <Button variant="secondary" type="submit">
                  Lưu
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDichVu && (
        <ListDichVu
          setDichVuNew={setDichVuNew}
          dichVuNew={dichVuNew}
          showDichVu={showDichVu}
          setShowDichVu={setShowDichVu}
        />
      )}
      {toast && (
        <ToastContainer
          position="bottom-end"
          style={{ bottom: "1rem", right: "1rem" }}
        >
          <Toast
            onClose={() => setToast(null)}
            show={toast !== null}
            bg={toast.bg}
            autohide={true}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{toast.header}</strong>
              <small className="text-muted"></small>
            </Toast.Header>
            {/* <Toast.Body style={{ color: `${toast.textColor}` }}>
                  {toast.content}
                </Toast.Body> */}
          </Toast>
        </ToastContainer>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
    h1 {
      padding: 0.5rem;
      height: 10%;
    }
    .content {
      width: 100%;
      height: 90%;
      display: grid;
      grid-template-columns: 35% 65%;
      padding-bottom: 0.5rem;

      .booking-container {
        padding: 0.5rem;
        height: 615px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
        h3 {
          display: flex;
          align-items: center;
          margin-bottom: 0;
          height: 10%;
          padding: 0.5rem;
          border-bottom: 1px solid #ccc;
        }
        .search-container {
          padding: 0.5rem;
          display: flex;
          height: 10%;
          gap: 0.5rem;
          align-items: center;
        }
        .list-booking {
          height: 80%;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
              background-image: linear-gradient(#373b44, #1095c1);
              width: 0.1rem;
              border-radius: 1rem;
            }
          }
          .booking-item {
            padding: 0.5rem;
            border-bottom: 1px solid #ccc;
            .item-header {
              font-size: 1.1rem;
              text-overflow: ellipsis;
              overflow: hidden;
              font-weight: 600;
              white-space: nowrap;
            }
            .item-body {
              padding-left: 0.5rem;
              .booking-date {
                display: flex;
                p {
                  font-weight: bold;
                  margin-bottom: 0;
                }
              }
              .check-in-date {
                display: flex;
                p {
                  font-weight: bold;
                  margin-bottom: 0;
                }
              }
            }
            &:hover {
              background-color: rgba(204, 204, 204, 0.4);
              cursor: pointer;
            }
          }
          .selected {
            background-color: rgba(204, 204, 204, 0.4);
          }
        }
      }

      .booking-detail {
        display: flex;
        flex-direction: column;
        padding: 0 2rem;
        height: 615px;
        h3 {
          display: flex;
          align-items: center;
          margin-bottom: 0;
          height: 10%;
          padding: 0.5rem;
          border-bottom: 1px solid #ccc;
        }
        .content-detail {
          height: 500px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
              background-image: linear-gradient(#373b44, #1095c1);
              width: 0.1rem;
              border-radius: 1rem;
            }
          }
          .guest-info {
          }
          .room-info {
            .info-content {
              .phong-container {
                height: 250px;
                overflow-y: auto;
                &::-webkit-scrollbar {
                  width: 0.2rem;
                  &-thumb {
                    background-image: linear-gradient(#373b44, #1095c1);
                    width: 0.1rem;
                    border-radius: 1rem;
                  }
                }
                svg {
                  font-size: 1.6rem;
                }
              }
              .price-container {
                display: flex;
                justify-content: space-between;
                p {
                  font-weight: bold;
                  font-size: 1.1rem;
                }
                .total-price {
                  font-weight: bold;
                  font-size: 1.1rem;
                }
              }
            }
          }
        }
        .btn-function {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          button {
            padding: 0.5rem 1rem;
            font-size: 1.1rem;
          }
        }
      }
    }
  }
`;

export default FrmDatDichVu;

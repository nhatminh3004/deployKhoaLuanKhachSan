import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Table, Toast, ToastContainer } from "react-bootstrap";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";
import dayjs from "dayjs";

import {
  addBillsRoute,
  addBookingsRoute,
  getBookingsByCCCD,
  getBookingsOrderDateRoute,
} from "../../utils/APIRoutes";

function FrmNhanPhong() {
  const [toast, setToast] = useState(null);
  const [dsPhieuDatPhong, setDsPhieuDatPhong] = useState([]);
  const [phieuDatPhongSelected, setPhieuDatPhongSelected] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const diff_hours = (dt2, dt1) => {
    // var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    // diff /= 60 * 60;
    // if (dt2.getTime() === dt1.getTime()) {
    //   return 0;
    // }
    // if (Math.abs(Math.round(diff)) === 0) {
    //   return 1;
    // }
    // return Math.abs(Math.round(diff));
    const millisecondsPerHour = 1000 * 60 * 60;
    const differenceInMilliseconds = dt1 - dt2;
    const totalHours = Math.ceil(
      differenceInMilliseconds / millisecondsPerHour
    );
    // console.log('totalHours', totalHours);
    return totalHours;
  };
  useEffect(() => {
    let price = 0;
    let ngayNhan = new Date(phieuDatPhongSelected.ngayNhanPhong);
    let ngayTra = new Date(phieuDatPhongSelected.ngayTraPhong);
    let totalHours = diff_hours(ngayNhan, ngayTra);
    if (
      phieuDatPhongSelected &&
      phieuDatPhongSelected.dsPhong &&
      phieuDatPhongSelected.dsPhong.length > 0
    )
      for (let i = 0; i < phieuDatPhongSelected.dsPhong.length; i++) {
        price += phieuDatPhongSelected.dsPhong[i].giaPhong * totalHours;
      }
    setTotalPrice(price);
  }, [phieuDatPhongSelected]);
  useEffect(() => {
    loadPhieuDatPhong();
  }, []);
  const loadPhieuDatPhong = async () => {
    const { data } = await axios.get(
      `${getBookingsOrderDateRoute}`,
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
      // console.log(data);
      setDsPhieuDatPhong(data);
    } else {
      setDsPhieuDatPhong([]);
    }
  };

  const onHandleSearch = async () => {
    const { data } = await axios.post(
      `${getBookingsByCCCD}`,
      { cccd: searchInput },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    if (data && data.length > 0) {
      setDsPhieuDatPhong(data);
    }
  };

  const onHandleCheckIn = async () => {
    if (phieuDatPhongSelected.maPhieuDatPhong) {
      if (
        new Date(phieuDatPhongSelected.ngayNhanPhong).getTime() >
        new Date().getTime()
      ) {
        setToast({
          header: "Ngày nhận phòng phải < ngày trả phòng",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return;
      }
      let dsMaPhong = [];
      if (phieuDatPhongSelected && phieuDatPhongSelected.dsPhong) {
        for (let i = 0; i < phieuDatPhongSelected.dsPhong.length; i++) {
          dsMaPhong = [...dsMaPhong, phieuDatPhongSelected.dsPhong[i].maPhong];
        }
      }
      const nhanVien = JSON.parse(localStorage.getItem("nhanVien"));
      console.log(new Date(phieuDatPhongSelected.ngayNhanPhong));
      const { data } = await axios.post(
        `${addBillsRoute}`,
        {
          maHoaDon: 0,
          ngayLap: new Date(),
          ngayNhanPhong: new Date(phieuDatPhongSelected.ngayNhanPhong),
          ngayTraPhong: new Date(phieuDatPhongSelected.ngayTraPhong),
          tienNhan: 0,
          dsMaPhong,
          maPhieuDatPhong: phieuDatPhongSelected.maPhieuDatPhong,
          maKhachHang: phieuDatPhongSelected.khachHang.maKhachHang,
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
        const requestData = {
          maPhieuDatPhong: phieuDatPhongSelected.maPhieuDatPhong,
          ngayDatPhong: dayjs(phieuDatPhongSelected.ngayDatPhong),
          giamGia: 0,
          ghiChuDatPhong: phieuDatPhongSelected.ghiChuDatPhong,
          ngayNhanPhong: dayjs(phieuDatPhongSelected.ngayNhanPhong),
          ngayTraPhong: dayjs(phieuDatPhongSelected.ngayTraPhong),
          trangThaiDatPhong: "HOAN_TAT",
          dsMaPhong,
          khachHang: phieuDatPhongSelected.khachHang,
        };
        const res = await axios.post(addBookingsRoute, requestData, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        if (res.data) {
          setPhieuDatPhongSelected({});
          setToast({
            header: "Nhận phòng thành công",
            content: "",
            bg: "success",
            textColor: "#fff",
          });
          loadPhieuDatPhong();
        }
      }
    }
  };
  const onHandleHuy = async () => {
    if (phieuDatPhongSelected && phieuDatPhongSelected.maPhieuDatPhong) {
      let dsMaPhong = [];
      if (phieuDatPhongSelected && phieuDatPhongSelected.dsPhong) {
        for (let i = 0; i < phieuDatPhongSelected.dsPhong.length; i++) {
          dsMaPhong = [...dsMaPhong, phieuDatPhongSelected.dsPhong[i].maPhong];
        }
      }
      const requestData = {
        maPhieuDatPhong: phieuDatPhongSelected.maPhieuDatPhong,
        ngayDatPhong: dayjs(phieuDatPhongSelected.ngayDatPhong),
        giamGia: 0,
        ghiChuDatPhong: phieuDatPhongSelected.ghiChuDatPhong,
        ngayNhanPhong: dayjs(phieuDatPhongSelected.ngayNhanPhong),
        ngayTraPhong: dayjs(phieuDatPhongSelected.ngayTraPhong),
        trangThaiDatPhong: "HUY",
        dsMaPhong,
        khachHang: phieuDatPhongSelected.khachHang,
      };
      const res = await axios.post(addBookingsRoute, requestData, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (res.data) {
        setPhieuDatPhongSelected({});
        setToast({
          header: "Hủy đặt phòng thành công",
          content: "",
          bg: "success",
          textColor: "#fff",
        });
        loadPhieuDatPhong();
      }
    }
  };
  const formatDate = (date) => {
    let min = date.getMinutes() + "";
    if (date.getMinutes() < 10) {
      min = "0" + date.getMinutes();
    }
    let month = date.getMonth() + 1;
    let monthStr = month + "";
    if (month < 10) {
      monthStr = "0" + month;
    }
    return (
      [date.getDate(), monthStr, date.getFullYear()].join("/") +
      " " +
      [date.getHours(), min].join(":")
    );
  };
  // console.log(
  //   "Ngày nhận phòng : ",
  //   new Date(phieuDatPhongSelected.ngayNhanPhong)
  // );
  return (
    <StyledContainer>
      <div className="container">
        <h1>Nhận phòng</h1>
        <div className="content">
          <div className="booking-container">
            <h3>Phiếu đặt phòng</h3>
            <div className="search-container">
              <Form.Control
                type="text"
                placeholder="nhập cccd"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button variant="success" onClick={() => onHandleSearch()}>
                <AiOutlineSearch />
              </Button>
              <Button variant="warning" onClick={() => loadPhieuDatPhong()}>
                <BiRefresh />
              </Button>
            </div>
            <div className="list-booking">
              {dsPhieuDatPhong &&
                dsPhieuDatPhong.length > 0 &&
                dsPhieuDatPhong.map((phieuDatPhong, index) => {
                  return (
                    <div
                      className={`booking-item ${
                        phieuDatPhongSelected.maPhieuDatPhong &&
                        phieuDatPhong.maPhieuDatPhong ===
                          phieuDatPhongSelected.maPhieuDatPhong
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => setPhieuDatPhongSelected(phieuDatPhong)}
                      key={index}
                    >
                      <div className="item-header">
                        {phieuDatPhong.khachHang.hoTen} -{" "}
                        {phieuDatPhong.khachHang.cccdKhachHang}
                      </div>
                      <div className="item-body">
                        <div className="booking-date">
                          Ngày đặt phòng:{" "}
                          <p>
                            {/* {moment(
                              new Date(phieuDatPhong.ngayDatPhong)
                            ).format("DD/MM/YYYY HH:MM")} */}
                            {formatDate(new Date(phieuDatPhong.ngayDatPhong))}
                          </p>
                        </div>
                        <div className="check-in-date">
                          Ngày nhận phòng:{" "}
                          <p>
                            {formatDate(new Date(phieuDatPhong.ngayNhanPhong))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="booking-detail">
            <h3>Chi tiết</h3>
            <div className="content-detail">
              <div className="guest-info">
                <h4>Thông tin khách hàng</h4>
                <div className="info-content">
                  - Họ tên:{" "}
                  {phieuDatPhongSelected &&
                    phieuDatPhongSelected.khachHang &&
                    phieuDatPhongSelected.khachHang.hoTen}
                  <br></br>- CCCD:{" "}
                  {phieuDatPhongSelected &&
                    phieuDatPhongSelected.khachHang &&
                    phieuDatPhongSelected.khachHang.cccdKhachHang}
                  <br></br>- Số điện thoại:{" "}
                  {phieuDatPhongSelected &&
                    phieuDatPhongSelected.khachHang &&
                    phieuDatPhongSelected.khachHang.soDienThoaiKH}
                  <br></br>- Email:{" "}
                  {phieuDatPhongSelected &&
                    phieuDatPhongSelected.khachHang &&
                    phieuDatPhongSelected.khachHang.emailKH}
                  <br></br>- Địa chỉ:{" "}
                  {phieuDatPhongSelected &&
                    phieuDatPhongSelected.khachHang &&
                    phieuDatPhongSelected.khachHang.diaChiKH}
                  <br></br>
                </div>
              </div>
              <div className="room-info">
                <h4>Thông tin đặt phòng</h4>
                <div className="info-content">
                  <div className="phong-container">
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Phòng</th>
                          <th>Loại phòng</th>
                          <th>Tầng</th>
                          <th>Giá (1 đêm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {phieuDatPhongSelected &&
                        phieuDatPhongSelected.dsPhong &&
                        phieuDatPhongSelected.dsPhong.length > 0 ? (
                          phieuDatPhongSelected.dsPhong.map((room, index) => {
                            // console.log(isSelected(room));
                            return (
                              <tr key={index}>
                                {/* <td
                                  style={{
                                    cursor: "pointer",
                                    position: "relative",
                                  }}
                                >
                                  <AiFillCloseCircle
                                    style={{ color: "red", fontSize: "2rem" }}
                                  />
                                </td> */}
                                <td>{room.maPhong}</td>
                                <td>{room.tenLoaiPhong}</td>
                                <td>{room.tenTang}</td>
                                <td>{room.giaPhong.toLocaleString()}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={6} style={{ textAlign: "center" }}>
                              Không có dữ liệu
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  <div className="price-container">
                    <p>Tổng tiền</p>
                    <div className="total-price">
                      {totalPrice.toLocaleString()} VND
                    </div>
                  </div>
                  <div className="date-info">
                    - Ngày đặt phòng:{" "}
                    {phieuDatPhongSelected &&
                      phieuDatPhongSelected.ngayDatPhong &&
                      formatDate(new Date(phieuDatPhongSelected.ngayDatPhong))}
                    <br></br>- Ngày nhận phòng:{" "}
                    {phieuDatPhongSelected &&
                      phieuDatPhongSelected.ngayNhanPhong &&
                      formatDate(new Date(phieuDatPhongSelected.ngayNhanPhong))}
                    <br></br>- Ngày trả phòng:{" "}
                    {phieuDatPhongSelected &&
                      phieuDatPhongSelected.ngayTraPhong &&
                      formatDate(new Date(phieuDatPhongSelected.ngayTraPhong))}
                  </div>
                  <div className="btn-function">
                    {phieuDatPhongSelected &&
                    phieuDatPhongSelected.maPhieuDatPhong ? (
                      <Button
                        variant="success"
                        type="submit"
                        onClick={() => onHandleCheckIn()}
                      >
                        Nhận phòng
                      </Button>
                    ) : (
                      <Button variant="secondary" type="submit">
                        Nhận phòng
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      type="submit"
                      onClick={() => onHandleHuy()}
                    >
                      Hủy đặt phòng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          .guest-info {
          }
          .room-info {
            .info-content {
              .phong-container {
                height: 140px;
                overflow-y: auto;
                &::-webkit-scrollbar {
                  width: 0.2rem;
                  &-thumb {
                    background-image: linear-gradient(#373b44, #1095c1);
                    width: 0.1rem;
                    border-radius: 1rem;
                  }
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
  }
`;

export default FrmNhanPhong;

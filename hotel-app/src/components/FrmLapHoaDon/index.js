import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Table, Toast, ToastContainer } from "react-bootstrap";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";
import {} from "dayjs";

// import { BrowserWindow } from 'electron'
import {
  addBillsRoute,
  getBillsByCCCD,
  getBillsOrderDateRoute,
  searchBillsByPhongRoute,
} from "../../utils/APIRoutes";
import FrmXacNhanHoaDon from "../FrmXacNhanHoaDon";
import FrmXacNhanHoaDonMOMO from "../FrmXacNhanHoaDon/FrmXacNhanHoaDonMOMO";

function FrmLapHoaDon() {
  const [toast, setToast] = useState(null);
  const [dsHoaDon, setDsHoaDon] = useState([]);
  const [hoaDonSelected, setHoaDonSelected] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmBill, setShowConfirmBill] = useState(false);
  const [showConfirmBill_MOMO, setShowConfirmBill_MOMO] = useState(false);
  const [totalHour, setTotalHour] = useState(0);
  const [totalRoomPrice, setTotalRoomPrice] = useState(0);
  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [isPrint, setIsPrint] = useState(false);
  const [generateQR, setgenrateQR] = useState(undefined);
  const [showThanhToanMOMO, setShowThanhToanMOMO] = useState(true);
  const [showButtonXacNhan, setShowButtonXacNhan] = useState(false);
  // const [isDisableXacNhanThanhToanMOMO, setIsDisableXacNhanThanhToanMOMO] = useState(true);
  const [ketQuaThanhToan, setKetQuaThanhToan] = useState([]);

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
  const getQRMOMO = async (totalPrice) => {
    const priceObject = {
      price: totalPrice,
    };
    console.log("trong functionGETMOMOO:", priceObject);
    const { data } = await axios.post(
      "https://nhatminh3004-momo.onrender.com/momo",
      priceObject,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
    console.log("data response functionGETMOMOO:", data);
    return data;
  };
  useEffect(() => {
    let intervalidID;

    if (ketQuaThanhToan.length === 0) {
      intervalidID = setInterval(async () => {
        const { data } = await axios.get(
          "https://nhatminh3004-momo.onrender.com/resultQR",
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        console.log("Kết quả Mảng Thanh Toán MOMO", data);
        if (data.length > 0) {
          setKetQuaThanhToan(data);
          // setIsDisableXacNhanThanhToanMOMO(false);
          clearInterval(intervalidID);
        }
      }, 15000);
    } else {
      clearInterval(intervalidID);
    }

    return () => clearInterval(intervalidID);
  }, [generateQR]);
  useEffect(() => {
    const fetchAPI = async () => {
      if (hoaDonSelected.maHoaDon) {
        const result = await getQRMOMO(totalPrice); // use await to wait for the response
        // console.log('result:', result);
        setgenrateQR(result);
      } else {
        console.log("NOT FOUND QR MOMO");
      }
    };
    fetchAPI();
  }, [totalPrice]);
  useEffect(() => {
    let price = 0;
    let ngayNhan = new Date();
    let ngayTra = new Date();
    if (hoaDonSelected.ngayNhanPhong) {
      ngayNhan = new Date(hoaDonSelected.ngayNhanPhong);
    }
    let totalHours = diff_hours(ngayNhan, ngayTra);
    setTotalHour(totalHours);
    if (
      hoaDonSelected &&
      hoaDonSelected.dsPhong &&
      hoaDonSelected.dsPhong.length > 0
    ) {
      for (let i = 0; i < hoaDonSelected.dsPhong.length; i++) {
        price += hoaDonSelected.dsPhong[i].giaPhong * totalHours;
      }
      setTotalRoomPrice(price);
    }

    if (
      hoaDonSelected &&
      hoaDonSelected.dsChiTietDichVuDto &&
      hoaDonSelected.dsChiTietDichVuDto.length > 0
    ) {
      let productPrices = 0;
      for (let i = 0; i < hoaDonSelected.dsChiTietDichVuDto.length; i++) {
        price +=
          hoaDonSelected.dsChiTietDichVuDto[i].soLuong *
          hoaDonSelected.dsChiTietDichVuDto[i].giaDichVu;
        productPrices +=
          hoaDonSelected.dsChiTietDichVuDto[i].soLuong *
          hoaDonSelected.dsChiTietDichVuDto[i].giaDichVu;
      }
      setTotalServicePrice(productPrices);
    }
    setTotalPrice(price);
  }, [hoaDonSelected]);
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
    setDsHoaDon(data);
    // if (data && data.length > 0) {
    // }
  };
  const onHandleCancelPrint = () => {
    setHoaDonSelected({});
    setShowConfirmBill(false);
    setIsPrint(false);
  };
  const onHandleCheckInMOMO = async () => {
    if (hoaDonSelected.maHoaDon) {
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
          ngayTraPhong: new Date(),
          tienNhan: totalPrice,
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
        // setHoaDonSelected({});
        setToast({
          header: "Lập hóa đơn thành công",
          content: "",
          bg: "success",
          textColor: "#fff",
        });
        loadHoaDon();
        // setShowConfirmBill(false);
        setIsPrint(true);
        setShowButtonXacNhan(false);
        setShowThanhToanMOMO(true);
        setgenrateQR(undefined);
        setKetQuaThanhToan([]);
      }
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
          ngayLap: new Date(),
          ngayNhanPhong: new Date(hoaDonSelected.ngayNhanPhong),
          ngayTraPhong: new Date(),
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
        // setHoaDonSelected({});
        setToast({
          header: "Lập hóa đơn thành công",
          content: "",
          bg: "success",
          textColor: "#fff",
        });
        loadHoaDon();
        // setShowConfirmBill(false);
        setIsPrint(true);
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
  const onHandleConfirm = () => {
    if (hoaDonSelected.maHoaDon && hoaDonSelected.tienNhan && validate()) {
      setShowConfirmBill(true);
    }
  };
  const formatOnlyDate = (date) => {
    // console.log(date.getMonth() + 1);
    let month = date.getMonth() + 1;
    let monthStr = month + "";
    if (month < 10) {
      monthStr = "0" + month;
    }
    return [date.getDate(), monthStr, date.getFullYear()].join("/");
  };
  const formatDate = (date) => {
    // console.log(date);
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
  const handleQRMOMO = () => {
    setShowButtonXacNhan(true);
    setShowThanhToanMOMO(false);
    window.open(generateQR[0].payUrl, "_blank");
    console.log("QR MOMO:", generateQR);
  };

  const handlXacNhanMOMO = () => {
    if (ketQuaThanhToan.length !== 0) {
      if (ketQuaThanhToan[0].message === "Thành công.") {
        setToast({
          header: "Thanh toán MOMO thành công",
          content: "",
          bg: "success",
          textColor: "#fff",
        });
        setShowConfirmBill_MOMO(true);

        // setShowButtonXacNhan(false);
        // setShowThanhToanMOMO(true);
        // setgenrateQR(undefined);
        // setKetQuaThanhToan([]);
      } else if (
        ketQuaThanhToan[0].message === "Giao dịch bị từ chối bởi người dùng."
      ) {
        setToast({
          header: "Thanh toán MOMO đã bị hủy",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        setShowButtonXacNhan(false);
        setShowThanhToanMOMO(true);
        setgenrateQR(undefined);
        setKetQuaThanhToan([]);
      }
    } else {
      setToast({
        header: "Bạn chưa thanh toán.",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });

      // setIsDisableXacNhanThanhToanMOMO(true);
    }
    // -------------------
  };
  console.log("Hóa đơn selected:", hoaDonSelected);
  // console.log('Tổng tiền:', totalPrice);
  console.log("Generate QR MOMO:", generateQR);
  console.log("Kết quả thanh toán:", ketQuaThanhToan);
  // console.log(`${dsHoaDon[0] && new Date(dsHoaDon[0].ngayNhanPhong)}`);
  // console.log(dsHoaDon);
  return (
    <StyledContainer>
      <div className="container">
        <h1>Lập hóa đơn</h1>
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
                        <div className="booking-date">
                          Ngày đặt phòng:{" "}
                          <p>
                            {formatOnlyDate(
                              new Date(hoaDon.phieuDatPhong.ngayDatPhong)
                            )}
                          </p>
                        </div>
                        <div className="check-in-date">
                          Ngày nhận phòng:{" "}
                          <p>
                            {formatOnlyDate(new Date(hoaDon.ngayNhanPhong))}
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
                <h4>Thông tin khách hàng</h4>
                <div className="info-content">
                  - Họ tên:{" "}
                  {hoaDonSelected &&
                    hoaDonSelected.khachHang &&
                    hoaDonSelected.khachHang.hoTen}
                  <br></br>- CCCD:{" "}
                  {hoaDonSelected &&
                    hoaDonSelected.khachHang &&
                    hoaDonSelected.khachHang.cccdKhachHang}
                  <br></br>- Số điện thoại:{" "}
                  {hoaDonSelected &&
                    hoaDonSelected.khachHang &&
                    hoaDonSelected.khachHang.soDienThoaiKH}
                  <br></br>- Email:{" "}
                  {hoaDonSelected &&
                    hoaDonSelected.khachHang &&
                    hoaDonSelected.khachHang.emailKH}
                  <br></br>- Địa chỉ:{" "}
                  {hoaDonSelected &&
                    hoaDonSelected.khachHang &&
                    hoaDonSelected.khachHang.diaChiKH}
                  <br></br>
                </div>
              </div>
              <div className="room-info">
                <div className="info-content">
                  <h4>Chi tiết hóa đơn</h4>
                  <div className="phong-container">
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Phòng</th>
                          <th>Loại</th>
                          <th>Giá (1 giờ)</th>
                          <th>Tổng giờ</th>
                          <th>T tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hoaDonSelected &&
                        hoaDonSelected.dsPhong &&
                        hoaDonSelected.dsPhong.length > 0 ? (
                          hoaDonSelected.dsPhong.map((room, index) => {
                            // console.log(isSelected(room));
                            return (
                              <tr key={index}>
                                <td>{room.maPhong}</td>
                                <td>{room.tenLoaiPhong}</td>
                                <td>{room.giaPhong.toLocaleString()}</td>
                                <td>{totalHour}</td>
                                <td>
                                  {(totalHour * room.giaPhong).toLocaleString()}
                                </td>
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
                        <tr>
                          <td
                            colSpan={4}
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            Tồng thành tiền
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {totalRoomPrice.toLocaleString()} VND
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <h4>Chi tiết dịch vụ</h4>
                  <div className="phong-container">
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Tên</th>
                          <th>Đơn vị</th>
                          <th>Giá</th>
                          <th>SL</th>
                          <th>T tiền</th>
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
                                  <td>{dichVu.tenDichVu}</td>
                                  <td>{dichVu.tenLoaiDichVu}</td>
                                  <td>{dichVu.giaDichVu.toLocaleString()}</td>
                                  <td>{dichVu.soLuong}</td>
                                  <td>
                                    {(
                                      dichVu.giaDichVu * dichVu.soLuong
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              );
                            }
                          )
                        ) : (
                          <tr>
                            <td colSpan={6} style={{ textAlign: "center" }}>
                              Không có dữ liệu
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td
                            colSpan={4}
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            Tồng thành tiền
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {totalServicePrice.toLocaleString()} VND
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  <div className="date-info">
                    - Ngày đặt phòng:{" "}
                    {hoaDonSelected &&
                      hoaDonSelected.ngayLap &&
                      formatDate(
                        new Date(hoaDonSelected.phieuDatPhong.ngayDatPhong)
                      )}
                  </div>
                  <div className="date-info">
                    - Ngày nhận phòng:{" "}
                    {hoaDonSelected &&
                      hoaDonSelected.ngayLap &&
                      formatDate(new Date(hoaDonSelected.ngayNhanPhong))}
                  </div>
                  <div className="date-info">
                    - Ngày trả phòng:{" "}
                    {hoaDonSelected &&
                      hoaDonSelected.ngayLap &&
                      formatDate(new Date())}
                  </div>
                  <div className="price-container">
                    <p>Tổng tiền</p>
                    <div className="total-price">
                      {totalPrice.toLocaleString()} VND
                    </div>
                  </div>
                  <div className="price-container">
                    <p>Tiền nhận</p>
                    <div className="total-price">
                      <Form.Control
                        type="number"
                        name={"tienNhan"}
                        placeholder="nhập cccd"
                        value={
                          hoaDonSelected.tienNhan ? hoaDonSelected.tienNhan : 0
                        }
                        onChange={(e) => onHandleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="price-container">
                    <p>Tiền thừa</p>
                    <div className="total-price">
                      {(hoaDonSelected.tienNhan - totalPrice).toLocaleString()}
                      {/* {hoaDonSelected.tienNhan - totalPrice < 0
                        ? 0
                        : (
                            hoaDonSelected.tienNhan - totalPrice
                          ).toLocaleString()}{" "} */}{" "}
                      VND
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="btn-function">
              {/* Thanh toán momo */}
              {showThanhToanMOMO && generateQR && (
                <Button variant="success" onClick={() => handleQRMOMO()}>
                  Thanh toán bằng MOMO
                </Button>
              )}
              {showButtonXacNhan && (
                <Button
                  // disabled={isDisableXacNhanThanhToanMOMO}
                  variant="success"
                  onClick={() => handlXacNhanMOMO()}
                >
                  Xác nhận thanh toán MOMO.
                </Button>
              )}

              {hoaDonSelected &&
              hoaDonSelected.maHoaDon &&
              hoaDonSelected.tienNhan &&
              hoaDonSelected.tienNhan >= totalPrice ? (
                <Button
                  variant="success"
                  type="submit"
                  onClick={() => onHandleConfirm()}
                >
                  Lập hóa đơn
                </Button>
              ) : (
                <Button variant="secondary" type="submit">
                  Lập hóa đơn
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showConfirmBill && (
        <FrmXacNhanHoaDon
          setShowConfirmBill={setShowConfirmBill}
          hoaDonSelected={hoaDonSelected}
          totalPrice={totalPrice}
          totalHour={totalHour}
          totalRoomPrice={totalRoomPrice}
          totalServicePrice={totalServicePrice}
          onHandleCheckIn={onHandleCheckIn}
          isPrint={isPrint}
          setIsPrint={setIsPrint}
          setHoaDonSelected={setHoaDonSelected}
          onHandleCancelPrint={onHandleCancelPrint}
          formatDate={formatDate}
        />
      )}
      {/* MOMO */}
      {showConfirmBill_MOMO && (
        <FrmXacNhanHoaDonMOMO
          setShowConfirmBill_MOMO={setShowConfirmBill_MOMO}
          hoaDonSelected={hoaDonSelected}
          totalPrice={totalPrice}
          totalHour={totalHour}
          totalRoomPrice={totalRoomPrice}
          totalServicePrice={totalServicePrice}
          onHandleCheckInMOMO={onHandleCheckInMOMO}
          isPrint={isPrint}
          setIsPrint={setIsPrint}
          setHoaDonSelected={setHoaDonSelected}
          onHandleCancelPrint={onHandleCancelPrint}
          formatDate={formatDate}
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
          padding-right: 0.5rem;
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

export default FrmLapHoaDon;

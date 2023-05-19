import moment from "moment";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

// import Logo from "/logo1.png";

function ChiTietHoaDon({
  hoaDonSelected,
  setHoaDonSelected,
  totalPrice,
  totalHour,
  totalRoomPrice,
  totalServicePrice,
  formatDate,
}) {
  // console.log(hoaDonSelected);
  const [nhanVien, setNhanVien] = useState();
  const handlePrint = () => {
    window.print();
  };
  const componentRef = useRef();
  useEffect(() => {
    const nhanVienTemp = JSON.parse(localStorage.getItem("nhanVien"));
    setNhanVien(nhanVienTemp);
  }, []);
  return (
    <StyledContainer>
      <div className="container-styled">
        <div ref={componentRef} className="booking-detail">
          <div className="content-detail">
            <div
              className="bill-title"
              style={{
                display: "flex",
                gap: "0.1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="img-container">
                <img
                  className="logo-img"
                  src="/logo1.png"
                  alt="logo"
                  style={{
                    width: "100px",
                    backgroundColor: "white",
                    borderRadius: "150px",
                  }}
                />
              </div>
              <p
                className="title"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: 0,
                }}
              >
                Khách Sạn Sama
              </p>
            </div>
            <div className="bill-header">
              <h3>Hóa đơn</h3>
            </div>
            <div className="bill-info">
              - Mà hóa đơn: {hoaDonSelected && hoaDonSelected.maHoaDon}
              <br></br>- Ngày đặt phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatDate(new Date(hoaDonSelected.phieuDatPhong.ngayDatPhong))}
              <br></br>- Ngày nhận phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatDate(new Date(hoaDonSelected.ngayNhanPhong))}
              <br></br>- Ngày trả phòng:{" "}
              {hoaDonSelected &&
                hoaDonSelected.ngayLap &&
                formatDate(new Date(hoaDonSelected.ngayTraPhong))}
              <br></br> - Thu ngân:{" "}
              {nhanVien && `${nhanVien.hoTen} - ${nhanVien.maNhanVien}`}
              <br></br>
            </div>
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
                  <Table bordered={true}>
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
                          <td colSpan={5} style={{ textAlign: "center" }}>
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
                  <Table bordered={true}>
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
                          <td colSpan={5} style={{ textAlign: "center" }}>
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
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold" }}>Tổng tiền</p>
                  <div className="total-price" style={{ fontWeight: "bold" }}>
                    {totalPrice && totalPrice.toLocaleString()} VND
                  </div>
                </div>
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold" }}>Tiền nhận</p>
                  <div className="total-price" style={{ fontWeight: "bold" }}>
                    {hoaDonSelected.tienNhan
                      ? Number(hoaDonSelected.tienNhan).toLocaleString()
                      : 0}{" "}
                    VND
                  </div>
                </div>
                <div
                  className="price-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold" }}>Tiền thừa</p>
                  <div className="total-price" style={{ fontWeight: "bold" }}>
                    {totalPrice &&
                      (hoaDonSelected.tienNhan - totalPrice).toLocaleString()}
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
        </div>
        <div className="btn-container">
          {hoaDonSelected && hoaDonSelected.tienNhan > 0 ? (
            <ReactToPrint
              trigger={() => (
                <Button variant="primary" onClick={() => handlePrint()}>
                  In hóa đơn
                </Button>
              )}
              content={() => componentRef.current}
            />
          ) : (
            <Button variant="secondary" type="submit">
              In hóa đơn
            </Button>
          )}
          <Button
            variant="danger"
            type="submit"
            onClick={() => setHoaDonSelected(undefined)}
          >
            Hủy
          </Button>
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
    width: 54%;
    padding: 0.5rem;
    height: 93%;
    display: flex;
    flex-direction: column;
    text-align: start;
    background-color: #fff;
    position: relative;
    .booking-detail {
      display: flex;
      flex-direction: column;
      height: 95%;
      /* height: 615px; */
      h3 {
        display: flex;
        align-items: center;
        margin-bottom: 0;
        height: 10%;
        padding: 0.5rem;
        border-bottom: 1px solid #ccc;
      }
      .content-detail {
        height: 585px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-image: linear-gradient(#373b44, #1095c1);
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
        .bill-title {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .guest-info {
        }
        .room-info {
          .info-content {
            .phong-container {
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
    }
    .btn-container {
      display: flex;
      height: 7%;
      justify-content: flex-end;
      gap: 1rem;
    }
    /* .print-container {
      background-color: white;
      width: 77vw;
      height: 100vh;
      position: absolute;
      z-index: 99;
      top: -25px;
      left: -260px;
    } */
  }
`;
export default ChiTietHoaDon;

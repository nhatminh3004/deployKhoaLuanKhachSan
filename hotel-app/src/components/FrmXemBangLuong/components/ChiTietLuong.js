import moment from "moment";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

// import Logo from "/logo1.png";

function ChiTietLuong({ bangLuongSelected, setBangLuongSelected }) {
  const [tongGio, setTongGio] = useState(0);
  useEffect(() => {
    if (
      bangLuongSelected &&
      bangLuongSelected.dsChiTietBangLuong &&
      bangLuongSelected.dsChiTietBangLuong.length > 0
    ) {
      let temp = 0;
      for (let i = 0; i < bangLuongSelected.dsChiTietBangLuong.length; i++) {
        temp +=
          bangLuongSelected.dsChiTietBangLuong[i].bangChamCong.chiTietPhanCong
            .caLamViec.soGio;
      }
      setTongGio(temp);
    }
  }, [bangLuongSelected]);
  const handlePrint = () => {
    window.print();
  };
  const tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    // console.log(time);
    return time.join(""); // return adjusted time or original string
  };
  const formatTime = (date) => {
    let min = date.getMinutes() + "";
    if (date.getMinutes() < 10) {
      min = "0" + date.getMinutes();
    }
    let hour = date.getHours() + "";
    if (date.getHours() < 10) {
      hour = "0" + date.getHours();
    }
    return tConvert([hour, min].join(":"));
  };
  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let monthStr = month + "";
    if (month < 10) {
      monthStr = "0" + month;
    }
    let dateDis = date.getDate();
    if (dateDis < 10) {
      dateDis = "0" + dateDis;
    }
    return (
      [dateDis, monthStr, date.getFullYear()].join("/") + " " + formatTime(date)
    );
  };
  const isDate = (myDate) => {
    return myDate.constructor.toString().indexOf("Date") > -1;
  };
  const componentRef = useRef();

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
              <h3>
                Bảng lương tháng {bangLuongSelected.thang} năm{" "}
                {bangLuongSelected.nam}
              </h3>
            </div>
            <div className="bill-info">
              - Mà bảng lương: {bangLuongSelected.maBangLuong}
              <br></br>- Mã nhân viên: {bangLuongSelected.nhanVien.maNhanVien}
              <br></br>- Họ tên nhân viên: {bangLuongSelected.nhanVien.hoTen}
              <br></br>- Lương cơ bản:{" "}
              {bangLuongSelected.nhanVien.luongCoBan.toLocaleString()} VND
            </div>
            <div className="room-info">
              <div className="info-content">
                <h4>Chi tiết lương</h4>
                <div className="phong-container">
                  <Table bordered={true}>
                    <thead>
                      <tr>
                        <th>Ca làm việc</th>
                        <th>Thời gian chấm công</th>
                        <th>Số giờ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bangLuongSelected &&
                      bangLuongSelected.dsChiTietBangLuong &&
                      bangLuongSelected.dsChiTietBangLuong.length > 0 ? (
                        bangLuongSelected.dsChiTietBangLuong.map(
                          (chiTietBangLuong, index) => {
                            // console.log(isSelected(room));
                            return (
                              <tr key={index}>
                                <td>
                                  {
                                    chiTietBangLuong.bangChamCong
                                      .chiTietPhanCong.caLamViec.tenCa
                                  }{" "}
                                  -{" "}
                                  {chiTietBangLuong.bangChamCong.thu > 4
                                    ? chiTietBangLuong.bangChamCong.thu === 5
                                      ? "Thứ 7"
                                      : "Chủ nhật"
                                    : "Thứ " +
                                      Number(
                                        chiTietBangLuong.bangChamCong.thu + 2
                                      )}
                                </td>
                                <td>
                                  {isDate(
                                    chiTietBangLuong.bangChamCong.ngayChamCong
                                  )
                                    ? formatDate(
                                        chiTietBangLuong.bangChamCong
                                          .ngayChamCong
                                      )
                                    : formatDate(
                                        new Date(
                                          chiTietBangLuong.bangChamCong.ngayChamCong
                                        )
                                      )}
                                </td>
                                <td>
                                  {
                                    chiTietBangLuong.bangChamCong
                                      .chiTietPhanCong.caLamViec.soGio
                                  }
                                </td>
                              </tr>
                            );
                          }
                        )
                      ) : (
                        <tr>
                          <td colSpan={3} style={{ textAlign: "center" }}>
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          colSpan={2}
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Tổng số giờ
                        </td>
                        <td style={{ fontWeight: "bold" }}>{tongGio}</td>
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
                    {bangLuongSelected &&
                      bangLuongSelected.tongLuong.toLocaleString()}{" "}
                    VND
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <ReactToPrint
            trigger={() => (
              <Button variant="primary" onClick={() => handlePrint()}>
                In bảng lương
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Button
            variant="danger"
            type="submit"
            onClick={() => setBangLuongSelected(undefined)}
          >
            Đóng
          </Button>
        </div>
        {/* {!isPrint ? (
          <div className="btn-container">
            <Button variant="success" type="submit" onClick={onHandleCheckIn}>
              Xác nhận
            </Button>
            <Button
              variant="danger"
              type="submit"
              onClick={() => {
                setShowConfirmBill(false);
                setIsPrint(false);
              }}
            >
              Hủy
            </Button>
          </div>
        ) : (
          <div className="btn-container">
            <ReactToPrint
              trigger={() => (
                <Button variant="primary" onClick={() => handlePrint()}>
                  In hóa đơn
                </Button>
              )}
              content={() => componentRef.current}
            />
            <Button
              variant="danger"
              type="submit"
              onClick={onHandleCancelPrint}
            >
              Hủy
            </Button>
          </div>
        )} */}
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
export default ChiTietLuong;

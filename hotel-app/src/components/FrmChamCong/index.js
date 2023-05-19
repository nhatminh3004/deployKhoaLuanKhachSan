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
  addAssignment,
  addTimekeeping,
  getAssignDetailDtos,
  getShiftsOrderGioBatDauRoute,
  getTimekeeping,
} from "../../utils/APIRoutes";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GrRadial, GrRadialSelected } from "react-icons/gr";

function FrmChamCong() {
  const [toast, setToast] = useState(null);
  const [chiTietPhanCongDtoSelected, setChiTietPhanCongDtoSelected] = useState(
    {}
  );
  const [dsChiTietPhanCongDto, setDsChiTietPhanCongDto] = useState([]);
  const [dsBangChamCong, setDsBangChamCong] = useState([]);

  useEffect(() => {
    loadBangChamCongFromDB();
  }, [chiTietPhanCongDtoSelected]);
  const loadBangChamCongFromDB = async () => {
    if (
      chiTietPhanCongDtoSelected &&
      chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto &&
      chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto.length > 0
    ) {
      const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let thu = new Date().getDay();
      if (thu === 0) {
        thu = 6;
      } else {
        thu -= 1;
      }
      let temp = [];
      for (
        let i = 0;
        i < chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto.length;
        i++
      ) {
        console.log({
          thu: thu,
          maChiTietPhanCong:
            chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto[i]
              .maChiTietPhanCong,
        });
        const { data } = await axios.post(
          `${getTimekeeping}`,
          {
            thu: thu,
            maChiTietPhanCong:
              chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto[i]
                .maChiTietPhanCong,
          },
          config
        );
        console.log(data);
        if (data) {
          temp = [...temp, { ...data, selected: true }];
        }
      }
      setDsBangChamCong(temp);
    }
  };
  useEffect(() => {
    loadChiTietPhaDtoFromDB();
  }, []);
  const loadChiTietPhaDtoFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    let thu = new Date().getDay();
    if (thu === 0) {
      thu = 6;
    } else {
      thu -= 1;
    }
    const { data } = await axios.post(
      `${getAssignDetailDtos}`,
      { thu: thu, ngayHienTai: new Date() },
      config
    );
    console.log(data);
    if (data && data.length > 0) {
      setDsChiTietPhanCongDto(data);
    }
  };

  //   console.log(bangPhanCong);
  const onHandleSearch = async () => {};

  const onHandleSave = async () => {
    if (dsBangChamCong && dsBangChamCong.length > 0) {
      const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let reqData = [];
      for (let i = 0; i < dsBangChamCong.length; i++) {
        reqData = [
          ...reqData,
          {
            maChiTietPhanCong:
              dsBangChamCong[i].chiTietPhanCong.maChiTietPhanCong,
            maBangChamCong: dsBangChamCong[i].maBangChamCong,
            ngayChamCong: dsBangChamCong[i].ngayChamCong,
            maNhanVien: dsBangChamCong[i].nhanVien.maNhanVien,
            thu: dsBangChamCong[i].thu,
            duocChon: dsBangChamCong[i].selected,
          },
        ];
      }
      const { data } = await axios.post(`${addTimekeeping}`, reqData, config);
      // const data = {};
      if (data && data.length > 0) {
        let temp = [];
        for (let i = 0; i < data.length; i++) {
          temp = [...temp, { ...data[i], selected: true }];
        }
        setDsBangChamCong(temp);
        setToast({
          header: "Lưu thành công",
          content: "",
          bg: "success",
          textColor: "#fff",
        });
      } else {
        setToast({
          header: "Đã xảy ra lỗi",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
      }
    }
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
  const onHandleSelect = (nhanVienMaChiTietPhanCongDto) => {
    console.log(nhanVienMaChiTietPhanCongDto);
    let thu = new Date().getDay();
    if (thu === 0) {
      thu = 6;
    } else {
      thu -= 1;
    }
    if (dsBangChamCong && dsBangChamCong.length > 0) {
      let temp = JSON.parse(JSON.stringify(dsBangChamCong));
      // let temp = dsBangChamCong;
      let outLoop = false;
      for (let i = 0; i < dsBangChamCong.length; i++) {
        if (
          nhanVienMaChiTietPhanCongDto.nhanVien.maNhanVien ===
            dsBangChamCong[i].nhanVien.maNhanVien &&
          dsBangChamCong[i].chiTietPhanCong.maChiTietPhanCong ===
            nhanVienMaChiTietPhanCongDto.maChiTietPhanCong
        ) {
          temp[i] = {
            ...dsBangChamCong[i],
            ngayChamCong: new Date(),
            selected: !dsBangChamCong[i].selected,
          };
          outLoop = true;
          setDsBangChamCong(temp);
        } else if (i >= dsBangChamCong.length - 1 && !outLoop) {
          temp = [
            ...temp,
            {
              chiTietPhanCong: {
                maChiTietPhanCong:
                  nhanVienMaChiTietPhanCongDto.maChiTietPhanCong,
              },
              maBangChamCong: 0,
              ngayChamCong: new Date(),
              nhanVien: {
                maNhanVien: nhanVienMaChiTietPhanCongDto.nhanVien.maNhanVien,
              },
              thu: thu,
              selected: true,
            },
          ];
          setDsBangChamCong(temp);
        }
      }
    } else {
      setDsBangChamCong([
        {
          chiTietPhanCong: {
            maChiTietPhanCong: nhanVienMaChiTietPhanCongDto.maChiTietPhanCong,
          },
          maBangChamCong: 0,
          ngayChamCong: new Date(),
          nhanVien: {
            maNhanVien: nhanVienMaChiTietPhanCongDto.nhanVien.maNhanVien,
          },
          thu: thu,
          selected: true,
        },
      ]);
    }
  };

  const isChecked = (nhanVienMaChiTietPhanCongDto) => {
    if (dsBangChamCong && dsBangChamCong.length > 0) {
      for (let i = 0; i < dsBangChamCong.length; i++) {
        if (
          dsBangChamCong[i].nhanVien.maNhanVien ===
            nhanVienMaChiTietPhanCongDto.nhanVien.maNhanVien &&
          dsBangChamCong[i].chiTietPhanCong.maChiTietPhanCong ===
            nhanVienMaChiTietPhanCongDto.maChiTietPhanCong
        ) {
          return dsBangChamCong[i].selected;
        }
      }
    }
    return false;
  };

  const countCoMat = () => {
    if (
      chiTietPhanCongDtoSelected &&
      chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto &&
      chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto.length > 0
    ) {
      let coMat = 0;
      if (dsBangChamCong && dsBangChamCong.length > 0) {
        for (let i = 0; i < dsBangChamCong.length; i++) {
          if (dsBangChamCong[i].selected) {
            coMat++;
          }
        }
        return coMat;
      }
    }
    return 0;
  };

  // const onHandeChangeDate = (date, name) => {
  //   setBangPhanCong({ ...bangPhanCong, [name]: dayjs(date).toDate() });
  // };
  console.log(dsBangChamCong);
  return (
    <StyledContainer>
      <div className="container">
        <h1>Chấm công</h1>
        <div className="content">
          <div className="booking-container">
            <h4>Danh sách ca trong ngày</h4>
            {/* <div className="search-container">
              <Form.Control
                type="text"
                placeholder="nhập cccd"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button variant="success" onClick={() => onHandleSearch()}>
                <AiOutlineSearch />
              </Button>
              <Button
                variant="warning"
                onClick={() => loadChiTietPhaDtoFromDB()}
              >
                <BiRefresh />
              </Button>
            </div> */}
            <div className="list-booking">
              {dsChiTietPhanCongDto &&
                dsChiTietPhanCongDto.length > 0 &&
                dsChiTietPhanCongDto.map((chiTietPhanCongDto, index) => {
                  return (
                    <div
                      className={`booking-item ${
                        chiTietPhanCongDto.caLamViec &&
                        chiTietPhanCongDto.caLamViec.maCa &&
                        chiTietPhanCongDtoSelected &&
                        chiTietPhanCongDtoSelected.caLamViec &&
                        chiTietPhanCongDtoSelected.caLamViec.maCa &&
                        chiTietPhanCongDto.caLamViec.maCa ===
                          chiTietPhanCongDtoSelected.caLamViec.maCa
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setChiTietPhanCongDtoSelected(chiTietPhanCongDto)
                      }
                      key={index}
                    >
                      <div>
                        Mã ca: {chiTietPhanCongDto.caLamViec.maCa} <br></br>
                        Tên ca: {chiTietPhanCongDto.caLamViec.tenCa}
                        <br></br>
                        Thời gian:{" "}
                        <b>
                          {isDate(chiTietPhanCongDto.caLamViec.gioBatDau)
                            ? formatTime(chiTietPhanCongDto.caLamViec.gioBatDau)
                            : formatTime(
                                new Date(
                                  "2023-04-04T" +
                                    chiTietPhanCongDto.caLamViec.gioBatDau
                                )
                              )}{" "}
                          -{" "}
                          {isDate(chiTietPhanCongDto.caLamViec.gioKetThuc)
                            ? formatTime(
                                chiTietPhanCongDto.caLamViec.gioKetThuc
                              )
                            : formatTime(
                                new Date(
                                  "2023-04-04T" +
                                    chiTietPhanCongDto.caLamViec.gioKetThuc
                                )
                              )}
                        </b>
                        <br></br>
                        Sồ giờ: <b>{chiTietPhanCongDto.caLamViec.soGio}</b>
                      </div>
                      {/* <div className="item-body">
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
                                    ? phong.tenPhong + "."
                                    : phong.tenPhong + ","
                                } `;
                              })}
                          </p>
                        </div>
                      </div> */}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="booking-detail">
            <h3>
              Danh sách (Có mặt: {countCoMat()} - Vắng:{" "}
              {chiTietPhanCongDtoSelected &&
              chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto &&
              chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto.length >
                0
                ? chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto
                    .length - countCoMat()
                : 0}
              )
            </h3>
            <div className="content-detail">
              {/* <div className="guest-info">
                <h4>Thông tin chung</h4>
                <div className="info-content">
                  - Nhân viên:{" "}
                  {nhanVienSelected &&
                    nhanVienSelected.nhanvien &&
                    nhanVienSelected.nhanvien.hoTen}{" "}
                  {nhanVienSelected &&
                    nhanVienSelected.nhanvien &&
                    "(" + nhanVienSelected.nhanvien.maNhanVien + ")"}
                  <br></br>- Ngày tạo bảng:{" "}
                  {bangPhanCong &&
                    bangPhanCong.ngayPhanCong &&
                    formatDate(
                      bangPhanCong.ngayPhanCong &&
                        isDate(bangPhanCong.ngayPhanCong)
                        ? bangPhanCong.ngayPhanCong
                        : new Date(bangPhanCong.ngayPhanCong)
                    )}
                  <br></br> - Ngày chỉnh sửa cuối:{" "}
                  {bangPhanCong &&
                    bangPhanCong.ngayChinhSua &&
                    formatDate(
                      bangPhanCong.ngayChinhSua &&
                        isDate(bangPhanCong.ngayChinhSua)
                        ? bangPhanCong.ngayChinhSua
                        : new Date(bangPhanCong.ngayChinhSua)
                    )}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileDateTimePicker"]}>
                      <MobileDatePicker
                        sx={{ width: "50%" }}
                        label="Ngày bắt đầu"
                        value={
                          bangPhanCong && bangPhanCong.ngayBatDau
                            ? dayjs(
                                isDate(bangPhanCong.ngayBatDau)
                                  ? dayjs(bangPhanCong.ngayBatDau)
                                  : dayjs(new Date(bangPhanCong.ngayBatDau))
                              )
                            : dayjs(new Date())
                        }
                        // onChange={(date) => setDateNgaySinh(date)}
                        onChange={(date) => {
                          onHandeChangeDate(date, "ngayBatDau");
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div> */}
              <div className="room-info">
                {/* <h4>Lịch biểu</h4> */}
                <div className="info-content">
                  <div className="phong-container">
                    <Table bordered={true} striped>
                      <thead>
                        <tr>
                          <th>Mã nhân viên</th>
                          <th>Tên nhân viên</th>
                          <th>Điểm danh</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chiTietPhanCongDtoSelected &&
                          chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto &&
                          chiTietPhanCongDtoSelected
                            .dsNhanVienMaChiTietPhanCongDto.length > 0 &&
                          chiTietPhanCongDtoSelected.dsNhanVienMaChiTietPhanCongDto.map(
                            (nhanVienMaChiTietPhanCongDto, index) => {
                              //   isCaSelected(ca.maCa, 0) ? "selected" : ""
                              return (
                                <tr
                                  key={index}
                                  onClick={() =>
                                    onHandleSelect(nhanVienMaChiTietPhanCongDto)
                                  }
                                >
                                  <td>
                                    {
                                      nhanVienMaChiTietPhanCongDto.nhanVien
                                        .maNhanVien
                                    }
                                  </td>
                                  <td>
                                    {
                                      nhanVienMaChiTietPhanCongDto.nhanVien
                                        .hoTen
                                    }
                                  </td>
                                  <td>
                                    {isChecked(nhanVienMaChiTietPhanCongDto) ? (
                                      <p>
                                        <GrRadialSelected /> Có mặt
                                      </p>
                                    ) : (
                                      <p>
                                        <GrRadial /> Vắng
                                      </p>
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </div>

                  <div className="price-container">
                    {/* <p>Tổng tiền dịch vụ</p>
                    <div className="total-price">
                      {(selectPrice + hoaDonPrice).toLocaleString()} VND
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-function">
              <Button
                variant="success"
                type="submit"
                onClick={() => onHandleSave()}
              >
                Lưu
              </Button>
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
      grid-template-columns: 25% 75%;
      padding-bottom: 0.5rem;

      .booking-container {
        padding: 0.5rem;
        height: 615px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
        h4 {
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
        padding: 0 0 0 1rem;
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

                svg {
                  font-size: 1.6rem;
                }
                table {
                  tbody {
                    tr {
                      td {
                        cursor: pointer;
                      }
                      .selected {
                        background-color: rgba(204, 204, 204, 0.8);
                      }
                      .disable {
                        /* background-color: rgba(204, 204, 204, 0.8); */
                        opacity: 0.5;
                      }
                    }
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

export default FrmChamCong;

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
  getAllNhanVienRoute,
  getAssignmentByNhanVienRoute,
  getAssignmentsRoute,
  getShiftsOrderGioBatDauRoute,
  getShiftsRoute,
} from "../../utils/APIRoutes";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function FrmXemLich() {
  const [toast, setToast] = useState(null);
  const [dsNhanVien, setDsNhanVien] = useState([]);
  const [dsCa, setDsCa] = useState([]);
  const [nhanVienSelected, setNhanVienSelected] = useState({});
  const [bangPhanCong, setBangPhanCong] = useState({});
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    loadBangPhanCongTheoNhanVien();
    loadNhanVien();
    loadCaFromDB();
  }, []);
  const loadNhanVien = async () => {
    const thongTinNhanVien = localStorage.getItem("nhanVien");
    const nhanVien = JSON.parse(thongTinNhanVien);
    if (nhanVien && nhanVien.maNhanVien) {
      setNhanVienSelected(nhanVien);
    } else {
      setNhanVienSelected({});
    }
  };
  const loadCaFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(
      `${getShiftsOrderGioBatDauRoute}`,
      {},
      config
    );
    if (data && data.length > 0) {
      setDsCa(data);
    }
  };
  const loadBangPhanCongTheoNhanVien = async () => {
    const thongTinNhanVien = localStorage.getItem("nhanVien");
    const nhanVien = JSON.parse(thongTinNhanVien);
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.post(
      `${getAssignmentByNhanVienRoute}`,
      Number(nhanVien.maNhanVien),
      config
    );
    console.log(data);
    if (data) {
      setBangPhanCong(data);
    }
  };
  //   console.log([0, 1, 2, 3, 4].includes(0));
  const isCaSelected = (maCa, index) => {
    if (bangPhanCong && bangPhanCong.dsChiTietPhanCong) {
      //   console.log(bangPhanCong, index);
      for (let i = 0; i < bangPhanCong.dsChiTietPhanCong.length; i++) {
        if (
          bangPhanCong.dsChiTietPhanCong[i].thu.includes(index) &&
          bangPhanCong.dsChiTietPhanCong[i].caLamViec.maCa == maCa
        ) {
          //   console.log(
          //     bangPhanCong.dsChiTietPhanCong[i].thu,
          //     bangPhanCong.dsChiTietPhanCong[i].thu.includes(index),
          //     bangPhanCong.dsChiTietPhanCong[i].caLamViec.maCa === maCa,
          //     index,
          //     maCa
          //   );
          return true;
        }
      }
    }
    // if (checkBangPhanCongSelect && checkBangPhanCongSelect.length > 0) {
    //   for (let i = 0; i < checkBangPhanCongSelect.length; i++) {
    //     if (
    //       checkBangPhanCongSelect[i].maCa == maCa &&
    //       checkBangPhanCongSelect[i].thu.includes(index)
    //     ) {
    //       return true;
    //     }
    //   }
    // }
    return false;
  };
  const onHandleSelectCa = (maCa, index, gioBatDau, gioKetThuc) => {
    // console.log(bangPhanCong);
    // console.log(maCa, index);
    if (!isConflictTime(gioBatDau, gioKetThuc, index)) {
      let temp = JSON.parse(JSON.stringify(bangPhanCong));
      if (temp && temp.dsChiTietPhanCong) {
        for (let i = 0; i < temp.dsChiTietPhanCong.length; i++) {
          // console.log(temp.dsChiTietPhanCong[i].caLamViec.maCa);
          if (temp.dsChiTietPhanCong[i].caLamViec.maCa === maCa) {
            if (temp.dsChiTietPhanCong[i].thu.includes(index)) {
              if (temp.dsChiTietPhanCong[i].thu.length === 1) {
                if (temp.dsChiTietPhanCong.length === 1) {
                  temp = {
                    nhanVien: nhanVienSelected,
                    ngayPhanCong: new Date(temp.ngayPhanCong),
                    ngayBatDau: new Date(temp.ngayBatDau),
                    maBangPhanCong: temp.maBangPhanCong,
                    ngayChinhSua: new Date(),
                  };
                } else {
                  temp.dsChiTietPhanCong[i].thu = [];
                }
                break;
              } else {
                temp.dsChiTietPhanCong[i].thu.splice(
                  temp.dsChiTietPhanCong[i].thu.indexOf(index),
                  1
                );
              }
            } else {
              temp.dsChiTietPhanCong[i].thu = [
                ...temp.dsChiTietPhanCong[i].thu,
                index,
              ];
            }
            break;
          } else if (i === temp.dsChiTietPhanCong.length - 1) {
            temp.dsChiTietPhanCong[i + 1] = {
              maChiTietPhanCong: 0,
              caLamViec: {
                maCa: maCa,
                gioBatDau: "",
                gioKetThuc: "",
                soGio: 3.5,
                tenCa: "",
              },
              thu: [index],
            };
            //   console.log(temp);
          }
        }
        // console.log(temp);
      } else if (
        nhanVienSelected &&
        nhanVienSelected.nhanvien &&
        nhanVienSelected.nhanvien.maNhanVien
      ) {
        temp = {
          maBangPhanCong: 0,
          ngayPhanCong: new Date(),
          ngayBatDau: new Date(bangPhanCong.ngayBatDau),
          ngayChinhSua: new Date(),
          nhanVien: nhanVienSelected,
          dsChiTietPhanCong: [
            {
              maChiTietPhanCong: 0,
              caLamViec: {
                maCa: maCa,
                gioBatDau: "",
                gioKetThuc: "",
                soGio: 3.5,
                tenCa: "",
              },
              thu: [index],
            },
          ],
        };
      }
      setBangPhanCong(temp);
    }
  };
  const isConflictTime = (gioBatDau, gioKetThuc, index) => {
    if (bangPhanCong && bangPhanCong.dsChiTietPhanCong) {
      for (let i = 0; i < bangPhanCong.dsChiTietPhanCong.length; i++) {
        if (bangPhanCong.dsChiTietPhanCong[i].thu.includes(index)) {
          let dateIn1 = new Date("2023-04-04T" + gioBatDau).getTime();
          let dateIn2 = new Date("2023-04-04T" + gioKetThuc).getTime();
          let date1 = new Date(
            "2023-04-04T" +
              bangPhanCong.dsChiTietPhanCong[i].caLamViec.gioBatDau
          ).getTime();
          let date2 = new Date(
            "2023-04-04T" +
              bangPhanCong.dsChiTietPhanCong[i].caLamViec.gioKetThuc
          ).getTime();
          //   console.log(dateIn1, dateIn2, date1, date2);
          if (
            (date1 < dateIn1 && dateIn1 < date2) ||
            (date1 < dateIn2 && dateIn2 < date2) ||
            (dateIn1 < date1 && date1 < dateIn2) ||
            (dateIn1 < date2 && date2 < dateIn2)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };
  console.log(bangPhanCong);
  const onHandleSearch = async () => {};

  const onHandleSave = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    bangPhanCong.ngayChinhSua = new Date();
    let dsCTPC = [];
    for (let i = 0; i < bangPhanCong.dsChiTietPhanCong.length; i++) {
      dsCTPC = [
        ...dsCTPC,
        {
          maCa: bangPhanCong.dsChiTietPhanCong[i].caLamViec.maCa,
          thu: bangPhanCong.dsChiTietPhanCong[i].thu,
          maChiTietPhanCong:
            bangPhanCong.dsChiTietPhanCong[i].maChiTietPhanCong,
        },
      ];
    }
    let reqData = {
      maBangPhanCong: bangPhanCong.maBangPhanCong,
      ngayChinhSua: new Date(),
      ngayPhanCong: new Date(bangPhanCong.ngayPhanCong),
      ngayBatDau: bangPhanCong.ngayBatDau
        ? new Date(bangPhanCong.ngayBatDau)
        : new Date(),
      maNhanVien: nhanVienSelected.nhanvien.maNhanVien,
      dsChiTietPhanCong: dsCTPC,
    };
    console.log(reqData);

    const { data } = await axios.post(`${addAssignment}`, reqData, config);
    if (data) {
      setBangPhanCong(data);
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
  //   console.log(dsNhanVien);
  //   console.log(dsCa[0].gioBatDau);
  //   console.log(isCaSelected(1, 0));
  // console.log(bangPhanCong);
  const getCaDisplay = (ca, index) => {
    if (isCaSelected(ca.maCa, index)) {
      return (
        <td>
          <b>
            {ca.maCa} - {ca.tenCa}
          </b>{" "}
          <br></br>Thời gian:{" "}
          <b>{formatTime(new Date("2023-04-04T" + ca.gioBatDau))}</b> -
          <b>{formatTime(new Date("2023-04-04T" + ca.gioKetThuc))}</b> <br></br>
          Số giờ: {ca.soGio}
        </td>
      );
    }
    if (isConflictTime(ca.gioBatDau, ca.gioKetThuc, index))
      return (
        <td
          className="disable"
          onClick={() =>
            onHandleSelectCa(ca.maCa, index, ca.gioBatDau, ca.gioKetThuc)
          }
        >
          <b>
            {ca.maCa} - {ca.tenCa}
          </b>{" "}
          <br></br>Thời gian:{" "}
          <b>{formatTime(new Date("2023-04-04T" + ca.gioBatDau))}</b> -
          <b>{formatTime(new Date("2023-04-04T" + ca.gioKetThuc))}</b> <br></br>
          Số giờ: {ca.soGio}
        </td>
      );
    return <td></td>;
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
  const formatDateOnly = (date) => {
    let month = date.getMonth() + 1;
    let monthStr = month + "";
    if (month < 10) {
      monthStr = "0" + month;
    }
    let dateDis = date.getDate();
    if (dateDis < 10) {
      dateDis = "0" + dateDis;
    }
    return [dateDis, monthStr, date.getFullYear()].join("/");
  };
  const isDate = (myDate) => {
    return myDate.constructor.toString().indexOf("Date") > -1;
  };
  const onHandeChangeDate = (date, name) => {
    setBangPhanCong({ ...bangPhanCong, [name]: dayjs(date).toDate() });
  };
  return (
    <StyledContainer>
      <div className="container">
        <h1>Xem lịch làm việc</h1>
        <div className="content">
          <div className="booking-detail">
            <h3>Lịch phân công</h3>
            <div className="content-detail">
              <div className="guest-info">
                <div className="info-content">
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
                  <br></br> - Ngày bắt đầu:{" "}
                  <b>
                    {bangPhanCong &&
                      bangPhanCong.ngayBatDau &&
                      formatDateOnly(
                        bangPhanCong.ngayBatDau &&
                          isDate(bangPhanCong.ngayBatDau)
                          ? bangPhanCong.ngayBatDau
                          : new Date(bangPhanCong.ngayBatDau)
                      )}
                  </b>
                </div>
              </div>
              <div className="room-info">
                <h4>Lịch biểu</h4>
                <div className="info-content">
                  <div className="phong-container">
                    <Table bordered={true}>
                      <thead>
                        <tr>
                          <th>Thứ 2</th>
                          <th>Thứ 3</th>
                          <th>Thứ 4</th>
                          <th>Thứ 5</th>
                          <th>Thứ 6</th>
                          <th>Thứ 7</th>
                          <th>Chủ nhật</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dsCa &&
                          dsCa.length > 0 &&
                          dsCa.map((ca, index) => {
                            //   isCaSelected(ca.maCa, 0) ? "selected" : ""
                            return (
                              <tr key={index}>
                                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                                  return getCaDisplay(ca, i);
                                })}
                              </tr>
                            );
                          })}
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
            <div className="btn-function"></div>
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
                        /* cursor: pointer; */
                        width: 50px;
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

export default FrmXemLich;

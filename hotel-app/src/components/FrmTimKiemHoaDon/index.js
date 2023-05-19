import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  Container,
  Toast,
  ToastContainer,
  Table,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";
import { getAllBillsRoute, getSearchBillsRoute } from "../../utils/APIRoutes";
import ChiTietHoaDon from "./components/ChiTietHoaDon";

function FrmTimKiemHoaDon() {
  const [hoaDonSelected, setHoaDonSelected] = useState(undefined);
  const [dsHoaDon, setDsHoaDon] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHour, setTotalHour] = useState(0);
  const [totalRoomPrice, setTotalRoomPrice] = useState(0);
  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [search, setSearch] = useState([
    {
      theo: "Theo mã hóa đơn",
      keyword: "",
    },
    {
      theo: "Theo cccd",
      keyword: "",
    },
  ]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (hoaDonSelected) {
      let price = 0;
      let ngayNhan = new Date();
      let ngayTra = new Date();
      if (hoaDonSelected.ngayNhanPhong) {
        ngayNhan = new Date(hoaDonSelected.ngayNhanPhong);
      }
      if (hoaDonSelected.ngayTraPhong) {
        ngayTra = new Date(hoaDonSelected.ngayTraPhong);
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
    }
  }, [hoaDonSelected]);

  const diff_hours = (dt2, dt1) => {
    const millisecondsPerHour = 1000 * 60 * 60;
    const differenceInMilliseconds = dt1 - dt2;
    const totalHours = Math.ceil(
      differenceInMilliseconds / millisecondsPerHour
    );
    // console.log('totalHours', totalHours);
    return totalHours;
  };
  const handleOnChangePhong = (e) => {
    let tempSearch = [...search];
    if (search.length === 0) {
      setSearch([{ theo: e.target.name, keyword: e.target.value }]);
      return;
    }
    for (let i = 0; i < search.length; i++) {
      if (search[i].theo === e.target.name) {
        tempSearch.splice(i, 1);
        tempSearch = [
          ...tempSearch,
          { theo: e.target.name, keyword: e.target.value },
        ];
        setSearch(tempSearch);
        return;
      }
      if (i === search.length - 1) {
        tempSearch = [
          ...tempSearch,
          { theo: e.target.name, keyword: e.target.value },
        ];
        setSearch(tempSearch);
      }
    }
  };

  // const handleOnSelect = (name, e) => {
  //   let tempSearch = [...search];
  //   if (search.length === 0) {
  //     setSearch([{ theo: name, keyword: e.target.value }]);
  //     return;
  //   }
  //   for (let i = 0; i < search.length; i++) {
  //     if (search[i].theo === name) {
  //       tempSearch.splice(i, 1);
  //       tempSearch = [...tempSearch, { theo: name, keyword: e.target.value }];
  //       setSearch(tempSearch);
  //       return;
  //     }
  //     if (i === search.length - 1) {
  //       tempSearch = [...tempSearch, { theo: name, keyword: e.target.value }];
  //       setSearch(tempSearch);
  //     }
  //   }
  // };

  // const handleOnSelectBoolean = (name, e) => {
  //   setPhongMoi({ ...phongMoi, [name]: e.target.value === "true" });
  // };

  // const onHandleClear = () => {
  //   setSearch([]);
  // };

  // useEffect(() => {
  //   if (phongSelected) {
  //     setPhongMoi(phongSelected);
  //   } else {
  //     setPhongMoi({});
  //   }
  // }, [phongSelected]);
  const onHandleSearch = async () => {
    const { data } = await axios.post(getSearchBillsRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    setDsHoaDon(data);
  };

  const onHandleRefresh = () => {
    loadHoaDonFromDB();
  };

  useEffect(() => {
    loadHoaDonFromDB();
  }, []);
  const loadHoaDonFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getAllBillsRoute}`, {}, config);
    setDsHoaDon(data);
  };
  const isDate = (myDate) => {
    return myDate.constructor.toString().indexOf("Date") > -1;
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
    let dateStr = date.getDate() + "";
    if (date.getDate() < 10) {
      dateStr = "0" + date.getDate();
    }
    return (
      [dateStr, monthStr, date.getFullYear()].join("/") +
      " " +
      [date.getHours(), min].join(":")
    );
  };
  // console.log("searchPhong:", search);
  return (
    <StyleContainer>
      <h1>Tìm kiếm hóa đơn</h1>
      <div className="container">
        <div className="input-container">
          <div className="field-container">
            <Container fluid>
              <Row>
                <Col>
                  <Form.Label htmlFor="inputMaPhong">Mã hóa đơn:</Form.Label>
                  <Form.Control
                    type="text"
                    id="inputMaPhong"
                    name="Theo mã hóa đơn"
                    onChange={(e) => handleOnChangePhong(e)}
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="inputTenPhong">
                    Căn cước công dân khách hàng:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="inputTenPhong"
                    name="Theo cccd"
                    onChange={(e) => handleOnChangePhong(e)}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          <div className="btn-container">
            <Button variant="primary" onClick={() => onHandleSearch()}>
              Tìm
            </Button>
            {/* <Button variant="danger" onClick={() => onHandleClear()}>
              Xóa rỗng
            </Button> */}
            <Button variant="warning" onClick={() => onHandleRefresh()}>
              <BiRefresh />
            </Button>
          </div>
        </div>
        <div className="table-container">
          <Table striped hover>
            <thead>
              <tr>
                <th>Mã hóa đơn</th>
                <th>Ngày lập hóa đơn</th>
                <th>Ngày nhận phòng</th>
                <th>Ngày trả phòng</th>
                <th>CCCD khách hàng</th>
                <th>Tên khách hàng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {dsHoaDon &&
                dsHoaDon !== [] &&
                dsHoaDon.map((hoaDon, index) => {
                  // console.log(isSelected(room));
                  return (
                    <tr
                      key={index}
                      className={`${
                        hoaDonSelected &&
                        hoaDonSelected &&
                        hoaDonSelected.maHoaDon === hoaDon.maHoaDon
                          ? "row-selected"
                          : ""
                      }`}
                      onClick={() => setHoaDonSelected(hoaDon)}
                    >
                      <td>{hoaDon.maHoaDon}</td>
                      <td>
                        {hoaDon.ngayLap && isDate(hoaDon.ngayLap)
                          ? formatDate(hoaDon.ngayLap)
                          : formatDate(new Date(hoaDon.ngayLap))}
                      </td>
                      <td>
                        {hoaDon.ngayNhanPhong && isDate(hoaDon.ngayNhanPhong)
                          ? formatDate(hoaDon.ngayNhanPhong)
                          : formatDate(new Date(hoaDon.ngayNhanPhong))}
                      </td>
                      <td>
                        {hoaDon.ngayTraPhong && isDate(hoaDon.ngayTraPhong)
                          ? formatDate(hoaDon.ngayTraPhong)
                          : formatDate(new Date(hoaDon.ngayTraPhong))}
                      </td>
                      <td>{hoaDon.khachHang.cccdKhachHang}</td>
                      <td>{hoaDon.khachHang.hoTen}</td>
                      <td>
                        {hoaDon.tienNhan > 0 ? "Hoàn tất" : "Chưa thanh toán"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
      {hoaDonSelected && (
        <ChiTietHoaDon
          totalPrice={totalPrice}
          hoaDonSelected={hoaDonSelected}
          setHoaDonSelected={setHoaDonSelected}
          formatDate={formatDate}
          totalHour={totalHour}
          totalRoomPrice={totalRoomPrice}
          totalServicePrice={totalServicePrice}
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
    </StyleContainer>
  );
}

const StyleContainer = styled.div`
  height: 100%;
  h1 {
    height: 8%;
    margin: 0;
    text-align: center;
  }
  .container {
    height: 92%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
    .input-container {
      display: flex;
      flex-direction: column;
      height: 25%;
      overflow-y: auto;
      justify-content: space-between;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      padding: 0.5rem;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-image: linear-gradient(#373b44, #1095c1);
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .field-container {
        width: 100%;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        align-items: center;
        button {
          height: 40px;
          /* padding-inline: 2rem; */
          width: 150px;
        }
        input {
          min-width: 150px;
        }
        select {
          min-width: 150px;
        }
      }
      .btn-container {
        display: flex;
        gap: 1.5rem;
        button {
          padding: 0.5rem 1.5rem;
          svg {
            font-size: 1.5rem;
          }
        }
      }
    }
    .table-container {
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      padding: 0.5rem;
      height: 70%;
      display: flex;
      flex-direction: column;
      position: relative;
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
    }
  }
`;

export default FrmTimKiemHoaDon;

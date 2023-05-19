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
import {
  findRoomRoute,
  getFloorsRoute,
  getRoomsRoute,
  getRoomTypesRoute,
} from "../../utils/APIRoutes";


function FrmTimKiemPhong() {
  const [phongSelected, setPhongSelected] = useState(undefined);
  const [showImageSelect, setShowImageSelect] = useState(undefined);
  const [dsPhong, setDsPhong] = useState(undefined);
  const [search, setSearch] = useState([
    {
      theo: "Theo mã",
      keyword: "",
    },
    {
      theo: "Theo tên",
      keyword: "",
    },
    {
      theo: "Theo tầng",
      keyword: "",
    },
    {
      theo: "Theo loại phòng",
      keyword: "",
    },
  ]);
  const [phongMoi, setPhongMoi] = useState({});
  const [tempTang, setTempTang] = useState([]);
  const [tempLoaiPhong, setTempLoaiPhong] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadRelateData();
  }, [setPhongMoi]);
  const loadRelateData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const dataTang = await axios.get(`${getFloorsRoute}`, {}, config);
    setTempTang(dataTang.data);
    const dataLoaiPhong = await axios.get(`${getRoomTypesRoute}`, {}, config);
    setTempLoaiPhong(dataLoaiPhong.data);
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

  const handleOnSelect = (name, e) => {
    let tempSearch = [...search];
    if (search.length === 0) {
      setSearch([{ theo: name, keyword: e.target.value }]);
      return;
    }
    for (let i = 0; i < search.length; i++) {
      if (search[i].theo === name) {
        tempSearch.splice(i, 1);
        tempSearch = [...tempSearch, { theo: name, keyword: e.target.value }];
        setSearch(tempSearch);
        return;
      }
      if (i === search.length - 1) {
        tempSearch = [...tempSearch, { theo: name, keyword: e.target.value }];
        setSearch(tempSearch);
      }
    }
  };

  const handleOnSelectBoolean = (name, e) => {
    setPhongMoi({ ...phongMoi, [name]: e.target.value === "true" });
  };

  const onHandleClear = () => {
    setSearch([]);
  };

  useEffect(() => {
    if (phongSelected) {
      setPhongMoi(phongSelected);
    } else {
      setPhongMoi({});
    }
  }, [phongSelected]);
  const onHandleSearch = async () => {
    const { data } = await axios.post(findRoomRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    setDsPhong(data);
  };

  const onHandleRefresh = () => {
    loadPhongFromDB();
  };

  useEffect(() => {
    loadPhongFromDB();
  }, []);
  const loadPhongFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getRoomsRoute}`, {}, config);
    setDsPhong(data);
  };
  console.log('searchPhong:', search);
  return (
    <StyleContainer>
      <h1>Tìm kiếm phòng</h1>
      <div className="container">
        <div className="input-container">
          <div className="field-container">
            <Container fluid>
              <Row>
                <Col>
                  <Form.Label htmlFor="inputMaPhong">Mã phòng:</Form.Label>
                  <Form.Control
                    type="text"
                    id="inputMaPhong"
                    name="Theo mã"
                    onChange={(e) => handleOnChangePhong(e)}
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="inputTenPhong">Tên phòng:</Form.Label>
                  <Form.Control
                    type="text"
                    id="inputTenPhong"
                    name="Theo tên"
                    onChange={(e) => handleOnChangePhong(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="inputTang">Tầng:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    id="inputTang"
                    onChange={(e) => handleOnSelect("Theo tầng", e)}
                  >
                    <option value={``}>Không chọn</option>
                    {tempTang &&
                      tempTang.length > 0 &&
                      tempTang.map((tang, index) => {
                        return (
                          <option value={`${tang.maTang}`} key={index}>
                            {tang.tenTang}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label htmlFor="inputLoaiPhong">Loại phòng:</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    id="inputLoaiPhong"
                    onChange={(e) => handleOnSelect("Theo loại phòng", e)}
                  >
                    <option value={``}>Không chọn</option>
                    {tempLoaiPhong &&
                      tempLoaiPhong.length > 0 &&
                      tempLoaiPhong.map((loaiPhong, index) => {
                        return (
                          <option
                            value={`${loaiPhong.maLoaiPhong}`}
                            key={index}
                          >
                            {loaiPhong.tenLoaiPhong}
                          </option>
                        );
                      })}
                  </Form.Select>
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
                <th>Mã phòng</th>
                <th>Tên phòng</th>
                <th>Loại phòng</th>
                <th>Tầng</th>
                <th>Giá</th>
                <th>Số giường</th>
                <th>Sức chứa</th>
                <th>Được hút thuốc</th>
                <th>Mang thú cưng</th>
                <th>Mô tả phòng</th>
              </tr>
            </thead>
            <tbody>
              {dsPhong &&
                dsPhong !== [] &&
                dsPhong.map((phongDto, index) => {
                  // console.log(isSelected(room));
                  return (
                    <tr
                      key={index}
                      className={`${phongSelected &&
                        phongSelected &&
                        phongSelected.maPhong === phongDto.maPhong
                        ? "row-selected"
                        : ""
                        }`}
                    >
                      <td>{phongDto.maPhong}</td>
                      <td>{phongDto.tenPhong}</td>
                      <td>{phongDto.tenLoaiPhong}</td>
                      <td>{phongDto.tenTang}</td>
                      <td>{phongDto.giaPhong.toLocaleString()}</td>
                      <td>{phongDto.soGiuong}</td>
                      <td>{phongDto.sucChua}</td>
                      <td>{phongDto.duocHutThuoc ? "Có" : "Không"}</td>
                      <td>{phongDto.mangThuCung ? "Có" : "Không"}</td>
                      <td>{phongDto.moTaPhong}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
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
      height: 35%;
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
      height: 60%;
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

export default FrmTimKiemPhong;

import {
  Button,
  Container,
  FloatingLabel,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";
import { useEffect, useState } from "react";
import { getFloorsRoute, getRoomTypesRoute } from "../../../utils/APIRoutes";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

function Inputs({
  phongMoi,
  tempTang,
  tempLoaiPhong,
  setShowFrmLoaiPhong,
  setPhongMoi,
  setTempTang,
  setTempLoaiPhong,
  setShowImageSelect,
  onHandleAdd,
  onHandleUpdate,
  onHandleRefresh,
}) {
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
    let tenField = e.target.name;
    if (tenField === "tenPhong") {
      let tenTang = "";
      for (let i = 0; i < tempTang.length; i++) {
        if (Number(phongMoi.maTang) === tempTang[i].maTang) {
          tenTang = tempTang[i].tenTang;
          break;
        }
      }
      let soTang = Number(!tenTang || tenTang === "" ? 1 : tenTang.slice(5));

      if (soTang < 10) {
        soTang = "0" + soTang;
      }
      let soPhong = Number(e.target.value.slice(6));
      if (!isNaN(soPhong)) {
        if (soPhong < 10) {
          soPhong = "0" + soPhong;
        }
        setPhongMoi({
          ...phongMoi,
          [tenField]: e.target.value,
          maPhong: `${soTang}${soPhong}`,
        });
      }
    } else {
      setPhongMoi({
        ...phongMoi,
        [tenField]: e.target.value,
      });
    }
  };

  const handleOnSelect = (name, e) => {
    if (name === "maTang") {
      let tenTang = "";
      for (let i = 0; i < tempTang.length; i++) {
        if (Number(e.target.value) === tempTang[i].maTang) {
          tenTang = tempTang[i].tenTang;
          break;
        }
      }
      let soTang = Number(tenTang.slice(5));
      if (soTang < 10) {
        soTang = "0" + soTang;
      }
      let soPhong = phongMoi.tenPhong ? phongMoi.tenPhong.slice(6) : "000";
      setPhongMoi({
        ...phongMoi,
        [name]: e.target.value,
        maPhong: `${soTang}${soPhong}`,
      });
    } else {
      setPhongMoi({
        ...phongMoi,
        [name]: e.target.value,
      });
    }
  };

  const handleOnSelectBoolean = (name, e) => {
    setPhongMoi({ ...phongMoi, [name]: e.target.value === "true" });
  };

  const onHandleClear = () => {
    setPhongMoi({});
  };
  console.log("Phòng mới :", phongMoi);
  return (
    <StyledContainer>
      <div className="field-container">
        <Container fluid>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Mã phòng"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Mã phòng"
                  name="maPhong"
                  disabled={true}
                  value={
                    phongMoi && phongMoi.maPhong && phongMoi.maPhong != 0
                      ? phongMoi.maPhong
                      : ""
                  }
                  onChange={(e) => handleOnChangePhong(e)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Tên phòng"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Tên phòng"
                  name="tenPhong"
                  value={
                    phongMoi &&
                    phongMoi.tenPhong &&
                    phongMoi.tenPhong.slice(0, 6) === "Phòng "
                      ? phongMoi.tenPhong
                      : "Phòng "
                  }
                  onChange={(e) => handleOnChangePhong(e)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Mô tả phòng"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Mô tả phòng"
                  name="moTaPhong"
                  value={
                    phongMoi && phongMoi.moTaPhong ? phongMoi.moTaPhong : ""
                  }
                  onChange={(e) => handleOnChangePhong(e)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Giá phòng"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Giá phòng"
                  name="giaPhong"
                  min={0}
                  value={phongMoi && phongMoi.giaPhong ? phongMoi.giaPhong : 0}
                  onChange={(e) => handleOnChangePhong(e)}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Được hút thuốc"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleOnSelectBoolean("duocHutThuoc", e)}
                >
                  <option value={true} selected={phongMoi.duocHutThuoc}>
                    Có
                  </option>
                  <option value={false} selected={!phongMoi.duocHutThuoc}>
                    Không
                  </option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Mang thú cưng"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleOnSelectBoolean("mangThuCung", e)}
                >
                  <option value={true} selected={phongMoi.mangThuCung}>
                    Có
                  </option>
                  <option value={false} selected={!phongMoi.mangThuCung}>
                    Không
                  </option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Tầng"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleOnSelect("maTang", e)}
                >
                  {tempTang &&
                    tempTang.length !== 0 &&
                    tempTang.map((tang, index) => {
                      return (
                        <option
                          value={`${tang.maTang}`}
                          key={index}
                          selected={
                            phongMoi.maTang && phongMoi.maTang == tang.maTang
                          }
                        >
                          {tang.tenTang}
                        </option>
                      );
                    })}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <div className="input-LoaiPhong-container">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Loại phòng"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => handleOnSelect("maLoaiPhong", e)}
                  >
                    {tempLoaiPhong &&
                      tempLoaiPhong.length !== 0 &&
                      tempLoaiPhong.map((loaiPhong, index) => {
                        return (
                          <option
                            value={`${loaiPhong.maLoaiPhong}`}
                            key={index}
                            selected={
                              phongMoi.maLoaiPhong &&
                              phongMoi.maLoaiPhong == loaiPhong.maLoaiPhong
                            }
                          >
                            {loaiPhong.tenLoaiPhong}
                          </option>
                        );
                      })}
                  </Form.Select>
                </FloatingLabel>
                <Button
                  variant="success"
                  onClick={() => setShowFrmLoaiPhong(true)}
                >
                  <AiOutlinePlus />
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Số giường"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Số giường"
                  name="soGiuong"
                  min={1}
                  value={phongMoi && phongMoi.soGiuong ? phongMoi.soGiuong : 1}
                  onChange={(e) => handleOnChangePhong(e)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Sức chứa"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Sức chứa"
                  name="sucChua"
                  min={1}
                  value={phongMoi && phongMoi.sucChua ? phongMoi.sucChua : 1}
                  onChange={(e) => handleOnChangePhong(e)}
                />
              </FloatingLabel>
            </Col>

            <Col>
              <Button
                variant="success"
                onClick={() => setShowImageSelect(true)}
              >
                Xem hình (
                {phongMoi.hinhAnhPhong && phongMoi.hinhAnhPhong.length
                  ? phongMoi.hinhAnhPhong.length
                  : 0}
                )
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
      <div className="btn-container">
        <Button variant="success" onClick={() => onHandleAdd()}>
          Thêm
        </Button>
        <Button variant="primary" onClick={() => onHandleUpdate()}>
          Cập nhật
        </Button>
        <Button variant="danger" onClick={() => onHandleClear()}>
          Xóa rỗng
        </Button>
        <Button variant="warning" onClick={() => onHandleRefresh()}>
          <BiRefresh />
        </Button>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 45%;
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
    .input-LoaiPhong-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      select {
        width: 190px;
      }
      button {
        width: 40px;
      }
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
`;

export default Inputs;

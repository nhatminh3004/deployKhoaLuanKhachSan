import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";
import {
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";

function Inputs({
  caMoi,
  setCaMoi,
  onHandleAdd,
  onHandleUpdate,
  onHandleRefresh,
  formatTime,
}) {
  // useEffect(() => {
  //   setTempGioBatDau(caMoi.gioBatDau);
  // }, [caMoi]);
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };
  const handleOnChange = (e) => {
    // console.log(tempGioBatDau);
    // console.log(typeof Number(e.target.value));
    if (e.target.name === "soGio") {
      if (typeof Number(e.target.value) === "number") {
        // const tempGioBatDau = caMoi.gioBatDau;
        let caMoiTemp = JSON.parse(JSON.stringify(caMoi));
        // console.log(caMoiTemp);
        let dateTemp = new Date(caMoiTemp.gioBatDau);
        if (dayjs.isDayjs(dateTemp)) {
          // console.log("dayjs");
          setCaMoi({
            ...caMoi,
            gioKetThuc: dayjs(dateTemp)
              .toDate()
              .addHours(Number(e.target.value)),
            [e.target.name]: Number(e.target.value),
            // gioBatDau: caMoiTemp.gioBatDau,
          });
        } else if (isDate(dateTemp)) {
          // console.log("date");
          setCaMoi({
            ...caMoi,
            gioKetThuc: dateTemp.addHours(Number(e.target.value)),
            [e.target.name]: Number(e.target.value),
            // gioBatDau: caMoiTemp.gioBatDau,
          });
        } else {
          // console.log("string");
          setCaMoi({
            ...caMoi,
            gioKetThuc: new Date("2023-04-04T" + dateTemp).addHours(
              Number(e.target.value)
            ),
            [e.target.name]: Number(e.target.value),
            // gioBatDau: caMoiTemp.gioBatDau,
          });
        }
        // console.log(caMoiTemp);
        // console.log(tempGioBatDau);
        // setTempGioBatDau(caMoiTemp.gioBatDau);
        // setCaMoi(caMoiTemp);
      }
    } else {
      setCaMoi({ ...caMoi, [e.target.name]: e.target.value });
    }
  };

  const onHandleClear = () => {
    setCaMoi({
      maCa: 0,
      tenCa: "",
      gioBatDau: new Date(),
      gioKetThuc: new Date(),
      soGio: 0.0,
    });
  };
  const onHandleChangeDate = (date, name) => {
    // console.log(date);
    if (dayjs.isDayjs(date)) {
      setCaMoi({
        ...caMoi,
        [name]: dayjs(date).toDate(),
        gioKetThuc: dayjs(date).toDate().addHours(caMoi.soGio),
      });
    } else if (isDate(date)) {
      setCaMoi({
        ...caMoi,
        gioKetThuc: date.addHours(caMoi.soGio),
        [name]: date,
      });
    } else {
      setCaMoi({
        ...caMoi,
        gioKetThuc: new Date("2023-04-04T" + date).addHours(caMoi.soGio),
        [name]: new Date("2023-04-04T" + date),
      });
    }
  };
  const isDate = (myDate) => {
    return myDate.constructor.toString().indexOf("Date") > -1;
  };
  console.log(caMoi);
  return (
    <StyledContainer>
      <div className="input-container">
        <Container>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Mã Ca Làm Việc"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Mã Ca Làm Việc"
                  name="maCa"
                  disabled={true}
                  value={caMoi && caMoi.maCa != 0 ? caMoi.maCa : ""}
                  onChange={(e) => handleOnChange(e)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Tên ca làm việc"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Tên ca làm việc"
                  name="tenCa"
                  value={caMoi && caMoi.tenCa ? caMoi.tenCa : ""}
                  onChange={(e) => handleOnChange(e)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDateTimePicker"]}>
                  <MobileTimePicker
                    label="Giờ bắt đầu"
                    value={
                      caMoi.gioBatDau
                        ? dayjs.isDayjs(caMoi.gioBatDau)
                          ? caMoi.gioBatDau
                          : isDate(caMoi.gioBatDau)
                          ? dayjs(caMoi.gioBatDau)
                          : dayjs(new Date("2023-04-04T" + caMoi.gioBatDau))
                        : dayjs(new Date())
                    }
                    onChange={(date) => {
                      onHandleChangeDate(date, "gioBatDau");
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Số giờ"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Số giờ"
                  min={0}
                  name="soGio"
                  step={0.5}
                  value={caMoi.soGio}
                  onChange={(e) => handleOnChange(e)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Giờ kết thúc"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Giờ kết thúc"
                  name="gioKetThuc"
                  disabled={true}
                  value={
                    caMoi.gioKetThuc
                      ? dayjs.isDayjs(caMoi.gioKetThuc)
                        ? formatTime(dayjs(caMoi.gioKetThuc).toDate())
                        : isDate(caMoi.gioKetThuc)
                        ? formatTime(caMoi.gioKetThuc)
                        : formatTime(new Date("2023-04-04T" + caMoi.gioKetThuc))
                      : formatTime(new Date())
                  }
                  onChange={(e) => handleOnChange(e)}
                />
              </FloatingLabel>
            </Col>
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
  max-height: 45%;
  overflow-y: auto;
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
  .input-container {
    display: flex;
    gap: 1rem;
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

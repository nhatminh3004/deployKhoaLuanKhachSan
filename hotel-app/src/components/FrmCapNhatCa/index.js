import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  addShiftRoute,
  findShiftRoute,
  getShiftsRoute,
} from "../../utils/APIRoutes";
import Inputs from "./components/Inputs";
import Search from "./components/Search";
import TableData from "./components/TableData";

function FrmCapNhatCa() {
  const [caSelected, setCaSelected] = useState(undefined);
  const [dsCa, setDsCa] = useState([]);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [caMoi, setCaMoi] = useState({
    maCa: 0,
    tenCa: "",
    gioBatDau: new Date(),
    soGio: 0.0,
    gioKetThuc: new Date(),
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (caSelected) {
      setCaMoi(caSelected);
    } else {
      setCaMoi({
        maCa: 0,
        tenCa: "",
        gioBatDau: new Date(),
        soGio: 0.0,
        gioKetThuc: new Date(),
      });
    }
  }, [caSelected]);

  const onHandleAdd = async () => {
    if (caMoi.maCa === 0 && validate()) {
      // console.log(caMoi.gioBatDau);
      const { data } = await axios.post(addShiftRoute, caMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        // for (let i = 0; i < data.length; i++) {
        //   data[i].gioBatDau = new Date("2023-04-04T" + data[i].gioBatDau);
        //   data[i].gioKetthuc = new Date("2023-04-04T" + data[i].gioKetthuc);
        // }
        setDsCa(data);
        setCaSelected(undefined);
      }
    }
  };
  const isDate = (myDate) => {
    return myDate.constructor.toString().indexOf("Date") > -1;
  };
  const onHandleUpdate = async () => {
    if (caMoi.maCa !== 0) {
      if (!isDate(caMoi.gioBatDau)) {
        if (dayjs.isDayjs(caMoi.gioBatDau)) {
          caMoi.gioBatDau = dayjs(caMoi.gioBatDau).toDate();
        } else {
          caMoi.gioBatDau = new Date("2023-02-02T" + caMoi.gioBatDau);
        }
      }
      if (!isDate(caMoi.gioKetThuc)) {
        if (dayjs.isDayjs(caMoi.gioKetThuc)) {
          caMoi.gioKetThuc = dayjs(caMoi.gioKetThuc).toDate();
        } else {
          caMoi.gioKetThuc = new Date("2023-02-02T" + caMoi.gioKetThuc);
        }
      }
      // console.log(caMoi.gioBatDau);
      // console.log(caMoi.gioKetThuc);
      const { data } = await axios.post(addShiftRoute, caMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        // for (let i = 0; i < data.length; i++) {
        //   data[i].gioBatDau = new Date("2023-04-04T" + data[i].gioBatDau);
        //   data[i].gioKetthuc = new Date("2023-04-04T" + data[i].gioKetthuc);
        // }
        setDsCa(data);
        setCaSelected(undefined);
      }
    }
  };
  // console.log(dsCa);
  const validate = () => {
    const { tenCa } = caMoi;
    if (tenCa === "") {
      setToast({
        header: "Tên ca không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsCa.length; i++) {
      if (tenCa === dsCa[i].tenCa) {
        setToast({
          header: "Tên ca không được trùng",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return false;
      }
    }
    return true;
  };
  const onHandleSearch = async () => {
    const { data } = await axios.post(findShiftRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (data) {
      setDsCa(data);
      setCaSelected(undefined);
    }
  };

  const onHandleRefresh = () => {
    loadCaFromDB();
  };

  useEffect(() => {
    loadCaFromDB();
  }, []);
  const loadCaFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getShiftsRoute}`, {}, config);
    setDsCa(data);
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
  return (
    <StyleContainer>
      <h1>Quản lý Ca Làm Việc</h1>
      <div className="container">
        <Inputs
          caMoi={caMoi}
          setCaMoi={setCaMoi}
          onHandleAdd={onHandleAdd}
          onHandleUpdate={onHandleUpdate}
          onHandleRefresh={onHandleRefresh}
          formatTime={formatTime}
        />
        {/* <Search
          search={search}
          setSearch={setSearch}
          onHandleSearch={onHandleSearch}
        /> */}
        <TableData
          dsCa={dsCa}
          caSelected={caSelected}
          setCaSelected={setCaSelected}
          formatTime={formatTime}
          isDate={isDate}
        />
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
    align-items: stretch;
  }
`;

export default FrmCapNhatCa;

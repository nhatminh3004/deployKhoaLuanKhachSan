import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import {
  addRoomTypeRoute,
  findRoomTypeRoute,
  getRoomTypesRoute,
} from "../../utils/APIRoutes";
import { SlArrowLeft } from "react-icons/sl";
import Inputs from "./components/Inputs";
import Search from "./components/Search";
import TableData from "./components/TableData";

function FrmLoaiPhong({ setShowFrmLoaiPhong, setTempLoaiPhong }) {
  const [loaiPhongSelected, setLoaiPhongSelected] = useState(undefined);
  const [dsLoaiPhong, setDsLoaiPhong] = useState(undefined);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [loaiPhongMoi, setLoaiPhongMoi] = useState({
    maLoaiPhong: 0,
    tenLoaiPhong: "",
    moTaLoaiPhong: "",
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (loaiPhongSelected) {
      setLoaiPhongMoi(loaiPhongSelected);
    } else {
      setLoaiPhongMoi({
        maLoaiPhong: 0,
        tenLoaiPhong: "",
      });
    }
  }, [loaiPhongSelected]);

  const onHandleAdd = async () => {
    if (loaiPhongMoi.maLoaiPhong === 0 && validate()) {
      const { data } = await axios.post(addRoomTypeRoute, loaiPhongMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsLoaiPhong(data);
        setTempLoaiPhong(data);
        setLoaiPhongSelected(undefined);
      }
    }
  };
  const onHandleUpdate = async () => {
    if (loaiPhongMoi.maLoaiPhong !== 0 && validateUpdate()) {
      const { data } = await axios.post(addRoomTypeRoute, loaiPhongMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsLoaiPhong(data);
        setTempLoaiPhong(data);
        setLoaiPhongSelected(undefined);
      }
    }
  };

  const validateUpdate = () => {
    const { tenLoaiPhong, maLoaiPhong } = loaiPhongMoi;
    for (var i = 0; i < dsLoaiPhong.length; i++) {
      if (
        tenLoaiPhong === dsLoaiPhong[i].tenLoaiPhong &&
        maLoaiPhong === dsLoaiPhong[i].maLoaiPhong
      ) {
        setToast({
          header: "Tên loại phòng đã tồn tại",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return false;
      }
    }
    return true;
  };
  const validate = () => {
    const { tenLoaiPhong } = loaiPhongMoi;
    for (var i = 0; i < dsLoaiPhong.length; i++) {
      if (tenLoaiPhong === dsLoaiPhong[i].tenLoaiPhong) {
        setToast({
          header: "Tên loại phòng đã tồn tại",
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
    const { data } = await axios.post(findRoomTypeRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (data) {
      setDsLoaiPhong(data);
      setLoaiPhongSelected(undefined);
    }
  };

  const onHandleRefresh = () => {
    loadLoaiPhongFromDB();
  };

  useEffect(() => {
    loadLoaiPhongFromDB();
  }, []);
  const loadLoaiPhongFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getRoomTypesRoute}`, {}, config);
    setDsLoaiPhong(data);
    setTempLoaiPhong(data);
  };

  return (
    <StyleContainer>
      <h1>
        <div className="btn-back">
          <SlArrowLeft onClick={() => setShowFrmLoaiPhong(undefined)} />
        </div>{" "}
        Cập nhật loại phòng
      </h1>
      <div className="container">
        <Inputs
          loaiPhongMoi={loaiPhongMoi}
          setLoaiPhongMoi={setLoaiPhongMoi}
          onHandleAdd={onHandleAdd}
          onHandleUpdate={onHandleUpdate}
          onHandleRefresh={onHandleRefresh}
        />
        <Search
          search={search}
          setSearch={setSearch}
          onHandleSearch={onHandleSearch}
        />
        <TableData
          loaiPhongSelected={loaiPhongSelected}
          setLoaiPhongSelected={setLoaiPhongSelected}
          dsLoaiPhong={dsLoaiPhong}
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
  width: 75%;
  padding: 0.5rem;
  height: 95%;
  display: flex;
  flex-direction: column;
  text-align: start;
  background-color: #fff;
  position: relative;
  h1 {
    display: flex;
    gap: 1rem;
    height: 8%;
    margin: 0;
    text-align: left;
    padding-left: 1rem;
    svg {
      font-size: 1.8rem;
      cursor: pointer;
    }
  }
  .container {
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;

export default FrmLoaiPhong;

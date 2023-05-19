import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import {
  addFloorsRoute,
  checkFloorExistRoute,
  findFloorRoute,
  getFloorsRoute,
} from "../../utils/APIRoutes";
import Inputs from "./components/Inputs";
import Search from "./components/Search";
import TableData from "./components/TableData";

function FrmTang() {
  const [tangSelected, setTangSelected] = useState(undefined);
  const [dsTang, setDsTang] = useState(undefined);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [tangMoi, setTangMoi] = useState({
    maTang: 0,
    tenTang: "",
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (tangSelected) {
      setTangMoi(tangSelected);
    } else {
      setTangMoi({
        maTang: 0,
        tenTang: "",
      });
    }
  }, [tangSelected]);

  const onHandleAdd = async () => {
    if (tangMoi.maTang === 0 && validate()) {
      const { data } = await axios.post(addFloorsRoute, tangMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsTang(data);
        setTangSelected(undefined);
      }
    }
  };
  const onHandleUpdate = async () => {
    if (tangMoi.maTang !== 0 && validate()) {
      const { data } = await axios.post(addFloorsRoute, tangMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsTang(data);
        setTangSelected(undefined);
      }
    }
  };

  const validate = () => {
    const { tenTang } = tangMoi;
    if (tenTang === "") {
      setToast({
        header: "Tên tầng không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsTang.length; i++) {
      if (tenTang === dsTang[i].tenTang) {
        setToast({
          header: "Tên tầng không được trùng",
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
    const { data } = await axios.post(findFloorRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (data) {
      setDsTang(data);
      setTangSelected(undefined);
    }
  };

  const onHandleRefresh = () => {
    loadTangFromDB();
  };

  useEffect(() => {
    loadTangFromDB();
  }, []);
  const loadTangFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getFloorsRoute}`, {}, config);
    setDsTang(data);
  };

  return (
    <StyleContainer>
      <h1>Quản lý tầng</h1>
      <div className="container">
        <Inputs
          tangMoi={tangMoi}
          setTangMoi={setTangMoi}
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
          dsTang={dsTang}
          tangSelected={tangSelected}
          setTangSelected={setTangSelected}
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

export default FrmTang;

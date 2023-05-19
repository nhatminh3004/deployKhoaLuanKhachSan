import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import { findFloorRoute, getFloorsRoute } from "../../utils/APIRoutes";
import Search from "../FrmTang/components/Search";
import TableData from "../FrmTang/components/TableData";

function FrmTimKiemTang() {
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
      <h1>Tìm kiếm tầng</h1>
      <div className="container">
        <Search
          search={search}
          setSearch={setSearch}
          onHandleSearch={onHandleSearch}
          onHandleRefresh={onHandleRefresh}
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

export default FrmTimKiemTang;

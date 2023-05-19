import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";
import { findRoomTypeRoute, getRoomTypesRoute } from "../../utils/APIRoutes";
import Search from "../FrmThietBi/components/Search";
import TableData from "../FrmThietBi/components/TableData";

function FrmTimKiemLoaiPhong() {
  const [loaiPhongSelected, setLoaiPhongSelected] = useState(undefined);
  const [dsLoaiPhong, setDsLoaiPhong] = useState(undefined);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [loaiPhongMoi, setLoaiPhongMoi] = useState({
    maLoaiPhong: 0,
    tenLoaiPhong: "",
    sucChua: 0,
    soGiuong: 0,
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (loaiPhongSelected) {
      setLoaiPhongMoi(loaiPhongSelected);
    } else {
      setLoaiPhongMoi({
        maLoaiPhong: 0,
        tenLoaiPhong: "",
        sucChua: 0,
        soGiuong: 0,
      });
    }
  }, [loaiPhongSelected]);

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
  };

  return (
    <StyleContainer>
      <h1>Tìm loại phòng</h1>
      <div className="container">
        <Search
          search={search}
          setSearch={setSearch}
          onHandleSearch={onHandleSearch}
          onHandleRefresh={onHandleRefresh}
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

export default FrmTimKiemLoaiPhong;

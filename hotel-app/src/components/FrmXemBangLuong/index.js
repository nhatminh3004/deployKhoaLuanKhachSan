import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import { addPayrolls, getPayrollsByNhanVienRoute } from "../../utils/APIRoutes";
import Inputs from "./components/Inputs";
import TableData from "./components/TableData";
import ChiTietLuong from "./components/ChiTietLuong";

function FrmXemBangLuong() {
  const [bangLuongSelected, setBangLuongSelected] = useState(undefined);
  const [dsBangLuong, setDsBangLuong] = useState([]);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [requestData, setRequestData] = useState({
    thang: new Date().getMonth() + 1,
    nam: new Date().getFullYear(),
  });
  const [toast, setToast] = useState(null);
  useEffect(() => {
    loadDSBangLuong();
  }, []);
  const loadDSBangLuong = async () => {
    const thongTinNhanVien = localStorage.getItem("nhanVien");
    const nhanVien = JSON.parse(thongTinNhanVien);
    const { data } = await axios.post(
      getPayrollsByNhanVienRoute,
      nhanVien.maNhanVien,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    if (data && data.length !== []) {
      setDsBangLuong(data);
      setBangLuongSelected(undefined);
    }
  };
  const onHandleAdd = async () => {
    const { data } = await axios.post(addPayrolls, requestData, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (data && data.length !== []) {
      setDsBangLuong(data);
      setBangLuongSelected(undefined);
    }
  };
  console.log(bangLuongSelected);
  return (
    <StyleContainer>
      <h1>Xem bảng lương</h1>
      <div className="container">
        <TableData
          dsBangLuong={dsBangLuong}
          bangLuongSelected={bangLuongSelected}
          setBangLuongSelected={setBangLuongSelected}
        />
      </div>
      {bangLuongSelected && (
        <ChiTietLuong
          bangLuongSelected={bangLuongSelected}
          setBangLuongSelected={setBangLuongSelected}
          // onHandleChangeHinhAnhPhongFromTempPhong={
          //   onHandleChangeHinhAnhPhongFromTempPhong
          // }
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
    align-items: stretch;
  }
`;

export default FrmXemBangLuong;

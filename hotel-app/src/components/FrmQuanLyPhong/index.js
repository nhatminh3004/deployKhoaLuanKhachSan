import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import {
  addRoomRoute,
  deleteRoomRoute,
  findRoomRoute,
  getRoomsRoute,
} from "../../utils/APIRoutes";
import FrmLoaiPhong from "../FrmThietBi";
import ImageSelect from "./components/ImageSelect";
import Inputs from "./components/Inputs";
import Search from "./components/Search";
import TableData from "./components/TableData";

function FrmQuanLyPhong() {
  const [phongSelected, setPhongSelected] = useState(undefined);
  const [showImageSelect, setShowImageSelect] = useState(undefined);
  const [showFrmLoaiPhong, setShowFrmLoaiPhong] = useState(undefined);
  const [dsPhong, setDsPhong] = useState(undefined);
  const [maPhongCu, setMaPhongCu] = useState(undefined);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [phongMoi, setPhongMoi] = useState({});
  const [tempTang, setTempTang] = useState([]);
  const [tempLoaiPhong, setTempLoaiPhong] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (phongSelected) {
      setPhongMoi(phongSelected);
      setMaPhongCu(phongSelected.maPhong);
    } else {
      setPhongMoi({});
      setMaPhongCu(undefined);
    }
  }, [phongSelected]);

  const onHandleAdd = async () => {
    if (validate()) {
      let phongMoiTemp = {
        phong: {
          maPhong: phongMoi.maPhong,
          tenPhong: phongMoi.tenPhong,
          moTaPhong: phongMoi.moTaPhong ? phongMoi.moTaPhong : "",
          maLoaiPhong: phongMoi.maLoaiPhong || 1,
          maTang: phongMoi.maTang || 1,
          giaPhong: phongMoi.giaPhong || 0,
          sucChua: phongMoi.sucChua || 1,
          soGiuong: phongMoi.soGiuong || 1,
          duocHutThuoc: phongMoi.duocHutThuoc ? true : false,
          mangThuCung: phongMoi.mangThuCung ? true : false,
          trangThaiPhong: true,
          hinhAnhPhong: phongMoi.hinhAnhPhong || [],
        },
      };
      const res = await axios.post(addRoomRoute, phongMoiTemp, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (res.data) {
        setToast({
          header: `Thêm phòng thành công`,
          content: "",
          bg: "success",
          textColor: "#fff",
        });
        loadPhongFromDB();
        setPhongSelected(undefined);
      }
    }
  };
  const onHandleUpdate = async () => {
    if (phongMoi && phongMoi.maPhong && validateUpdate()) {
      let phongMoiTemp = {
        phong: {
          maPhong: phongMoi.maPhong,
          tenPhong: phongMoi.tenPhong,
          moTaPhong: phongMoi.moTaPhong ? phongMoi.moTaPhong : "",
          maLoaiPhong: phongMoi.maLoaiPhong || 1,
          maTang: phongMoi.maTang || 1,
          sucChua: phongMoi.sucChua || 1,
          soGiuong: phongMoi.soGiuong || 1,
          giaPhong: phongMoi.giaPhong || 0,
          duocHutThuoc: phongMoi.duocHutThuoc ? phongMoi.duocHutThuoc : false,
          mangThuCung: phongMoi.mangThuCung ? phongMoi.mangThuCung : false,
          trangThaiPhong: true,
          hinhAnhPhong: phongMoi.hinhAnhPhong || [],
        },
      };
      const { data } = await axios.post(addRoomRoute, phongMoiTemp, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data) {
        if (maPhongCu !== phongMoi.maPhong) {
          const res = await axios.post(
            deleteRoomRoute,
            { maPhongCu },
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
              },
            }
          );
          if (res.data) {
            setToast({
              header: `Cập nhật phòng thành công`,
              content: "",
              bg: "success",
              textColor: "#fff",
            });
            loadPhongFromDB();
            setMaPhongCu(undefined);
            setPhongSelected(undefined);
          }
        } else {
          setToast({
            header: `Cập nhật phòng thành công`,
            content: "",
            bg: "success",
            textColor: "#fff",
          });
          loadPhongFromDB();
          setMaPhongCu(undefined);
          setPhongSelected(undefined);
        }
      }
    }
  };

  const validate = () => {
    const { tenPhong, giaPhong, maPhong } = phongMoi;
    if (!tenPhong || tenPhong.slice(6).trim() === "") {
      setToast({
        header: `Tên phòng chưa đầy đủ`,
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsPhong.length; i++) {
      if (maPhong === dsPhong[i].maPhong) {
        setToast({
          header: `Tầng ${dsPhong[i].maPhong.slice(1, 3)} đã có phòng ${dsPhong[
            i
          ].maPhong.slice(4)}`,
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return false;
      }
    }
    if (!giaPhong || giaPhong <= 0) {
      setToast({
        header: "Giá phòng phải >= 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    return true;
  };
  const validateUpdate = () => {
    const { tenPhong, maPhong, giaPhong } = phongMoi;
    if (!tenPhong || tenPhong.slice(6).trim() === "") {
      setToast({
        header: `Tên phòng chưa đầy đủ`,
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsPhong.length; i++) {
      if (maPhong === dsPhong[i].maPhong && maPhongCu !== maPhong) {
        setToast({
          header: `Tầng ${dsPhong[i].maPhong.slice(1, 3)} đã có phòng ${dsPhong[
            i
          ].maPhong.slice(4)}`,
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return false;
      }
    }
    if (!giaPhong || giaPhong <= 0) {
      setToast({
        header: "Giá phòng phải >= 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    return true;
  };
  const onHandleSearch = async () => {
    const { data } = await axios.post(findRoomRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (data) {
      setDsPhong(data);
      setPhongSelected(undefined);
    }
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
  const onHandleChangeHinhAnhPhongFromTempPhong = (downloadURL) => {
    if (phongMoi && phongMoi.hinhAnhPhong && phongMoi.hinhAnhPhong.length > 0) {
      setPhongMoi({
        ...phongMoi,
        hinhAnhPhong: [...phongMoi.hinhAnhPhong, downloadURL],
      });
    } else {
      setPhongMoi({ ...phongMoi, hinhAnhPhong: [downloadURL] });
    }
  };
  console.log("Mã phòng cũ :", maPhongCu);
  return (
    <StyleContainer>
      <h1>Cập nhật phòng</h1>
      <div className="container">
        <Inputs
          phongMoi={phongMoi}
          tempTang={tempTang}
          tempLoaiPhong={tempLoaiPhong}
          setShowFrmLoaiPhong={setShowFrmLoaiPhong}
          setPhongMoi={setPhongMoi}
          setShowImageSelect={setShowImageSelect}
          setTempTang={setTempTang}
          setTempLoaiPhong={setTempLoaiPhong}
          onHandleAdd={onHandleAdd}
          onHandleUpdate={onHandleUpdate}
          onHandleRefresh={onHandleRefresh}
        />
        {/* <Search
          search={search}
          setSearch={setSearch}
          onHandleSearch={onHandleSearch}
          tempTang={tempTang}
          tempLoaiPhong={tempLoaiPhong}
        /> */}
        <TableData
          dsPhong={dsPhong}
          phongSelected={phongSelected}
          setPhongSelected={setPhongSelected}
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
      {showImageSelect && (
        <ImageSelect
          phongMoi={phongMoi}
          setShowImageSelect={setShowImageSelect}
          setPhongMoi={setPhongMoi}
          onHandleChangeHinhAnhPhongFromTempPhong={
            onHandleChangeHinhAnhPhongFromTempPhong
          }
        />
      )}
      {showFrmLoaiPhong && (
        <div className="frmLoaiPhong-container">
          <FrmLoaiPhong
            setShowFrmLoaiPhong={setShowFrmLoaiPhong}
            setTempLoaiPhong={setTempLoaiPhong}
          />
        </div>
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
  .frmLoaiPhong-container {
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: scroll;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default FrmQuanLyPhong;

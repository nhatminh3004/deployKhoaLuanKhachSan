import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FrmDatPhong from "../components/FrmDatPhong";
import FrmTang from "../components/FrmTang";
import FrmDichVu from "../components/FrmDichVu";
import Menu from "../components/Menu";
import FrmKhachHang from "../components/FrmKhachHang";
import FrmNhanVien from "../components/FrmNhanVien";
import FrmQuanLyPhong from "../components/FrmQuanLyPhong";
import FrmTimKiemDichVu from "../components/FrmDichVu/TimKiemDichVu";
import FrmTimKiemKhachHang from "../components/FrmKhachHang/TimKiemKhachHang";
import FrmTimKiemNhanVien from "../components/FrmNhanVien/TimKiemNhanVien";
import FrmNhanPhong from "../components/FrmNhanPhong";
import FrmLapHoaDon from "../components/FrmLapHoaDon";
import FrmTimKiemLoaiPhong from "../components/FrmTimKiemLoaiPhong";
import FrmTimKiemTang from "../components/FrmTimKiemTang";
import FrmTimKiemPhong from "../components/FrmTimKiemPhong";
import FrmCapNhatCa from "../components/FrmCapNhatCa";

import FrmDatDichVu from "../components/FrmDatDichVu";

import FrmThongKePhong from "../components/FrmThongKe/FrmThongKePhong";
import FrmThongKeDoanhThu from "../components/FrmThongKe/FrmThongKeDoanhThu";
import FrmThongKeDichVu from "../components/FrmThongKe/FrmThongKeDichVu";
import TabThongKe from "../components/FrmThongKe/TabThongKe";
import FrmPhanCong from "../components/FrmPhanCong";
import FrmChamCong from "../components/FrmChamCong";
import FrmTinhLuong from "../components/FrmTinhLuong";
import FrmTimKiemHoaDon from "../components/FrmTimKiemHoaDon";
import { Result } from "antd";
import Robot from "../assets/robot.gif";
import HomePage from "./HomePage";
import FrmXemLich from "../components/FrmXemLich";
import FrmXemBangLuong from "../components/FrmXemBangLuong";

function Main() {
  const navigate = useNavigate();
  const [navSelected, setNavSelected] = useState({
    room: false,
    guest: false,
    staff: true,
    bill: false,
    roomType: false,
    floor: false,
    booking: false,
    service: false,
    report: false,
    shift: false,
  });
  const [subNavSelected, setSubNavSelected] = useState({
    nav: "staff",
    subnav: "book",
  });
  const [nhanVien, setNhanVien] = useState(undefined);
  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setNhanVien(JSON.parse(localStorage.getItem("nhanVien")));
    }
  };
  console.log(subNavSelected);
  return (
    <Container>
      <Menu
        navSelected={navSelected}
        setNavSelected={setNavSelected}
        subNavSelected={subNavSelected}
        setSubNavSelected={setSubNavSelected}
      ></Menu>
      <div className="big-container">
        {/* <TitleBar /> */}
        <div className="wrapper">
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "book" && <FrmDatPhong />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "update-room" && <FrmQuanLyPhong />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "search-room" && <FrmTimKiemPhong />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "check-in" && <FrmNhanPhong />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "add-bill" && <FrmLapHoaDon />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "update-floor" && <FrmTang />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "search-floor" && <FrmTimKiemTang />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "search-room-type" && (
              <FrmTimKiemLoaiPhong />
            )}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "update-service" && <FrmDichVu />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "booking-service" && <FrmDatDichVu />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "update-guest" && <FrmKhachHang />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            nhanVien.taiKhoan.vaiTro.tenVaiTro === "ROLE_MANAGEMENT" &&
            subNavSelected.subnav === "update-staff" && <FrmNhanVien />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "search-service" && <FrmTimKiemDichVu />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "search-guest" && <FrmTimKiemKhachHang />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "search-staff" && <FrmTimKiemNhanVien />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "room-report" && <FrmThongKePhong />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "service-report" && <FrmThongKeDichVu />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "doanhthu-report" && (
              <FrmThongKeDoanhThu />
            )}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "report-staff" && <TabThongKe />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            nhanVien.taiKhoan.vaiTro.tenVaiTro === "ROLE_MANAGEMENT" &&
            subNavSelected.subnav === "update-shift" && <FrmCapNhatCa />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            nhanVien.taiKhoan.vaiTro.tenVaiTro === "ROLE_MANAGEMENT" &&
            subNavSelected.subnav === "assign" && <FrmPhanCong />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            nhanVien.taiKhoan.vaiTro.tenVaiTro === "ROLE_MANAGEMENT" &&
            subNavSelected.subnav === "timekeeping" && <FrmChamCong />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            nhanVien.taiKhoan.vaiTro.tenVaiTro === "ROLE_MANAGEMENT" &&
            subNavSelected.subnav === "payrolls" && <FrmTinhLuong />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "search-bill" && <FrmTimKiemHoaDon />}
          {nhanVien && nhanVien.taiKhoan && !nhanVien.taiKhoan.daKichHoat && (
            <div className="non-access">
              <Result
                status="403"
                title="Tài khoản của bạn đã bị khóa"
                subTitle="Vui lòng liên hệ nhân viên quản lý để mở khóa"
                extra={[]}
              />
            </div>
          )}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            (!subNavSelected.subnav || subNavSelected.subnav === "") && (
              <div className="non-access">
                <Result
                  icon={<HomePage />}
                  title={`Xin chào ${nhanVien.hoTen}`}
                  subTitle="Chào mừng bạn đã quay trở lại với ứng dụng quản lý khách sạn Sama"
                  extra={[]}
                />
              </div>
            )}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "watch-assignment" && <FrmXemLich />}
          {nhanVien &&
            nhanVien.taiKhoan &&
            nhanVien.taiKhoan.daKichHoat &&
            subNavSelected.subnav === "watch-payrolls" && <FrmXemBangLuong />}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 20% 80%;
  .big-container {
    display: flex;
    flex-direction: column;
    .wrapper {
      width: 100%;
      height: 100vh;
      /* background-color: black; */
      .non-access {
        /* width: 100%; */
        overflow: hidden;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export default Main;

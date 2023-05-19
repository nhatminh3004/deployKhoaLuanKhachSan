import React, { useState } from "react";
import styled from "styled-components";
import { BsCalendarCheck, BsDoorOpen } from "react-icons/bs";
import { HiOutlineChartBar } from "react-icons/hi";
import { TbReportMoney } from "react-icons/tb";
import { MdOutlinePayments } from "react-icons/md";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Logo from "../assets/logo.png";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DiningOutlinedIcon from "@mui/icons-material/DiningOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AdfScannerOutlinedIcon from "@mui/icons-material/AdfScannerOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditLocationAltRounded";
import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { Avatar, Col, Divider, Drawer, List, Popconfirm, Row } from "antd";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FloatingLabel,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { changeMatKhauRoute } from "../utils/APIRoutes";
import { BiFoodMenu } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
function Menu({
  navSelected,
  setNavSelected,
  subNavSelected,
  setSubNavSelected,
}) {
  const onHandleSelectedNav = (nav, value) => {
    setNavSelected({
      room: false,
      guest: false,
      staff: false,
      bill: false,
      roomType: false,
      floor: false,
      booking: false,
      service: false,
      shift: false,
      [nav]: value,
    });
  };
  const onHandleSelectedSubNav = (subnav, nav) => {
    setSubNavSelected({ subnav: subnav, nav: nav });
    setNavSelected({
      room: false,
      guest: false,
      staff: false,
      bill: false,
      roomType: false,
      floor: false,
      booking: false,
      service: false,
      shift: false,
      [nav]: true,
    });
  };
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [toast, setToast] = useState(null);
  const [objectDoiMatKhau, setObjectDoiMatKhau] = useState({
    matKhauCu: "",
    matKhauMoi: "",
  });
  const [openDoiMatKhauDrawwer, setOpenDoiMatKhauDrawer] = useState(false);
  const thongTinNhanVien = localStorage.getItem("nhanVien");
  const nhanVien = JSON.parse(thongTinNhanVien);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setObjectDoiMatKhau({
      ...objectDoiMatKhau,
      [e.target.name]: e.target.value,
    });
  };
  const showDrawer = () => {
    setOpenUserInfo(true);
  };
  const onClose = () => {
    setOpenUserInfo(false);
  };
  const onCloseDoiMatKhau = () => {
    setOpenUserInfo(true);
    setOpenDoiMatKhauDrawer(false);
    setObjectDoiMatKhau({
      matKhauCu: "",
      matKhauMoi: "",
    });
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleDoiMatKhau = () => {
    setOpenUserInfo(false);
    setOpenDoiMatKhauDrawer(true);
  };
  const requestDoiMatKhau = async () => {
    if (validateChangeMatKhau()) {
      const finalObjectDoiMatKhau = {
        ...objectDoiMatKhau,
        maTaiKhoan: nhanVien.taiKhoan.maTaiKhoan,
        encodePassWord: nhanVien.taiKhoan.matKhau,
      };
      const { data } = await axios.post(
        changeMatKhauRoute,
        finalObjectDoiMatKhau,
        {},
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      console.log("Response changeMatKhau :", data);
      if (data) {
        setToast({
          header: "Đổi mật khẩu thành công",
          content: "",
          bg: "success",
          textColor: "#fff",
        });
        handleLogOut();
      } else {
        setToast({
          header: "Mật khẩu cũ không đúng",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
      }
    }
  };
  console.log(nhanVien);
  const validateChangeMatKhau = () => {
    const { matKhauCu, matKhauMoi } = objectDoiMatKhau;
    if (matKhauCu === "") {
      setToast({
        header: "Mật khẩu cũ không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (matKhauMoi === "") {
      setToast({
        header: "Mật khẩu mới không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }

    return true;
  };
  // const confirm = (e) => {
  //   console.log(e);

  // };
  const cancel = (e) => {
    console.log(e);
  };
  // console.log('Thong Tin Nhan Vien Menu:', nhanVien);
  // console.log('Vai Tro Menu:', nhanVien.taiKhoan.vaiTro.tenVaiTro);
  // console.log('length Name', nhanVien.hoTen.split(' ').length);
  // console.log('full Name', `${nhanVien.hoTen.split(' ')[nhanVien.hoTen.split(' ').length - 2]} ${nhanVien.hoTen.split(' ')[nhanVien.hoTen.split(' ').length - 1]} `);
  console.log("dataDoiMatKhau:", objectDoiMatKhau);

  return (
    <>
      <Container>
        <div className="header">
          <div className="img-container">
            <img
              className="logo-img"
              src="/logo1.png"
              alt="logo"
              style={{
                width: "60px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>
          <p className="title" style={{ marginLeft: "5px" }}>
            Khách Sạn Sama
          </p>
        </div>
        <div className="wrapper_btn_container">
          <div className="btn-container">
            {nhanVien.taiKhoan.daKichHoat && (
              <button className={`btn ${navSelected.room && "btn-selected"}`}>
                <div
                  className="menu-content"
                  onClick={() => onHandleSelectedNav("room", !navSelected.room)}
                >
                  <BsDoorOpen />
                  <p className="btn-title">Phòng</p>
                </div>

                {navSelected.room && (
                  <div className="sub-menu-container">
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "update-room" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("update-room", "room")
                      }
                    >
                      <ManageAccountsOutlinedIcon />
                      <p className="btn-sub-title">Cập nhật</p>
                    </button>
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "search-room" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("search-room", "room")
                      }
                    >
                      <SearchIcon />
                      <p className="btn-sub-title">Tìm kiếm</p>
                    </button>
                  </div>
                )}
              </button>
            )}
            {nhanVien.taiKhoan.daKichHoat && (
              <button className={`btn ${navSelected.floor && "btn-selected"}`}>
                <div
                  className="menu-content"
                  onClick={() => {
                    onHandleSelectedNav("floor", !navSelected.floor);
                    setSubNavSelected({ nav: "", subnav: "" });
                  }}
                >
                  <HiOutlineChartBar />
                  <p className="btn-title">Tầng</p>
                </div>
                {navSelected.floor && (
                  <div className="sub-menu-container">
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "update-floor" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("update-floor", "floor")
                      }
                    >
                      <ManageAccountsOutlinedIcon />
                      <p className="btn-sub-title">Cập nhật</p>
                    </button>
                    {/* Tìm kiếm khách hàng */}
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "search-floor" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("search-floor", "floor")
                      }
                    >
                      <SearchIcon />
                      <p className="btn-sub-title">Tìm kiếm</p>
                    </button>
                  </div>
                )}
              </button>
            )}
            {/* Khách hàng */}
            {nhanVien.taiKhoan.daKichHoat && (
              <button className={`btn ${navSelected.guest && "btn-selected"}`}>
                <div
                  className="menu-content"
                  onClick={() => {
                    onHandleSelectedNav("guest", !navSelected.guest);
                    setSubNavSelected({ nav: "", subnav: "" });
                  }}
                >
                  <PermContactCalendarOutlinedIcon />
                  <p className="btn-title">Khách hàng</p>
                </div>
                {navSelected.guest && (
                  <div className="sub-menu-container">
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "update-guest" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("update-guest", "guest")
                      }
                    >
                      <ManageAccountsOutlinedIcon />
                      <p className="btn-sub-title">Cập nhật</p>
                    </button>
                    {/* Tìm kiếm khách hàng */}
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "search-guest" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("search-guest", "guest")
                      }
                    >
                      <SearchIcon />
                      <p className="btn-sub-title">Tìm kiếm</p>
                    </button>
                  </div>
                )}
              </button>
            )}
            {/* Nhân viên */}
            {nhanVien.taiKhoan.daKichHoat && (
              <button className={`btn ${navSelected.staff && "btn-selected"}`}>
                <div
                  className="menu-content"
                  onClick={() => {
                    onHandleSelectedNav("staff", !navSelected.staff);
                    setSubNavSelected("");
                  }}
                >
                  <BadgeOutlinedIcon />
                  <p className="btn-title">Nhân viên</p>
                </div>
                {navSelected.staff && (
                  <div className="sub-menu-container">
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "book" && "btn-sub-selected"
                      }`}
                      onClick={() => onHandleSelectedSubNav("book", "staff")}
                    >
                      <CallEndOutlinedIcon />
                      <p className="btn-sub-title">Đặt phòng</p>
                    </button>
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "check-in" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("check-in", "staff")
                      }
                    >
                      <VolunteerActivismOutlinedIcon />
                      <p className="btn-sub-title">Nhận phòng</p>
                    </button>
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "add-bill" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("add-bill", "staff")
                      }
                    >
                      <MdOutlinePayments />
                      <p className="btn-sub-title">Lập hóa đơn</p>
                    </button>
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "watch-assignment" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("watch-assignment", "staff")
                      }
                    >
                      <BsCalendarCheck />
                      <p className="btn-sub-title">Xem lịch làm việc</p>
                    </button>
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "watch-payrolls" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("watch-payrolls", "staff")
                      }
                    >
                      <TbReportMoney />
                      <p className="btn-sub-title">Xem bảng lương</p>
                    </button>
                    {nhanVien &&
                      nhanVien.taiKhoan.vaiTro.tenVaiTro ===
                        "ROLE_MANAGEMENT" && (
                        <button
                          className={`btn-sub ${
                            subNavSelected.subnav === "update-staff" &&
                            "btn-sub-selected"
                          }`}
                          onClick={() =>
                            onHandleSelectedSubNav("update-staff", "staff")
                          }
                        >
                          <GroupAddOutlinedIcon />
                          <p className="btn-sub-title">Cập nhật</p>
                        </button>
                      )}
                    {nhanVien &&
                      nhanVien.taiKhoan.vaiTro.tenVaiTro ===
                        "ROLE_MANAGEMENT" && (
                        <button
                          className={`btn-sub ${
                            subNavSelected.subnav === "search-staff" &&
                            "btn-sub-selected"
                          }`}
                          onClick={() =>
                            onHandleSelectedSubNav("search-staff", "staff")
                          }
                        >
                          <SearchIcon />
                          <p className="btn-sub-title">Tìm kiếm</p>
                        </button>
                      )}
                    {nhanVien &&
                      nhanVien.taiKhoan.vaiTro.tenVaiTro ===
                        "ROLE_MANAGEMENT" && (
                        <button
                          className={`btn-sub ${
                            subNavSelected.subnav === "assign" &&
                            "btn-sub-selected"
                          }`}
                          onClick={() =>
                            onHandleSelectedSubNav("assign", "staff")
                          }
                        >
                          <CalendarMonthOutlinedIcon />
                          <p className="btn-sub-title">Phân công</p>
                        </button>
                      )}
                    {nhanVien &&
                      nhanVien.taiKhoan.vaiTro.tenVaiTro ===
                        "ROLE_MANAGEMENT" && (
                        <button
                          className={`btn-sub ${
                            subNavSelected.subnav === "timekeeping" &&
                            "btn-sub-selected"
                          }`}
                          onClick={() =>
                            onHandleSelectedSubNav("timekeeping", "staff")
                          }
                        >
                          <EditCalendarOutlinedIcon />
                          <p className="btn-sub-title">Chấm công</p>
                        </button>
                      )}
                    {nhanVien &&
                      nhanVien.taiKhoan.vaiTro.tenVaiTro ===
                        "ROLE_MANAGEMENT" && (
                        <button
                          className={`btn-sub ${
                            subNavSelected.subnav === "payrolls" &&
                            "btn-sub-selected"
                          }`}
                          onClick={() =>
                            onHandleSelectedSubNav("payrolls", "staff")
                          }
                        >
                          <AdfScannerOutlinedIcon />
                          <p className="btn-sub-title">Tính lương</p>
                        </button>
                      )}
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "report-staff" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("report-staff", "staff")
                      }
                    >
                      <AssessmentOutlinedIcon />
                      <p className="btn-sub-title">Thống kê</p>
                    </button>
                  </div>
                )}
              </button>
            )}
            {nhanVien.taiKhoan.daKichHoat && (
              <button className={`btn ${navSelected.bill && "btn-selected"}`}>
                <div
                  className="menu-content"
                  onClick={() => onHandleSelectedNav("bill", !navSelected.bill)}
                >
                  <ReceiptLongIcon />
                  <p className="btn-title">Hóa đơn</p>
                </div>
                {navSelected.bill && (
                  <div className="sub-menu-container">
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "search-bill" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("search-bill", "bill")
                      }
                    >
                      <SearchIcon />
                      <p className="btn-sub-title">Tìm kiếm</p>
                    </button>

                    {/* <button
                    className={`btn-sub ${subNavSelected.subnav === "record" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("record", "bill")}
                  >
                    <BsDoorOpen />
                    <p className="btn-sub-title">Thống kê</p>
                  </button> */}
                  </div>
                )}
              </button>
            )}
            {/* Dịch Vụ */}
            {nhanVien.taiKhoan.daKichHoat && (
              <button
                className={`btn ${navSelected.service && "btn-selected"}`}
              >
                <div
                  className="menu-content"
                  onClick={() =>
                    onHandleSelectedNav("service", !navSelected.service)
                  }
                >
                  <FastfoodOutlinedIcon />
                  <p className="btn-title">Dịch vụ</p>
                </div>
                {navSelected.service && (
                  <div className="sub-menu-container">
                    {/* <button
                 className={`btn-sub ${subNavSelected.subnav === "update-type-service" &&
                   "btn-sub-selected"
                   }`}
                 onClick={() =>
                   onHandleSelectedSubNav("update-type-service", "service")
                 }
               >
                 <DiningOutlinedIcon />
                 <p className="btn-sub-title">Loại dịch vụ</p>
               </button> */}
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "booking-service" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("booking-service", "service")
                      }
                    >
                      <BiFoodMenu />
                      <p className="btn-sub-title">Đặt dịch vụ</p>
                    </button>
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "update-service" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("update-service", "service")
                      }
                    >
                      <ManageAccountsOutlinedIcon />
                      <p className="btn-sub-title">Cập nhật</p>
                    </button>
                    {/* Search Dich Vu */}
                    <button
                      className={`btn-sub ${
                        subNavSelected.subnav === "search-service" &&
                        "btn-sub-selected"
                      }`}
                      onClick={() =>
                        onHandleSelectedSubNav("search-service", "service")
                      }
                    >
                      <SearchIcon />
                      <p className="btn-sub-title">Tìm kiếm</p>
                    </button>
                  </div>
                )}
              </button>
            )}

            {/* Ca làm việc */}
            {nhanVien &&
              nhanVien.taiKhoan.daKichHoat &&
              nhanVien.taiKhoan.vaiTro.tenVaiTro === "ROLE_MANAGEMENT" && (
                <button
                  className={`btn ${navSelected.shift && "btn-selected"}`}
                >
                  <div
                    className="menu-content"
                    onClick={() =>
                      onHandleSelectedNav("shift", !navSelected.shift)
                    }
                  >
                    <AiOutlineClockCircle />
                    <p className="btn-title">Ca làm việc</p>
                  </div>
                  {navSelected.shift && (
                    <div className="sub-menu-container">
                      {/* <button
                 className={`btn-sub ${subNavSelected.subnav === "update-type-service" &&
                   "btn-sub-selected"
                   }`}
                 onClick={() =>
                   onHandleSelectedSubNav("update-type-service", "service")
                 }
               >
                 <DiningOutlinedIcon />
                 <p className="btn-sub-title">Loại dịch vụ</p>
               </button> */}
                      <button
                        className={`btn-sub ${
                          subNavSelected.subnav === "update-shift" &&
                          "btn-sub-selected"
                        }`}
                        onClick={() =>
                          onHandleSelectedSubNav("update-shift", "shift")
                        }
                      >
                        <ManageAccountsOutlinedIcon />
                        <p className="btn-sub-title">Cập nhật</p>
                      </button>
                    </div>
                  )}
                </button>
              )}

            {/* Thống Kê */}
            {/* <button className={`btn ${navSelected.report && "btn-selected"}`}>
              <div
                className="menu-content"
                onClick={() => onHandleSelectedNav("report", !navSelected.report)}
              >
                <AssessmentOutlinedIcon />
                <p className="btn-title">Thống kê</p>
              </div>
              {navSelected.report && (
                <div className="sub-menu-container">
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "room-report" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("room-report", "report")}
                  >
                    <MeetingRoomOutlinedIcon />
                    <p className="btn-sub-title">Phòng</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "doanhthu-report" &&
                      "btn-sub-selected"
                      }`}
                    onClick={() =>
                      onHandleSelectedSubNav("doanhthu-report", "report")
                    }
                  >
                    <MonetizationOnOutlinedIcon />
                    <p className="btn-sub-title">Doanh thu</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "service-report" &&
                      "btn-sub-selected"
                      }`}
                    onClick={() =>
                      onHandleSelectedSubNav("service-report", "report")
                    }
                  >
                    <FastfoodOutlinedIcon />
                    <p className="btn-sub-title">Dịch vụ</p>
                  </button>
                </div>
              )}
            </button> */}
          </div>
          <div
            style={{
              width: "100%",
              padding: "16px",
              height: "18%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "90%",
                borderRadius: "10px",
                padding: "10px",
                border: "1px solid white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexGrow: "2" }}>
                <Tooltip title="Xem thông tin cá nhân" placement="bottom-end">
                  <IconButton
                    onClick={() => {
                      showDrawer();
                    }}
                  >
                    <Avatar
                      size={50}
                      src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    />
                  </IconButton>
                </Tooltip>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: "2",
                    marginLeft: "5px",
                  }}
                >
                  <h6
                    style={{
                      margin: 0,
                      fontWeight: 500,
                      fontSize: "1.25rem",
                      lineHeight: 1.6,
                      letterSpacing: "0.0075em",
                      color: "white",
                    }}
                  >
                    {nhanVien &&
                      `${
                        nhanVien.hoTen.split(" ")[
                          nhanVien.hoTen.split(" ").length - 2
                        ]
                      } ${
                        nhanVien.hoTen.split(" ")[
                          nhanVien.hoTen.split(" ").length - 1
                        ]
                      } `}
                  </h6>
                  {nhanVien &&
                  nhanVien.taiKhoan.vaiTro.tenVaiTro === "ROLE_MANAGEMENT" ? (
                    <Chip
                      color="error"
                      size="small"
                      label="Quản lý"
                      sx={{ width: "90px" }}
                    />
                  ) : (
                    <Chip
                      color="primary"
                      size="small"
                      label="Nhân viên"
                      sx={{ width: "90px" }}
                    />
                  )}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </div>
            </div>
          </div>
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
            </Toast>
          </ToastContainer>
        )}
      </Container>
      <StyleDrawer
        width={640}
        placement="right"
        onClose={onClose}
        open={openUserInfo}
      >
        <p className="site-description-item-profile-p"> Thông tin cá nhân</p>
        <Row>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Họ tên:</p>
              {nhanVien && nhanVien.hoTen}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">
                Căn cước công dân:
              </p>
              {nhanVien && nhanVien.cccd}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">
                Ngày sinh:
              </p>
              {moment(nhanVien && nhanVien.ngaySinh).format("DD/MM/YYYY")}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Quốc gia</p>
              Việt Nam
            </div>
          </Col>
        </Row>

        <Divider />
        <p className="site-description-item-profile-p">Thông tin liên lạc</p>
        <Row>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">
                Số điện thoại
              </p>
              {nhanVien && nhanVien.soDienThoai}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Địa chỉ:</p>
              {nhanVien && nhanVien.diaChi}
            </div>
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Công ty</p>
        <Row>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">
                Tên tài khoản:
              </p>
              {nhanVien && nhanVien.soDienThoai}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">
                Tình trạng tài khoản:
              </p>
              {nhanVien && nhanVien.taiKhoan.daKichHoat === true
                ? "Đã kích hoạt"
                : "Chưa kích hoạt"}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Chức vụ:</p>
              {nhanVien &&
              nhanVien.taiKhoan.vaiTro.tenVaiTro === "ROLE_MANAGEMENT"
                ? "nhân viên quản lý"
                : "nhân viên lễ tân"}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">
                Ngày vào làm:
              </p>
              {moment(nhanVien && nhanVien.ngayVaoLam).format("DD/MM/YYYY")}
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              variant="success"
              style={{ padding: "0.5rem 1.5rem" }}
              onClick={() => handleDoiMatKhau()}
            >
              Đổi mật khẩu
            </Button>
            <Button
              variant="danger"
              style={{ padding: "0.5rem 1.5rem" }}
              onClick={() => handleLogOut()}
            >
              Đăng Xuất
            </Button>
          </Col>
        </Row>
      </StyleDrawer>

      {/* Drawwer đổi mật khẩu */}
      <StyleDrawer
        width={640}
        height={300}
        placement="top"
        onClose={onCloseDoiMatKhau}
        open={openDoiMatKhauDrawwer}
        title="Đổi mật khẩu"
      >
        <Row>
          <Col span={24}>
            <Box sx={{}}>
              <FloatingLabel
                controlId="floatingInput"
                label="Xác nhận mật khẩu cũ"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="matKhauCu"
                  onChange={(e) => handleOnChange(e)}
                  value={
                    objectDoiMatKhau.matKhauCu &&
                    objectDoiMatKhau.matKhauCu.length != 0
                      ? objectDoiMatKhau.matKhauCu
                      : ""
                  }
                />
              </FloatingLabel>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Box sx={{}}>
              <FloatingLabel
                controlId="floatingInput"
                label="Nhập mật khẩu mới"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="matKhauMoi"
                  value={
                    objectDoiMatKhau.matKhauMoi &&
                    objectDoiMatKhau.matKhauMoi.length != 0
                      ? objectDoiMatKhau.matKhauMoi
                      : ""
                  }
                  onChange={(e) => handleOnChange(e)}
                />
              </FloatingLabel>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Stack>
              <Popconfirm
                title="Đổi mật khẩu"
                description="Nếu bạn đổi mật khẩu thành công bạn sẽ bị đăng xuất khỏi chương trình !"
                onConfirm={requestDoiMatKhau}
                onCancel={cancel}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <Button variant="primary" style={{ padding: "0.5rem 1.5rem" }}>
                  Đổi mật khẩu
                </Button>
              </Popconfirm>
            </Stack>
          </Col>
        </Row>
      </StyleDrawer>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: linear-gradient(to bottom, #4776e6, #8e54e9);
  height: 100vh;
  button {
    &:focus {
      outline: none !important;
      outline-offset: none !important;
    }
  }
  .header {
    width: 100%;
    padding: 0.8rem;
    margin-left: 0.5rem;
    display: flex;
    /* align-items: center;
    justify-content: center; */
    gap: 0.4rem;
    height: 9%;
    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      .logo-img {
        width: 100%;
      }
    }

    .title {
      color: #fff;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
  .wrapper_btn_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 93%;
    /* background-color:red; */
    overflow: hidden;
  }
  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 75%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-image: linear-gradient(#373b44, #1095c1);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    button {
    }
    .btn {
      /* background-color: red; */
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: transparent;
      border: none;
      cursor: pointer;
      .menu-content {
        display: flex;
        /* border-start-end-radius: 50%; */
        padding: 1rem;
        gap: 0.5rem;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        background-color: transparent;
        background-image: linear-gradient(#1095c1, #1095c1);
        background-size: 0 100%;
        background-repeat: no-repeat;
        transition: 0.4s;
        &:hover {
          /* border-bottom: 1px solid #ccc; */
          /* opacity: 0.5; */
          background-size: 100% 100%;
          background: rgba(0, 0, 0, 0.2);
        }
        .btn-title {
          color: #fff;
          font-size: 1rem;
          margin: 0;
        }
        svg {
          color: #fff;
          font-size: 1.5rem;
        }
      }
    }
    .btn-selected {
      .menu-content {
        background-color: #1095c1;
        background-image: linear-gradient(#1095c1, #1095c1);
        .btn-title {
          font-weight: bold;
        }
      }
      .sub-menu-container {
        padding-left: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        .btn-sub {
          /* border-start-end-radius: 50%; */
          padding: 0.8rem 1rem;
          width: 100%;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          background-color: transparent;
          background-image: linear-gradient(#1095c1, #1095c1);
          background-size: 0 100%;
          background-repeat: no-repeat;
          transition: 0.4s;
          border: none;
          cursor: pointer;
          &:hover {
            /* border-bottom: 1px solid #ccc; */
            /* opacity: 0.5; */
            background-size: 100% 100%;
            background: rgba(0, 0, 0, 0.2);
          }
          .btn-sub-title {
            color: #fff;
            font-size: 0.8rem;
            margin: 0;
          }
          svg {
            color: #fff;
            font-size: 1rem;
          }
        }
        .btn-sub-selected {
          background-color: #1095c1;
          .btn-sub-title {
            font-weight: bold;
          }
        }
      }
    }
  }
`;
const StyleDrawer = styled(Drawer)`
  .site-description-item-profile-wrapper {
    margin-bottom: 7px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5715;
  }

  .ant-drawer-body p.site-description-item-profile-p {
    display: block;
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    line-height: 1.5715;
  }

  .site-description-item-profile-p-label {
    display: inline-block;
    margin-right: 8px;
    color: rgba(0, 0, 0, 0.85);
  }
`;
export default Menu;

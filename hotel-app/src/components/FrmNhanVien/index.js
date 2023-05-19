import { Box, Grid, Paper, TextField, Typography, Radio, Chip, Button as ButtonMUI, TableContainer, TableHead, TableRow, TableCell, TableBody, Stack, Autocomplete } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import {
    Button, FloatingLabel, Form, Table
} from "react-bootstrap";
import axios from 'axios';
import { addNhanVien, getAllNhanVienRoute, timNhanVien, updateNhanVien } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { Toast, ToastContainer, FormControl } from 'react-bootstrap';
import moment from 'moment/moment';
import { BiRefresh } from 'react-icons/bi';
function FrmNhanVien() {
    let ngayHienTai = new Date();
    // let ngayHienTai = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    // let ngayHienTai = dayjs(currentDate);
    // console.log("Current date: ", `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
    // const [dateNgaySinh, setDateNgaySinh] = useState(dayjs('2001-04-30'))
    // console.log("Dayjs:", dayjs(ngayHienTai));
    const [toast, setToast] = useState(null);
    const [dsNhanVien, setDsNhanVien] = useState(undefined);
    const [checkBoxKichHoat, setCheckBoxKichHoat] = useState("true");
    const [nhanVienSelected, setNhanVienSelected] = useState(undefined);
    const [nhanVienXoaRongTemp, setNhanVienXoaRongTemp] = useState(undefined);
    const [nhanVienMoi, setNhanVienMoi] = useState({
        maNhanVien: 0,
        hoTen: "",
        diaChi: "",
        email: "",
        soDienThoai: "",
        cccd: "",
        ngaySinh: dayjs(ngayHienTai),
        luongCoBan: 0,
        ngayVaoLam: dayjs(ngayHienTai),
        matKhau: "",
        daKichHoat: true
    })






    const handleRefeshNhanVien = () => {
        loadNhanVienFromDB();

    }

    useEffect(() => {
        // setNhanVienMoi({ ...nhanVienMoi, daKichHoat: checkBoxKichHoat })
        setNhanVienMoi({ ...nhanVienMoi, daKichHoat: checkBoxKichHoat === "false" ? false : true })
    }, [checkBoxKichHoat])

    const handleOnChange = (e) => {
        setNhanVienMoi({ ...nhanVienMoi, [e.target.name]: e.target.value });
    }
    const handlOnChangeNgayVaoLam = (date) => {
        console.log("Ngày vào làm onchange :", date);
        // console.log("Dayjs:", dayjs('2001-04-30'));
        setNhanVienMoi({ ...nhanVienMoi, ngayVaoLam: date })
        // setNhanVienMoi({ ...nhanVienMoi, ngayVaoLam: dayjs(ngayHienTai) })
    }
    const handlOnChangeNgaySinh = (date) => {

        setNhanVienMoi({ ...nhanVienMoi, ngaySinh: date })
    }
    const handlOnChangeDaKichHoat = (e) => {
        setCheckBoxKichHoat(e.target.value);


    }
    const validateAddNhanVien = () => {
        const { diaChi, email, soDienThoai, cccd, matKhau, hoTen } = nhanVienMoi;
        if (hoTen === "") {
            setToast({
                header: "Họ tên không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (email === "") {
            setToast({
                header: "Email không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (diaChi === "") {
            setToast({
                header: "Địa chỉ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (cccd === "") {
            setToast({
                header: "Căn cước không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (soDienThoai === "") {
            setToast({
                header: "Số điện thoại không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (matKhau === "") {
            setToast({
                header: "Mật khẩu không được không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        for (var i = 0; i < dsNhanVien.length; i++) {
            if (soDienThoai === dsNhanVien[i].nhanvien.soDienThoai || cccd === dsNhanVien[i].nhanvien.cccd) {
                setToast({
                    header: "Số điện thoại hoặc căn cước công dân đã tồn tại trên hệ thống !",
                    content: "",
                    bg: "danger",
                    textColor: "#fff",
                });
                return false;
            }
        }

        return true;
    };
    const handleAddNhanVienMoi = async () => {
        const { maNhanVien, hoTen, diaChi, email, soDienThoai, cccd, ngaySinh, luongCoBan, ngayVaoLam, matKhau, daKichHoat } = nhanVienMoi

        const objectDataADD = {
            maNhanVien, hoTen, diaChi, email, soDienThoai: "+84" + soDienThoai, cccd, ngaySinh, luongCoBan, ngayVaoLam, matKhau, daKichHoat
        }
        console.log("Nhan Vien Mới  :", objectDataADD);

        if (nhanVienMoi.maNhanVien === 0 && validateAddNhanVien()) {
            const { data } = await axios.post(addNhanVien, objectDataADD, {}, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            console.log("Response data :", data);
            console.log("messsage data :", data === "Nhân viên đã tồn tại trong hệ thống");
            if (data === "Nhân viên đã tồn tại trong hệ thống") {
                setToast({
                    header: "Thêm nhân viên mới không thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
            else {
                loadNhanVienFromDB();
                setNhanVienMoi(
                    {
                        ...nhanVienMoi,
                        maNhanVien: 0,
                        hoTen: "",
                        diaChi: "",
                        email: "",
                        soDienThoai: "",
                        cccd: "",
                        ngaySinh: dayjs(ngayHienTai),
                        luongCoBan: 0,
                        ngayVaoLam: dayjs(ngayHienTai),
                        matKhau: "",
                        daKichHoat: true
                    }
                )
                setToast({
                    header: "Thêm nhân viên mới  thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }


    }

    useEffect(() => {
        loadNhanVienFromDB();
    }, [])
    const loadNhanVienFromDB = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        const { data } = await axios.get(`${getAllNhanVienRoute}`, {}, config);
        // console.log("data nhân viên load from database", data[0].nhanvien.ngayVaoLam);

        setDsNhanVien(data);
    }
    const handleSelected = (nhanvien) => {
        // console.log("Nhan Vien Selected :", nhanvien.nhanvien);
        if (nhanVienSelected && nhanvien.nhanvien.maNhanVien === nhanVienSelected.nhanvien.maNhanVien) {
            setNhanVienSelected(undefined);

        }
        else {
            setNhanVienSelected(nhanvien)

        }
        console.log("Nhan Vien Selected :", nhanvien.nhanvien);

    }
    useEffect(() => {
        if (nhanVienSelected) {
            setNhanVienXoaRongTemp(nhanVienSelected)
            // console.log("Nhan vien selected ngay vao lam : ", nhanVienSelected.nhanvien.ngayVaoLam);
            // dayjs('2001-04-30')
            const tempNgayVaoLam = moment(nhanVienSelected.nhanvien.ngayVaoLam).format("YYYY-MM-DD");
            const tempNgaySinh = moment(nhanVienSelected.nhanvien.ngaySinh).format("YYYY-MM-DD");
            const dateObjetNgayVaoLam = dayjs(tempNgayVaoLam);
            const dateObjetNgaySinh = dayjs(tempNgaySinh);
            // console.log("convert date to Object :", dateObjet);

            setNhanVienMoi({ ...nhanVienSelected.nhanvien, ngayVaoLam: dateObjetNgayVaoLam, ngaySinh: dateObjetNgaySinh, })
            // setNhanVienMoi({ ...nhanVienSelected.nhanvien, ngayVaoLam: dateObjetNgayVaoLam, ngaySinh: dateObjetNgaySinh })
        }
        else {
            setNhanVienMoi({
                maNhanVien: 0,
                hoTen: "",
                diaChi: "",
                email: "",
                soDienThoai: "",
                cccd: "",
                ngaySinh: dayjs(ngayHienTai),
                luongCoBan: 0,
                ngayVaoLam: dayjs(ngayHienTai),
                matKhau: "",
                daKichHoat: true
            })
            setNhanVienXoaRongTemp(undefined);
        }
    }, [nhanVienSelected])

    const validateUpdateNhanVien = () => {
        const { diaChi, email, soDienThoai, cccd, matKhau, hoTen } = nhanVienMoi;
        if (hoTen === "") {
            setToast({
                header: "Họ tên không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (email === "") {
            setToast({
                header: "Email không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (diaChi === "") {
            setToast({
                header: "Địa chỉ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (cccd === "") {
            setToast({
                header: "Căn cước không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        return true;
    };
    const handleUpdateNhanVien = async () => {

        if (nhanVienMoi.maNhanVien !== 0 && validateUpdateNhanVien()) {
            console.log("Data update :", nhanVienMoi);
            const { data } = await axios.put(updateNhanVien, nhanVienMoi, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            if (data === "Update Success") {
                loadNhanVienFromDB();
                setNhanVienSelected(undefined);
                setToast({
                    header: "Cập nhật thông tin nhân viên thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }
    }
    const handleKichHoatTaiKhoan = async (nhanvien) => {
        const dataKichHoat = {
            ...nhanvien, daKichHoat: true
        }
        const { data } = await axios.put(updateNhanVien, dataKichHoat, {}, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },

        })
        if (data === "Update Success") {
            loadNhanVienFromDB();
            setNhanVienSelected(undefined);
            setToast({
                header: "Kích hoạt tài khoản thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
        }

    }
    const handlehuyKichHoatTaiKhoan = async (nhanvien) => {
        const dataHuyKichHoat = {
            ...nhanvien, daKichHoat: false
        }
        const { data } = await axios.put(updateNhanVien, dataHuyKichHoat, {}, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },

        })
        if (data === "Update Success") {
            loadNhanVienFromDB();
            setNhanVienSelected(undefined);
            setToast({
                header: "Khóa tài khoản thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
        }

    }
    const handleOnSelectTrangThaiTaiKhoan = (name, e) => {
        console.log('Select Trang Thai Tai Khoan :', e.target.value);
        setNhanVienMoi({ ...nhanVienMoi, [name]: e.target.value === "true" });
    };
    const handleXoaRong = () => {
        if (nhanVienXoaRongTemp) {
            setNhanVienMoi({
                maNhanVien: nhanVienXoaRongTemp.nhanvien.maNhanVien,
                hoTen: "",
                diaChi: "",
                email: "",
                soDienThoai: nhanVienXoaRongTemp.nhanvien.soDienThoai,
                cccd: "",
                ngaySinh: dayjs(ngayHienTai),
                luongCoBan: 0,
                ngayVaoLam: dayjs(ngayHienTai),
                matKhau: nhanVienXoaRongTemp.nhanvien.matKhau,
                daKichHoat: true,
                maTaiKhoan: nhanVienXoaRongTemp.nhanvien.maTaiKhoan
            });
        }
        else {
            setNhanVienMoi({
                maNhanVien: 0,
                hoTen: "",
                diaChi: "",
                email: "",
                soDienThoai: "",
                cccd: "",
                ngaySinh: dayjs(ngayHienTai),
                luongCoBan: 0,
                ngayVaoLam: dayjs(ngayHienTai),
                matKhau: "",
                daKichHoat: true
            });
        }

    }


    // console.log("Nhan vien selected ghi đè nhân viên mới", nhanVienMoi);
    // console.log("checkbox true :", nhanVienMoi.daKichHoat === true);
    // console.log("Nhan vien seledted:", );
    // console.log(" Date khi picker:", nhanVienMoi.ngayVaoLam);
    // console.log("Kiểu dữ liệu Date khi picker:", typeof nhanVienMoi.ngayVaoLam);
    // console.log(" Date load từ database :", dsNhanVien && dsNhanVien[0].nhanvien.ngayVaoLam);
    // console.log("Kiểu dữ liệu Date load từ database :", dsNhanVien && typeof dsNhanVien[0].nhanvien.ngayVaoLam);
    console.log("Nhan vien moi  :", nhanVienMoi);
    console.log('Nhan Vien Xoa Rong Temp', nhanVienXoaRongTemp);
    // console.log("ngay vao lam :", nhanVienMoi.ngayVaoLam);
    return (
        <StyledContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Quản lý nhân viên</Typography>
            </Box>
            {/* Input Nhân Viên */}
            <Paper elevation={15} sx={{ marginTop: '10px', flexDirection: 'column', maxHeight: '45%', overflow: 'auto', padding: '15px' }}>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mã nhân viên"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Mã nhân viên"
                                name="maNhanVien"
                                disabled={true}
                                value={nhanVienMoi && nhanVienMoi.maNhanVien != 0 ? nhanVienMoi.maNhanVien : ""}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={3}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Họ tên nhân viên"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="hoTen"
                                value={nhanVienMoi && nhanVienMoi.hoTen ? nhanVienMoi.hoTen : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Địa chỉ"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="diaChi"
                                value={nhanVienMoi && nhanVienMoi.diaChi ? nhanVienMoi.diaChi : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={3}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="email"
                                value={nhanVienMoi && nhanVienMoi.email ? nhanVienMoi.email : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', }}>
                            <Chip color="info" label="+84" sx={{ height: '47px', width: '47px', borderRadius: '30px' }} />
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Số điện thoại"
                                className="mb-1"
                            >
                                <Form.Control
                                    type="text"
                                    name="soDienThoai"
                                    value={nhanVienMoi && nhanVienMoi.soDienThoai ? nhanVienMoi.soDienThoai : ""}
                                    disabled={nhanVienSelected && nhanVienSelected.nhanvien.maNhanVien != 0}
                                    onChange={(e) => handleOnChange(e)}
                                />
                            </FloatingLabel>

                        </Box>
                    </Grid>

                    <Grid item md={3}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Căn cước công dân"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="cccd"
                                value={nhanVienMoi && nhanVienMoi.cccd ? nhanVienMoi.cccd : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={3}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Lương cơ bản"
                            className="mb-1"
                        >
                            <Form.Control
                                type="number"
                                name="luongCoBan"
                                value={nhanVienMoi && nhanVienMoi.luongCoBan ? nhanVienMoi.luongCoBan : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={3}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mật khẩu"
                            className="mb-1"
                        >
                            <Form.Control
                                type="password"
                                name="matKhau"
                                value={nhanVienMoi && nhanVienMoi.matKhau ? nhanVienMoi.matKhau : ""}
                                disabled={nhanVienSelected && nhanVienSelected.nhanvien.maNhanVien != 0}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['MobileDateTimePicker']} >
                                <MobileDateTimePicker

                                    sx={{ width: '100%' }}
                                    label="Ngày vào làm"
                                    value={nhanVienMoi && nhanVienMoi.ngayVaoLam ? nhanVienMoi.ngayVaoLam : dayjs(ngayHienTai)}
                                    // onChange={(date) => setDateNgaySinh(date)}
                                    onChange={(date) => { handlOnChangeNgayVaoLam(date) }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item md={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['MobileDateTimePicker']} >
                                <MobileDateTimePicker
                                    sx={{ width: '100%' }}
                                    label="Ngày sinh"
                                    value={nhanVienMoi && nhanVienMoi.ngaySinh ? nhanVienMoi.ngaySinh : dayjs(ngayHienTai)}
                                    // onChange={(date) => setDateNgaySinh(date)}
                                    onChange={(date) => { handlOnChangeNgaySinh(date) }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={3} >
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Trạng thái tài khoản"
                            className="mb-1"
                            style={{ marginTop: '6px' }}

                        >
                            <Form.Select
                                style={{ height: '57px' }}
                                aria-label="Default select example"
                                onChange={(e) => handleOnSelectTrangThaiTaiKhoan("daKichHoat", e)}
                            >
                                <option value={true} selected={nhanVienMoi.daKichHoat}>
                                    Kích hoạt
                                </option>
                                <option value={false} selected={!nhanVienMoi.daKichHoat}>
                                    Khóa
                                </option>
                            </Form.Select>
                        </FloatingLabel>
                    </Grid>

                    <Stack sx={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', mt: '10px', ml: '8px', gap: '1.5rem' }}>
                        <Button variant="success" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleAddNhanVienMoi()}>
                            Thêm
                        </Button>
                        <Button variant="primary" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleUpdateNhanVien()}>
                            Cập nhật
                        </Button>
                        <Button variant="danger" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleXoaRong()}>
                            Xóa rỗng
                        </Button>
                        <Button variant="warning" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleRefeshNhanVien()}>
                            <BiRefresh style={{ fontSize: '1.5rem' }} />
                        </Button>
                    </Stack>
                </Grid>

            </Paper>
            {/* Danh sách Nhân Viên */}
            <StyledPaper elevation={10}>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th align="center">Họ Tên</th>
                            <th align="center">Địa chỉ</th>
                            <th align="center">Căn cước</th>
                            <th align="center">Email</th>
                            <th align="center">Số điện thoại</th>
                            <th align="center">Lương cơ bản</th>
                            <th align="center">Ngày sinh</th>
                            <th align="center">Ngày vào làm</th>
                            <th align="center">Tình trạng</th>
                            <th align="center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsNhanVien && dsNhanVien.length > 0 ? dsNhanVien.map((data) => (
                            <tr key={data.nhanvien.maNhanVien} onClick={() => handleSelected(data)} className={nhanVienSelected && nhanVienSelected.nhanvien.maNhanVien === data.nhanvien.maNhanVien
                                ? "row-selected"
                                : ""} >
                                <td component="th" scope="row">
                                    {data.nhanvien.maNhanVien}
                                </td>
                                <td align="center">{data.nhanvien.hoTen}</td>
                                <td align="center">{data.nhanvien.diaChi}</td>
                                <td align="center">{data.nhanvien.cccd}</td>
                                <td align="center">{data.nhanvien.email}</td>
                                <td align="center">{data.nhanvien.soDienThoai}</td>
                                <td align="center">{data.nhanvien.luongCoBan}</td>
                                <td align="center">{data.nhanvien.ngaySinh ? moment(data.nhanvien.ngaySinh).format("DD/MM/YYYY") : "Chưa có dữ liệu "}</td>
                                <td align="center">{data.nhanvien.ngayVaoLam ? moment(data.nhanvien.ngayVaoLam).format("DD/MM/YYYY") : "Chưa có dữ liệu "}</td>
                                <td align="center">
                                    {data.nhanvien.daKichHoat ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                                </td>
                                <td align="center">{data.nhanvien.daKichHoat ? <ButtonMUI variant='contained' size='small' sx={{ backgroundColor: 'red' }} onClick={() => { handlehuyKichHoatTaiKhoan(data.nhanvien) }}>Khóa</ButtonMUI> : <ButtonMUI onClick={() => { handleKichHoatTaiKhoan(data.nhanvien) }} variant='contained' size='small' sx={{ backgroundColor: 'green' }}>Kích hoạt</ButtonMUI>}
                                </td>
                            </tr>
                        )) :

                            <Box sx={{ display: 'flex', height: '420px', width: '100%' }}>
                                <Typography variant='h3'>Chưa có dữ liệu</Typography>
                            </Box>
                        }
                    </tbody>
                </Table>
            </StyledPaper>



            {/* Toast Thông báo */}
            {
                toast && (
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
                )
            }

        </StyledContainer >
    )
}

export default FrmNhanVien
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
 
  /* background-color: red; */
  padding: 20px;
  table {
    .row-selected {
      
        background-color: #9fbce7d1 !important;
      
    }
  }
 
`;
const StyledPaper = styled(Paper)`
height: 390px;
overflow: auto;
margin-top: 15px;
&::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`
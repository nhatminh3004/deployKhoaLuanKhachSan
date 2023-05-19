import { Box, Grid, Paper, TextField, Typography, Button, IconButton, Stack, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import dayjs from 'dayjs';
import { Toast, ToastContainer, FloatingLabel, Form, Table } from "react-bootstrap";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import axios from 'axios';
import { layDanhSachMaKhachHangVaSoLanDatPhongThanhCong, layDanhSachMaKhachHangVaSoLanHuyDatPhong, thongKeSoLanDatDichVu } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PopupPrintThongKeSoLanDatDichVu from './PopupPrintThongKeSoLanDatDichVu';
import PopupPrintThongKeKhachHangDatPhongThanhCong from './PopupPrintThongKeKhachHangDatPhongThanhCong';
import PopupPrintThongKeSoLanHuyDatPhongKhachHang from './PopupPrintThongKeSoLanHuyDatPhongKhachHang';

function FrmThongKeKhachHang() {
    let ngayHienTai = new Date();
    const [toast, setToast] = useState(null);
    const [dsThongKeSoLanDatPhongThanhCongCuaKhachHang, setdsThongKeSoLanDatPhongThanhCongCuaKhachHang] = useState(undefined);
    const [dsThongKeSoLanHuyDatPhongCuaKhachHang, setdsThongKeSoLanHuyDatPhongCuaKhachHang] = useState(undefined);
    const [dsThongKeSoLanHuyDatPhongCuaKhachHangCustome, setdsThongKeSoLanHuyDatPhongCuaKhachHangCustome] = useState(undefined);
    const [dsThongKeSoLanDatPhongThanhCongCuaKhachHangCustome, setdsThongKeSoLanDatPhongThanhCongCuaKhachHangCustome] = useState(undefined);
    const [detailReportSoLanDatPhongThanhCong, setDetailReportSoLanDatPhongThanhCong] = useState(false);
    const [detailReportSoLanHuyDatPhong, setDetailReportSoLanHuyDatPhong] = useState(false);
    const [openPopupPrintSoLanKhachHangDatPhongThanhCong, setOpenPopupPrintSoLanKhachHangDatPhongThanhCong] = useState(false);
    const [openPopupPrintSoLanKhachHangHuyDatPhong, setOpenPopupPrintSoLanKhachHangHuyDatPhong] = useState(false);

    const [search, setSearch] = useState({
        tuNgay: undefined,
        denNgay: dayjs(ngayHienTai),
        theo: "",
        ngayHienTai: dayjs(ngayHienTai)
    });
    useEffect(() => {
        setdsThongKeSoLanDatPhongThanhCongCuaKhachHang(undefined);
    }, [search])
    useEffect(() => {
        if (dsThongKeSoLanDatPhongThanhCongCuaKhachHang) {
            const newDsThongKeDatPhongThanhCong = dsThongKeSoLanDatPhongThanhCongCuaKhachHang.map((obj) => {
                return {
                    ...obj,
                    số_lần_đặt_phòng: obj.tongSoDatThanhCong,
                    hoTenCustome: `${obj.hoTenKhachHang.split(' ')[obj.hoTenKhachHang.split(' ').length - 2]} ${obj.hoTenKhachHang.split(' ')[obj.hoTenKhachHang.split(' ').length - 1]} `

                }
            })
            setdsThongKeSoLanDatPhongThanhCongCuaKhachHangCustome(newDsThongKeDatPhongThanhCong)
        }

    }, [dsThongKeSoLanDatPhongThanhCongCuaKhachHang])
    useEffect(() => {
        if (dsThongKeSoLanHuyDatPhongCuaKhachHang) {
            const newDsThongKeHuyDatPhong = dsThongKeSoLanHuyDatPhongCuaKhachHang.map((obj) => {
                return {
                    ...obj,
                    số_lần_hủy_đặt_phòng: obj.tongSoLanHuyPhong,
                    hoTenCustome: `${obj.hoTenKhachHang.split(' ')[obj.hoTenKhachHang.split(' ').length - 2]} ${obj.hoTenKhachHang.split(' ')[obj.hoTenKhachHang.split(' ').length - 1]} `

                }
            })
            setdsThongKeSoLanHuyDatPhongCuaKhachHangCustome(newDsThongKeHuyDatPhong)
        }

    }, [dsThongKeSoLanHuyDatPhongCuaKhachHang])

    const handleOnchangeSelectedCombobox = (e, value) => {

        setSearch({ ...search, theo: value })
    }
    const handlOnChangeTuNgay = (date) => {
        setSearch({ ...search, tuNgay: date })
    }
    const handlOnChangeDenNgay = (date) => {
        setSearch({ ...search, denNgay: date })
    }
    const handleThongKeKhachHangTheoSoLanHuyDatPhong = async () => {
        // console.log("Thống kê theo :", search);
        const { data } = await axios.post(layDanhSachMaKhachHangVaSoLanHuyDatPhong, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Data Thống kê số lần khách hàng hủy đặt phòng :", data);
        if (data) {
            setdsThongKeSoLanHuyDatPhongCuaKhachHang(data);
        }
    }

    const handleThongKeKhachHangTheoSoLanDatPhong = async () => {
        // console.log("Thống kê theo :", search);
        const { data } = await axios.post(layDanhSachMaKhachHangVaSoLanDatPhongThanhCong, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Data Thống kê khách hàng :", data);
        if (data) {
            setdsThongKeSoLanDatPhongThanhCongCuaKhachHang(data);
        }
    }
    const handlePrintThongKeSoLanDatPhongThanhCong = () => {
        setOpenPopupPrintSoLanKhachHangDatPhongThanhCong(true);
    }
    const handlePrintThongKeSoLanHuyDatPhong = () => {
        setOpenPopupPrintSoLanKhachHangHuyDatPhong(true);
    }

    const handleDetailReportSoLanDatPhongThanhCong = () => {
        setDetailReportSoLanDatPhongThanhCong(true);
    }
    const handleDetailReportSoLanHuyDatPhong = () => {
        setDetailReportSoLanHuyDatPhong(true);
    }
    console.log('dsHuyDatPhong', dsThongKeSoLanHuyDatPhongCuaKhachHangCustome);
    console.log('dsHuyDatPhongCustome', dsThongKeSoLanHuyDatPhongCuaKhachHangCustome);
    return (
        <StyledContainer>

            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Số lần khách hàng đặt phòng thành công', 'Số lần khách hàng hủy đặt phòng']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Thống kê khách hàng theo" disabled />}
                    />
                </Grid>

                <Grid item md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker

                                sx={{ width: '100%' }}
                                label="Từ ngày"
                                value={search && search.tuNgay ? search.tuNgay : ""}

                                onChange={(date) => { handlOnChangeTuNgay(date) }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>

                <Grid item md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker

                                sx={{ width: '100%' }}
                                label="Đến ngày"
                                value={search && search.denNgay ? search.denNgay : dayjs(ngayHienTai)}

                                onChange={(date) => { handlOnChangeDenNgay(date) }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>

                <Grid item md={4}>
                    {/* Thống kê số lần đặt phòng thành công */}
                    {search.theo === "Số lần khách hàng đặt phòng thành công" && <Button sx={{
                        backgroundColor: '#198754', '&:hover': {
                            backgroundColor: '#198754'
                        }
                    }} fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKeKhachHangTheoSoLanDatPhong() }} >Thống kê số lần đặt phòng</Button>}
                    {/* Thống kê số lần hủy đặt phòng */}
                    {search.theo === "Số lần khách hàng hủy đặt phòng" && <Button sx={{
                        backgroundColor: '#198754', '&:hover': {
                            backgroundColor: '#198754'
                        }
                    }} fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKeKhachHangTheoSoLanHuyDatPhong() }} >Thống kê số lần hủy đặt phòng</Button>}

                </Grid>
                <Grid item md={4}>
                    {/* Thống kê số lần đặt phòng thành công */}
                    {search.theo === "Số lần khách hàng đặt phòng thành công" && <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { handleDetailReportSoLanDatPhongThanhCong() }} >Xem chi tiết báo cáo</Button>}
                    {/* Thống kê số lần hủy đặt phòng */}
                    {search.theo === "Số lần khách hàng hủy đặt phòng" && <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { handleDetailReportSoLanHuyDatPhong() }} >Xem chi tiết báo cáo</Button>}

                </Grid>
                <Grid item md={4}>
                    {/* Thống kê số lần đặt phòng thành công */}
                    {search.theo === "Số lần khách hàng đặt phòng thành công" && <Button sx={{
                        backgroundColor: '#FFC107', '&:hover': {
                            backgroundColor: '#FFC107',
                        }
                    }} fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrintThongKeSoLanDatPhongThanhCong() }} >In thống kê số lần đặt phòng</Button>}
                    {/* Thống kê số lần hủy đặt phòng */}
                    {search.theo === "Số lần khách hàng hủy đặt phòng" && <Button sx={{
                        backgroundColor: '#FFC107', '&:hover': {
                            backgroundColor: '#FFC107',
                        }
                    }} fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrintThongKeSoLanHuyDatPhong() }} >In thống kê số lần hủy đặt phòng</Button>}
                </Grid>



            </Grid>
            {/* Danh sách kết quả thống kê theo thống kê số lần khách hàng đặt phòng thành công */}
            {dsThongKeSoLanDatPhongThanhCongCuaKhachHang && dsThongKeSoLanDatPhongThanhCongCuaKhachHang.length > 0 && detailReportSoLanDatPhongThanhCong === true &&
                <StyledPaper elevation={10} >
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <Box flexGrow={1}>

                        </Box>
                        <IconButton color="inherit" aria-label="close" onClick={() => {
                            setDetailReportSoLanDatPhongThanhCong(false);

                        }}>
                            <CloseIcon />
                        </IconButton>

                    </Stack>
                    <Table striped hover>
                        <thead >
                            <tr>
                                <th><>Mã khách hàng</></th>
                                <th><>Họ tên</></th>
                                <th><>Địa chỉ</></th>
                                <th><>Email</></th>
                                <th><>Số điện thoại</></th>
                                <th><>Tổng số lần đặt phòng</></th>

                            </tr>
                        </thead>
                        <tbody>
                            {dsThongKeSoLanDatPhongThanhCongCuaKhachHang && dsThongKeSoLanDatPhongThanhCongCuaKhachHang.length > 0 ? dsThongKeSoLanDatPhongThanhCongCuaKhachHang.map((data) => (
                                <tr key={data.maKhachHang}  >
                                    <td >
                                        {data.maKhachHang}
                                    </td>
                                    <td  >
                                        {data.hoTenKhachHang}
                                    </td>
                                    <td  >
                                        {data.diaChiKhachHang}
                                    </td>
                                    <td  >
                                        {data.emailKhachHang}
                                    </td>
                                    <td  >
                                        {data.soDienThoaiKhachHang}
                                    </td>
                                    <td  >
                                        {data.tongSoDatThanhCong}
                                    </td>
                                </tr>
                            )) :

                                <Box sx={{ display: 'flex', height: '420px', width: '100%' }}>
                                    <Typography variant='h3'>Chưa có dữ liệu</Typography>
                                </Box>
                            }
                        </tbody>
                    </Table>

                </StyledPaper>}
            {/* Danh sách kết quả thống kê theo thống kê số lần khách hàng hủy đặt phòng */}
            {dsThongKeSoLanHuyDatPhongCuaKhachHang && dsThongKeSoLanHuyDatPhongCuaKhachHang.length > 0 && detailReportSoLanHuyDatPhong === true &&
                <StyledPaper elevation={10} >
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <Box flexGrow={1}>

                        </Box>
                        <IconButton color="inherit" aria-label="close" onClick={() => {
                            setDetailReportSoLanHuyDatPhong(false);

                        }}>
                            <CloseIcon />
                        </IconButton>

                    </Stack>
                    <Table striped hover>
                        <thead >
                            <tr>
                                <th><>Mã khách hàng</></th>
                                <th><>Họ tên</></th>
                                <th><>Địa chỉ</></th>
                                <th><>Email</></th>
                                <th><>Số điện thoại</></th>
                                <th><>Tổng số lần hủy đặt phòng</></th>

                            </tr>
                        </thead>
                        <tbody>
                            {dsThongKeSoLanHuyDatPhongCuaKhachHang && dsThongKeSoLanHuyDatPhongCuaKhachHang.length > 0 ? dsThongKeSoLanHuyDatPhongCuaKhachHang.map((data) => (
                                <tr key={data.maKhachHang}  >
                                    <td >
                                        {data.maKhachHang}
                                    </td>
                                    <td  >
                                        {data.hoTenKhachHang}
                                    </td>
                                    <td  >
                                        {data.diaChiKhachHang}
                                    </td>
                                    <td  >
                                        {data.emailKhachHang}
                                    </td>
                                    <td  >
                                        {data.soDienThoaiKhachHang}
                                    </td>
                                    <td  >
                                        {data.tongSoLanHuyPhong}
                                    </td>
                                </tr>
                            )) :

                                <Box sx={{ display: 'flex', height: '420px', width: '100%' }}>
                                    <Typography variant='h3'>Chưa có dữ liệu</Typography>
                                </Box>
                            }
                        </tbody>
                    </Table>

                </StyledPaper>}
            {/* Char thống kê số lần khách hàng đặt phòng thành công */}
            {
                dsThongKeSoLanDatPhongThanhCongCuaKhachHang && dsThongKeSoLanDatPhongThanhCongCuaKhachHang.length > 0 && detailReportSoLanDatPhongThanhCong === false &&
                <Stack mt='35px' overflow='auto' >
                    <ResponsiveContainer width="100%" height={450}>
                        <BarChart width={1300} height={450} data={dsThongKeSoLanDatPhongThanhCongCuaKhachHangCustome}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hoTenCustome" label={{ value: 'Khách hàng', position: 'insideBottom' }} interval={0} />
                            <YAxis allowDecimals={false} label={{ value: 'Số lần đặt phòng', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="số_lần_đặt_phòng" fill="#f45c43" />
                        </BarChart>
                    </ResponsiveContainer>
                </Stack>
            }
            {/* Char thống kê số lần khách hàng hủy đặt phòng */}
            {
                dsThongKeSoLanHuyDatPhongCuaKhachHang && dsThongKeSoLanHuyDatPhongCuaKhachHang.length > 0 && detailReportSoLanHuyDatPhong === false &&
                <Stack mt='35px' overflow='auto' >
                    <ResponsiveContainer width="100%" height={450}>
                        <BarChart width={1300} height={450} data={dsThongKeSoLanHuyDatPhongCuaKhachHangCustome}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hoTenCustome" label={{ value: 'Khách hàng', position: 'insideBottom' }} interval={0} />
                            <YAxis allowDecimals={false} label={{ value: 'Số lần hủy đặt phòng', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="số_lần_hủy_đặt_phòng" fill="#f45c43" />
                        </BarChart>
                    </ResponsiveContainer>
                </Stack>
            }




            {/* Toast Thông báo */}
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
            <PopupPrintThongKeKhachHangDatPhongThanhCong openPopupPrintSoLanKhachHangDatPhongThanhCong={openPopupPrintSoLanKhachHangDatPhongThanhCong} setOpenPopupPrintSoLanKhachHangDatPhongThanhCong={setOpenPopupPrintSoLanKhachHangDatPhongThanhCong} dsThongKeSoLanDatPhongThanhCongCuaKhachHang={dsThongKeSoLanDatPhongThanhCongCuaKhachHang} search={search} />

            <PopupPrintThongKeSoLanHuyDatPhongKhachHang openPopupPrintSoLanKhachHangHuyDatPhong={openPopupPrintSoLanKhachHangHuyDatPhong} setOpenPopupPrintSoLanKhachHangHuyDatPhong={setOpenPopupPrintSoLanKhachHangHuyDatPhong} dsThongKeSoLanHuyDatPhongCuaKhachHang={dsThongKeSoLanHuyDatPhongCuaKhachHang} search={search} />

        </StyledContainer>
    )
}

export default FrmThongKeKhachHang
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: red; */
  padding: 20px;
  table {
    .row-selected {
      
        background: linear-gradient(to bottom, #ee0979, #ff6a00);
      
    }
  }
`;
const StyledPaper = styled(Paper)`
height: 495px;
overflow: auto;
margin-top: 12px;
&::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`
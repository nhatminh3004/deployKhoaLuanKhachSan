import { Box, Grid, Paper, TextField, Typography, Button, Stack, Autocomplete, IconButton } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import dayjs from 'dayjs';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import axios from 'axios';
import { getAllHoaDonTheoNgay, getRoomsRoute, thongKeDoanhThuTheoPhong, thongKeSoLanDatPhong } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { Toast, ToastContainer, FloatingLabel, Form, Table } from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';

import { DatePicker } from '@mui/x-date-pickers';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PopupPrintThongKeSoLanDatPhong from './PopupPrintThongKeSoLanDatPhong';
import { Empty } from 'antd';
import PopupPrintDoanhThuTheoTungPhong from './PopupPrintDoanhThuTheoTungPhong';

function FrmThongKePhong() {
    let ngayHienTai = new Date();
    const [toast, setToast] = useState(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [dsThongKeSoLanDatPhong, setdsThongKeSoLanDatPhong] = useState(undefined);
    const [detailReportSoLanDatPhong, setDetailReportSoLanDatPhong] = useState(false);
    const [hienThiChartDoanhThuTheoTungPhong, setHienThiChartDoanhThuTheoTungPhongDoanhThuTheoTungPhong] = useState(undefined);
    const [dsThongKeSoLanDatPhongCustome, setdsThongKeSoLanDatPhongCustome] = useState(undefined);
    const [tempdsHoaDon, setTempdsHoaDon] = useState(undefined);
    const [dsPhong, setDSPhong] = useState(undefined);
    const [currentTongTienTungPhongMangLai, setCurrentTongTienTungPhongMangLai] = useState(0);
    const [dsChartThongKeDoanhThuTungPhongMangLai, setDsChartThongKeDoanhThuTungPhongMangLai] = useState(undefined);
    const [openPopupPrintSoLanDatPhong, setOpenPopupPrintSoLanDatPhong] = useState(false);
    const [openPopupPrintDoanhThuTheoPhong, setOpenPopupPrintDoanhThuTheoPhong] = useState(false);
    const dsTongTienTempTungPhongMangLai = [];
    const dsChartThongKeDoanhThuTungPhong = [];


    useEffect(() => {
        if (dsThongKeSoLanDatPhong && dsThongKeSoLanDatPhong.length === 0) {
            setIsEmpty(true);
        }
    }, [dsThongKeSoLanDatPhong])
    useEffect(() => {
        if (dsPhong && dsPhong.length > 0 && tempdsHoaDon && tempdsHoaDon.length > 0) {
            setIsEmpty(false);
        }
        if (tempdsHoaDon && tempdsHoaDon.length === 0) {
            setIsEmpty(true);
        }
        if (tinhTongTienCuaMoiPhongMangLai) {
            setDsChartThongKeDoanhThuTungPhongMangLai(dsChartThongKeDoanhThuTungPhong)
        }
    }, [tempdsHoaDon])


    useEffect(() => {
        if (dsThongKeSoLanDatPhong) {
            const newDsThongKeSoLanDatPhong = dsThongKeSoLanDatPhong.map((obj) => {
                return {
                    ...obj,
                    số_lần_đặt_phòng: obj.tongSoLanDat
                }
            })
            setdsThongKeSoLanDatPhongCustome(newDsThongKeSoLanDatPhong)
        }

    }, [dsThongKeSoLanDatPhong])
    const diff_hours = (dt2, dt1) => {
        // var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        // diff /= 60 * 60;
        // return Math.abs(Math.round(diff));
        const millisecondsPerHour = 1000 * 60 * 60;
        const differenceInMilliseconds = dt1 - dt2;
        const totalHours = Math.ceil(differenceInMilliseconds / millisecondsPerHour);
        // console.log('totalHours', totalHours);
        return totalHours;
    };
    const loadAllRoomFromDB = async () => {
        const { data } = await axios.get(getRoomsRoute, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data) {
            setDSPhong(data)
        }
    }
    const [search, setSearch] = useState({
        tuNgay: undefined,
        denNgay: dayjs(ngayHienTai),
        theo: "",
        ngayHienTai: dayjs(ngayHienTai)
    });
    useEffect(() => {
        handleRefesh();
    }, [search])
    useEffect(() => {
        loadAllRoomFromDB();
    }, [search])
    const handleOnchangeSelectedCombobox = (e, value) => {

        setSearch({ ...search, theo: value })
    }
    const handlOnChangeTuNgay = (date) => {
        setSearch({ ...search, tuNgay: date })
    }
    const handlOnChangeDenNgay = (date) => {
        setSearch({ ...search, denNgay: date })
    }
    useEffect(() => {
        if (search.theo === null) {
            setIsEmpty(true);
        }

    }, [search])

    const handleThongKePhongTheoSoLanDatPhong = async () => {
        console.log("Thống kê theo :", search);
        const { data } = await axios.post(thongKeSoLanDatPhong, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Data Thong Ke So Lan Dat Phong :", data);
        if (data) {
            setdsThongKeSoLanDatPhong(data);
            setIsEmpty(false);
        }
    }
    const handleThongKeTongDoanhThuTheoTungPhong = async () => {
        console.log("Thống kê theo :", search);
        const { data } = await axios.post(getAllHoaDonTheoNgay, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        // console.log("Data Thong Ke Doanh Thu :", data);
        if (data) {
            setTempdsHoaDon(data);
        }
        setHienThiChartDoanhThuTheoTungPhongDoanhThuTheoTungPhong(false);

    }
    const tinhTongTienCuaMoiPhongMangLai = (phong) => {
        let price = 0;
        tempdsHoaDon.map((hoadon) => {
            hoadon.dsPhong.map((phongofHoaDon) => {
                if (phongofHoaDon.maPhong === phong.maPhong) {
                    let giaPhong = phongofHoaDon.giaPhong;
                    let ngayNhan = new Date(hoadon.ngayNhanPhong)
                    let ngayTra = new Date(hoadon.ngayTraPhong);
                    let totalHour = diff_hours(ngayNhan, ngayTra)
                    let tongTien = giaPhong * totalHour;
                    price = Number(price) + Number(tongTien)
                    // price = price + 2;
                }
            })
        })
        // console.log("Object Chart :", { phong: phong.maPhong, price });
        dsChartThongKeDoanhThuTungPhong.push({ phong: phong.maPhong, tổng_tiền: price });
        // setDsChartThongKeDoanhThuTungPhong((preState) => [...preState, { Phong: phong.maPhong, price }]);
        dsTongTienTempTungPhongMangLai.push(price);
        return price;
    }
    const handleRefesh = () => {
        setdsThongKeSoLanDatPhong(undefined);
        setdsThongKeSoLanDatPhongCustome(undefined);
        setTempdsHoaDon(undefined);
        setDSPhong(undefined);
    }
    const handleDetailReport = () => {
        setDetailReportSoLanDatPhong(true);
    }
    const handleDetailReportDoanhThuTheoTungPhong = () => {
        setHienThiChartDoanhThuTheoTungPhongDoanhThuTheoTungPhong(true);
    }
    const handlePrintThongKeSoLanDatPhong = () => {
        setOpenPopupPrintSoLanDatPhong(true);
    }
    const handlePrintDoanhThuTungPhongMangLai = () => {
        setCurrentTongTienTungPhongMangLai(dsTongTienTempTungPhongMangLai.reduce((preValue, currentValue) => preValue + currentValue))
        setOpenPopupPrintDoanhThuTheoPhong(true)
    }
    // console.log("DSTEMPHOADON:", tempdsHoaDon);
    // console.log("DSPhong:", dsPhong);
    // console.log("SoLanDatPhongCustome:", dsThongKeSoLanDatPhongCustome);
    console.log("detailReportDoanhThuTheoTungPhong:", hienThiChartDoanhThuTheoTungPhong);
    console.log("isEmpty:", isEmpty);
    console.log('Chart Thong Ke Tung Phong Mang Lai : ', dsChartThongKeDoanhThuTungPhongMangLai);
    // console.log("dsTongTienTempTungPhongMangLai:", dsTongTienTempTungPhongMangLai);
    console.log("currentTongTienTungPhongMangLai:", currentTongTienTungPhongMangLai);
    // console.log('Search', search.theo)
    return (
        <StyledContainer>
            {/* <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Thống kê phòng</Typography>
            </Box> */}
            <Grid container spacing={2} >
                <Grid item md={12}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Số lần đặt phòng', 'Tổng doanh thu theo từng phòng']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Thống kê phòng theo" disabled />}
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
                    {search.theo === "Số lần đặt phòng" && <Button sx={{
                        backgroundColor: '#198754', '&:hover': {
                            backgroundColor: '#198754'
                        }
                    }} fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatPhong() }} >Thống kê số lần đặt phòng</Button>}
                    {search.theo === "Tổng doanh thu theo từng phòng" && <Button sx={{
                        backgroundColor: '#0D6EFD', '&:hover': {
                            backgroundColor: '#0D6EFD',
                        }
                    }} fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKeTongDoanhThuTheoTungPhong() }} >Thống kê doanh thu từng phòng</Button>}
                </Grid>

                <Grid item md={4}>
                    {search.theo === "Số lần đặt phòng" && <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { handleDetailReport() }} >Xem chi tiết báo cáo</Button>}
                    {search.theo === "Tổng doanh thu theo từng phòng" && hienThiChartDoanhThuTheoTungPhong === false && <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { handleDetailReportDoanhThuTheoTungPhong() }} >Xem biểu đồ thống kê</Button>}
                </Grid>

                <Grid item md={4}>
                    {search.theo === "Số lần đặt phòng" && <Button sx={{
                        backgroundColor: '#FFC107', '&:hover': {
                            backgroundColor: '#FFC107',
                        }
                    }} fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrintThongKeSoLanDatPhong() }} >In thống kê số lần đặt phòng</Button>}
                    {search.theo === "Tổng doanh thu theo từng phòng" && hienThiChartDoanhThuTheoTungPhong === false && <Button sx={{
                        backgroundColor: '#FFC107', '&:hover': {
                            backgroundColor: '#FFC107',
                        }
                    }} fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrintDoanhThuTungPhongMangLai() }} >In thống kê doanh thu từng phòng</Button>}
                </Grid>



            </Grid>
            {/* Hiển thị khi không có dữ liệu */}
            {isEmpty === true && <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 200 }}
                description={
                    <span>
                        Không có dữ liệu
                    </span>
                }>

            </Empty>}

            {/* Danh sách kết quả thống kê theo số lần đặt phòng */}
            {dsThongKeSoLanDatPhong && dsThongKeSoLanDatPhong.length > 0 && detailReportSoLanDatPhong === true &&
                <StyledPaper elevation={10}>
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <Box flexGrow={1}>

                        </Box>
                        <IconButton color="inherit" aria-label="close" onClick={() => {
                            setDetailReportSoLanDatPhong(false);

                        }}>
                            <CloseIcon />
                        </IconButton>

                    </Stack>
                    <Table striped hover>

                        <thead>
                            <tr>
                                <th>Mã phòng</th>
                                <th >Tên phòng</th>
                                <th>Giá phòng</th>
                                <th>Tầng</th>
                                <th>Loại phòng</th>
                                <th>Tổng số lần đặt phòng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dsThongKeSoLanDatPhong && dsThongKeSoLanDatPhong.length > 0 ? dsThongKeSoLanDatPhong.map((data) => (
                                <tr key={data.maPhong}  >
                                    <td >
                                        {data.maPhong}
                                    </td>
                                    <td>
                                        {data.tenPhong}
                                    </td>
                                    <td>
                                        {`${data.giaPhong.toLocaleString()} VND/giờ`}
                                    </td>
                                    <td>
                                        {data.tenTang}
                                    </td>
                                    <td>
                                        {data.tenLoaiPhong}
                                    </td>
                                    <td>
                                        {data.tongSoLanDat}
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
            {/* Char thống kê số lần đặt phòng */}
            {
                dsThongKeSoLanDatPhong && dsThongKeSoLanDatPhong.length > 0 && detailReportSoLanDatPhong === false &&
                <Stack mt='35px' overflow='auto' >
                    <ResponsiveContainer width="100%" height={450}>
                        <BarChart width={1300} height={450} data={dsThongKeSoLanDatPhongCustome}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="maPhong" label={{ value: 'Phòng', position: 'insideBottom' }} interval={0} />
                            <YAxis allowDecimals={false} label={{ value: 'Số lần đặt phòng', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="số_lần_đặt_phòng" fill="#f45c43" />
                        </BarChart>
                    </ResponsiveContainer>
                </Stack>
            }
            {/* Char thống kê doanh thu theo từng phòng */}
            {
                tempdsHoaDon && tempdsHoaDon.length > 0 && hienThiChartDoanhThuTheoTungPhong === true &&
                <Stack mt='35px' overflow='auto' >
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <Box flexGrow={1}>
                        </Box>
                        <IconButton color="inherit" aria-label="close" onClick={() => {
                            setHienThiChartDoanhThuTheoTungPhongDoanhThuTheoTungPhong(false);
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart width={1300} height={400} data={dsChartThongKeDoanhThuTungPhongMangLai}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="phong" label={{ value: 'Phòng', position: 'insideBottom' }} interval={0} />
                            <YAxis allowDecimals={false} label={{ value: 'Tổng tiền', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="tổng_tiền" fill="#f45c43" />
                        </BarChart>
                    </ResponsiveContainer>
                </Stack>
            }

            {/* Danh Sách Thống kê tổng tiền của từng phòng mang lại cho khách sạn */}
            {dsPhong && dsPhong.length > 0 && tempdsHoaDon && tempdsHoaDon.length > 0 && hienThiChartDoanhThuTheoTungPhong === false &&
                <StyledPaper elevation={10}>
                    <Table striped hover>
                        <thead >
                            <tr>
                                <th><>Mã phòng</></th>
                                <th><>Tên phòng</></th>
                                <th><>Giá phòng</></th>
                                <th><>Tầng</></th>
                                <th><>Loại phòng</></th>
                                <th><>Tổng tiền</></th>

                            </tr>
                        </thead>
                        <tbody>
                            {dsPhong && dsPhong.length > 0 ? dsPhong.map((phong) => (
                                <tr key={phong.maPhong}  >
                                    <td>
                                        {phong.maPhong}
                                    </td>
                                    <td>
                                        {phong.tenPhong}
                                    </td>
                                    <td>
                                        {`${phong.giaPhong.toLocaleString()} VND/giờ`}
                                    </td>
                                    <td>
                                        {phong.tenTang}
                                    </td>
                                    <td>
                                        {phong.tenLoaiPhong}
                                    </td>
                                    <td>
                                        {`${tinhTongTienCuaMoiPhongMangLai(phong).toLocaleString()} VND`}
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
            <PopupPrintThongKeSoLanDatPhong openPopupPrintSoLanDatPhong={openPopupPrintSoLanDatPhong} setOpenPopupPrintSoLanDatPhong={setOpenPopupPrintSoLanDatPhong} dsThongKeSoLanDatPhong={dsThongKeSoLanDatPhong} search={search} />
            <PopupPrintDoanhThuTheoTungPhong openPopupPrintDoanhThuTheoPhong={openPopupPrintDoanhThuTheoPhong} setOpenPopupPrintDoanhThuTheoPhong={setOpenPopupPrintDoanhThuTheoPhong} search={search} currentTongTienTungPhongMangLai={currentTongTienTungPhongMangLai} dsPhong={dsPhong} tempdsHoaDon={tempdsHoaDon} />
        </StyledContainer>
    )
}

export default FrmThongKePhong
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
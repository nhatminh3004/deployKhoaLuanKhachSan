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
import { thongKeSoLanDatDichVu } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PopupPrintThongKeSoLanDatDichVu from './PopupPrintThongKeSoLanDatDichVu';

function FrmThongKeDichVu() {
    let ngayHienTai = new Date();
    const [toast, setToast] = useState(null);
    const [dsThongKeSoLanDatDichVu, setdsThongKeSoLanDatDichVu] = useState(undefined);
    const [dsThongKeSoLanDatDichVuCustome, setdsThongKeSoLanDatDichVuCustome] = useState(undefined);
    const [detailReportSoLanDatDichVu, setDetailReportSoLanDatDichVu] = useState(false);
    const [openPopupPrintSoLanDatDichVu, setOpenPopupPrintSoLanDatDichVu] = useState(false);

    const [search, setSearch] = useState({
        tuNgay: undefined,
        denNgay: dayjs(ngayHienTai),
        theo: "",
        ngayHienTai: dayjs(ngayHienTai)
    });
    useEffect(() => {
        setdsThongKeSoLanDatDichVu(undefined);
    }, [search])
    useEffect(() => {
        if (dsThongKeSoLanDatDichVu) {
            const newDsThongKeSoLanDatDichVu = dsThongKeSoLanDatDichVu.map((obj) => {
                return {
                    ...obj,
                    số_lần_đặt_dịch_vụ: obj.tongSoLanDatDichVu,
                    truc_x_chart: `${obj.tenDichVu}(${obj.donViTinh})`
                }
            })
            setdsThongKeSoLanDatDichVuCustome(newDsThongKeSoLanDatDichVu)
        }

    }, [dsThongKeSoLanDatDichVu])

    const handleOnchangeSelectedCombobox = (e, value) => {

        setSearch({ ...search, theo: value })
    }
    const handlOnChangeTuNgay = (date) => {
        setSearch({ ...search, tuNgay: date })
    }
    const handlOnChangeDenNgay = (date) => {
        setSearch({ ...search, denNgay: date })
    }

    const handleThongKePhongTheoSoLanDatDichVu = async () => {
        console.log("Thống kê theo :", search);
        const { data } = await axios.post(thongKeSoLanDatDichVu, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Data Thong Ke So Lan Dat Dich Vu :", data);
        if (data) {
            setdsThongKeSoLanDatDichVu(data);

        }
    }
    const handlePrintThongKeSoLanDatDichVu = () => {
        setOpenPopupPrintSoLanDatDichVu(true);
    }
    const handleDetailReportSoLanDatPhong = () => {
        setDetailReportSoLanDatDichVu(true);
    }

    console.log('Chart Thong Ke So Lan Dat Dich Vu Custome:', dsThongKeSoLanDatDichVuCustome);
    return (
        <StyledContainer>

            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Số lần đặt dịch vụ']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Thống kê dịch vụ theo" disabled />}
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

                    {search.theo === "Số lần đặt dịch vụ" && <Button sx={{
                        backgroundColor: '#198754', '&:hover': {
                            backgroundColor: '#198754'
                        }
                    }} fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatDichVu() }} >Thống kê số lần đặt dịch vụ</Button>}

                </Grid>
                <Grid item md={4}>
                    {search.theo === "Số lần đặt dịch vụ" && <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { handleDetailReportSoLanDatPhong() }} >Xem chi tiết báo cáo</Button>}
                </Grid>
                <Grid item md={4}>
                    {search.theo === "Số lần đặt dịch vụ" && <Button sx={{
                        backgroundColor: '#FFC107', '&:hover': {
                            backgroundColor: '#FFC107',
                        }
                    }} fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrintThongKeSoLanDatDichVu() }} >In thống kê số lần đặt dịch vụ</Button>}
                </Grid>



            </Grid>
            {/* Danh sách kết quả thống kê theo số lần đặt dịch vụ */}
            {dsThongKeSoLanDatDichVu && dsThongKeSoLanDatDichVu.length > 0 && detailReportSoLanDatDichVu === true &&
                <StyledPaper elevation={10} >
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <Box flexGrow={1}>

                        </Box>
                        <IconButton color="inherit" aria-label="close" onClick={() => {
                            setDetailReportSoLanDatDichVu(false);

                        }}>
                            <CloseIcon />
                        </IconButton>

                    </Stack>
                    <Table striped hover>
                        <thead >
                            <tr>
                                <th><>Mã dịch vụ</></th>
                                <th><>Tên dịch vụ</></th>
                                <th><>Giá dịch vụ</></th>
                                <th><>Số lượng tồn kho</></th>
                                <th><>Đơn vị tính</></th>
                                <th><>Tên loại dịch vụ</></th>
                                <th><>Tổng số lần đặt dịch vụ</></th>

                            </tr>
                        </thead>
                        <tbody>
                            {dsThongKeSoLanDatDichVu && dsThongKeSoLanDatDichVu.length > 0 ? dsThongKeSoLanDatDichVu.map((data) => (
                                <tr key={data.maPhong}  >
                                    <td >
                                        {data.maDichVu}
                                    </td>
                                    <td  >
                                        {data.tenDichVu}
                                    </td>
                                    <td  >
                                        {`${data.giaDichVu.toLocaleString()} VND`}
                                    </td>
                                    <td  >
                                        {data.soLuongTon}
                                    </td>
                                    <td  >
                                        {data.donViTinh}
                                    </td>
                                    <td  >
                                        {data.tenLoaiDichVu}
                                    </td>
                                    <td  >
                                        {data.tongSoLanDatDichVu}
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
            {/* Char thống kê số lần đặt dịch vụ */}
            {
                dsThongKeSoLanDatDichVu && dsThongKeSoLanDatDichVu.length > 0 && detailReportSoLanDatDichVu === false &&
                <Stack mt='35px' overflow='auto' >
                    <ResponsiveContainer width="100%" height={450}>
                        <BarChart width={1300} height={450} data={dsThongKeSoLanDatDichVuCustome}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="truc_x_chart" label={{ value: 'Dịch vụ', position: 'insideBottom' }} interval={0} />
                            <YAxis allowDecimals={false} label={{ value: 'Số lần đặt dịch vụ', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="số_lần_đặt_dịch_vụ" fill="#f45c43" />
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
            <PopupPrintThongKeSoLanDatDichVu openPopupPrintSoLanDatDichVu={openPopupPrintSoLanDatDichVu} setOpenPopupPrintSoLanDatDichVu={setOpenPopupPrintSoLanDatDichVu} dsThongKeSoLanDatDichVu={dsThongKeSoLanDatDichVu} search={search} />

        </StyledContainer>
    )
}

export default FrmThongKeDichVu
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
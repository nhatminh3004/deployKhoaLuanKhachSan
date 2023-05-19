import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'
import { Toast, ToastContainer, FloatingLabel, Form, Table } from "react-bootstrap";
import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import moment from 'moment/moment';

const PopupPrintThongKeKhachHangDatPhongThanhCong = (props) => {

    const { setOpenPopupPrintSoLanKhachHangDatPhongThanhCong, openPopupPrintSoLanKhachHangDatPhongThanhCong, dsThongKeSoLanDatPhongThanhCongCuaKhachHang, search } = props;
    const thongTinNhanVien = localStorage.getItem("nhanVien")
    const nhanVien = JSON.parse(thongTinNhanVien)
    const componentRef = useRef();
    const handlePrint = () => {
        window.print();
    }


    return (
        <Dialog open={openPopupPrintSoLanKhachHangDatPhongThanhCong} fullScreen>
            <DialogTitle>
                <Stack flexDirection='row' justifyContent='space-between'>
                    <Box flexGrow={1}>
                        In báo cáo
                    </Box>
                    <IconButton color="inherit" aria-label="close" onClick={() => {
                        setOpenPopupPrintSoLanKhachHangDatPhongThanhCong(false)

                    }}>
                        <CloseIcon />
                    </IconButton>

                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Box ref={componentRef}>
                    <img src="/logo.png" style={{ width: '100px', height: '90px' }} alt="error" />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h3' color='red'>Khách Sạn Sama</Typography>
                    </Box>
                    <Stack flexDirection='column' >
                        <Stack flexDirection='row' >
                            <Typography variant='h5' color='red'>Điện thoại:</Typography>
                            <Typography variant='h5' ml='10px'>+84999555111</Typography>
                        </Stack>
                        <Stack flexDirection='row' >
                            <Typography variant='h5' color='red'>Địa chỉ:</Typography>
                            <Typography variant='h5'>45 Nguyễn Văn Bảo - Quận Gò Vấp - TP Hồ Chí Minh</Typography>
                        </Stack>
                        <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Ngày lập báo cáo:</Typography>
                            <Typography variant='h5' ml='10px'>{search.ngayHienTai.format('DD/MM/YYYY')}</Typography>
                        </Stack>

                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
                        <Typography variant='h4' color='dodgerblue'>Báo cáo số lần đặt phòng thành công của khách hàng</Typography>
                    </Box>
                    <Stack flexDirection='row' justifyContent='space-between'  >

                        <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Từ ngày:</Typography>
                            <Typography variant='h5' ml='10px'>{search.tuNgay && search.tuNgay.format('DD/MM/YYYY')}</Typography>
                        </Stack>

                        <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Đến ngày:</Typography>
                            <Typography variant='h5' ml='10px'>{search.denNgay.format('DD/MM/YYYY')}</Typography>
                        </Stack>

                    </Stack>
                    <Paper variant='outlined' sx={{ mt: '11px' }}>
                        <Stack flexDirection='column'>
                            <Stack flexDirection='row' >
                                <Typography variant='h5' color='red'>Họ tên nhân viên:</Typography>
                                <Typography variant='h5' ml='10px'>{nhanVien.hoTen}</Typography>
                            </Stack>
                            <Stack flexDirection='row' >
                                <Typography variant='h5' color='red'>Email:</Typography>
                                <Typography variant='h5' ml='10px'>{nhanVien.email}</Typography>
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'  >

                                <Stack flexDirection='row'>
                                    <Typography variant='h5' color='red'>Địa chỉ:</Typography>
                                    <Typography variant='h5' ml='10px'>{nhanVien.diaChi}</Typography>
                                </Stack>

                                <Stack flexDirection='row'>
                                    <Typography variant='h5' color='red'>Số điện thoại:</Typography>
                                    <Typography variant='h5' ml='10px'>{nhanVien.soDienThoai}</Typography>
                                </Stack>
                            </Stack>

                        </Stack>
                    </Paper>

                    {dsThongKeSoLanDatPhongThanhCongCuaKhachHang && dsThongKeSoLanDatPhongThanhCongCuaKhachHang.length > 0 &&
                        <Paper elevation={10} sx={{ mt: '30px' }}>
                            <Table striped hover>

                                <thead>
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

                        </Paper>}
                    <Box sx={{ mt: '20px' }}>
                        <Stack flexDirection='row' justifyContent='space-between'  >

                            <Stack flexDirection='row'>

                            </Stack>


                        </Stack>
                        <Stack flexDirection='row' justifyContent='space-between'  >

                            <Stack flexDirection='row'>

                            </Stack>

                            {/* <Stack flexDirection='row'>

                                <Typography variant='h5'>Tiền nhận : 100 <Divider sx={{ backgroundColor: 'black' }} /> </Typography>
                            </Stack> */}


                        </Stack>
                        <Stack flexDirection='row' justifyContent='space-between'  >

                            <Stack flexDirection='row'>

                            </Stack>

                            {/* <Stack flexDirection='row'>

                                <Typography variant='h5'>Tiền thối lại : 100  </Typography>
                            </Stack> */}


                        </Stack>
                        <Box>
                            <Typography variant='h5' align='center' >
                                Khách Sạn Sama Gò Vấp
                            </Typography>
                            <Divider sx={{ backgroundColor: 'black' }} variant='fullWidth' ></Divider>
                        </Box>

                    </Box>
                    <Box>

                    </Box>

                </Box>

                <ReactToPrint trigger={() => (

                    <Button variant='contained' sx={{ marginTop: '20px' }} fullWidth onClick={() => handlePrint()}>Xuất báo cáo</Button>


                )}
                    content={() => componentRef.current}
                />
            </DialogContent>

        </Dialog >
    )
}

export default PopupPrintThongKeKhachHangDatPhongThanhCong

import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'

import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Toast, ToastContainer, FloatingLabel, Form, Table } from "react-bootstrap";


const PopupPrintDoanhThuTheoTungPhong = (props) => {

    const { setOpenPopupPrintDoanhThuTheoPhong, openPopupPrintDoanhThuTheoPhong, dsPhong, tempdsHoaDon, search, currentTongTienTungPhongMangLai } = props;
    const thongTinNhanVien = localStorage.getItem("nhanVien")
    const nhanVien = JSON.parse(thongTinNhanVien)
    const componentRef = useRef();
    const handlePrint = () => {
        window.print();
    }
    //Hàm tính giờ
    const diff_hours = (dt2, dt1) => {
        const millisecondsPerHour = 1000 * 60 * 60;
        const differenceInMilliseconds = dt1 - dt2;
        const totalHours = Math.ceil(differenceInMilliseconds / millisecondsPerHour);
        // console.log('totalHours', totalHours);
        return totalHours;
    };
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

        return price;
    }
    return (
        <Dialog open={openPopupPrintDoanhThuTheoPhong} fullScreen>
            <DialogTitle>
                <Stack flexDirection='row' justifyContent='space-between'>
                    <Box flexGrow={1}>
                        In báo cáo
                    </Box>
                    <IconButton color="inherit" aria-label="close" onClick={() => {
                        setOpenPopupPrintDoanhThuTheoPhong(false)

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
                        <Typography variant='h4' color='dodgerblue'>Báo cáo doanh thu phòng</Typography>
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

                    {/* Danh Sách Thống kê tổng tiền của từng phòng mang lại cho khách sạn */}
                    {dsPhong && dsPhong.length > 0 && tempdsHoaDon && tempdsHoaDon.length > 0 &&
                        <Paper elevation={10} sx={{}}>

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
                        </Paper>}


                    <Box sx={{ mt: '20px' }}>
                        <Stack flexDirection='row' justifyContent='space-between'  >

                            <Stack flexDirection='row'>

                            </Stack>

                            <Stack flexDirection='row' mt='20px'>
                                <Typography variant='h5' color='red'>Tổng doanh thu phòng:</Typography>
                                <Typography variant='h5' ml='10px'> {currentTongTienTungPhongMangLai.toLocaleString()} VND</Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection='row' justifyContent='space-between'  >

                            <Stack flexDirection='row'>

                            </Stack>
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
                                Khách sạn Sama Gò Vấp
                            </Typography>
                            <Divider sx={{ backgroundColor: 'black' }} variant='fullWidth' ></Divider>
                        </Box>

                    </Box>
                </Box>
                <ReactToPrint trigger={() => (
                    <Button variant='contained' onClick={() => handlePrint()}>Xuất báo cáo</Button>
                )}
                    content={() => componentRef.current}
                />
            </DialogContent>

        </Dialog>
    )
}

export default PopupPrintDoanhThuTheoTungPhong

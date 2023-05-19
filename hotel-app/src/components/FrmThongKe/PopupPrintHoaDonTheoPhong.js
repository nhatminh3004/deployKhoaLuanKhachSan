import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'
import { Toast, ToastContainer, FloatingLabel, Form, Table } from "react-bootstrap";
import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import moment from 'moment/moment';

const PopupPrintHoaDonTheoPhong = (props) => {

    const { setOpenPopupPrint, openPopupPrint, dsHoaDonDaThanhToanDeThongKe, dsHoaDonDaThanhToanDeThongKeTheoThang, search, currentTongTienNam, isPrinHoaDonTheoNam, currentTongTienThang } = props;
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
    const tinhTongTienPhong = (data) => {
        let prices = 0;
        data.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(data.ngayNhanPhong)
            let ngayTra = new Date(data.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        return prices;
    }
    const tinhTongTienDichVu = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )




        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVu = (data) => {
        let pricePhong = 0;
        let priceDichVu = 0;
        let priceTong = 0
        data.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(data.ngayNhanPhong)
            let ngayTra = new Date(data.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            pricePhong = Number(pricePhong) + Number(tongTien)

        }
        )
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )
        priceTong = pricePhong + priceDichVu




        return priceTong;
    }
    // console.log("Thong tin hoa don theo tháng :", dsHoaDonDaThanhToanDeThongKeTheoThang);
    return (
        <Dialog open={openPopupPrint} fullScreen>
            <DialogTitle>
                <Stack flexDirection='row' justifyContent='space-between'>
                    <Box flexGrow={1}>
                        In báo cáo
                    </Box>
                    <IconButton color="inherit" aria-label="close" onClick={() => {
                        setOpenPopupPrint(false)

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
                        <Typography variant='h4' color='dodgerblue'>Báo cáo doanh thu khách sạn Sama</Typography>
                    </Box>
                    <Stack flexDirection='row' justifyContent='space-between'  >

                        {isPrinHoaDonTheoNam === true ? <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Doanh thu năm:</Typography>
                            <Typography variant='h5' ml='10px'>{search.tuNgay && search.tuNgay.format('YYYY')}</Typography>
                        </Stack> :
                            <Stack flexDirection='row'>
                                <Typography variant='h5' color='red'>Doanh thu tháng:</Typography>
                                <Typography variant='h5' ml='10px'>{search.tuNgay && search.tuNgay.format('MM/YYYY')}</Typography>
                            </Stack>}

                        {/* <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Đến ngày:</Typography>
                            <Typography variant='h5' ml='10px'>{search.denNgay.format('DD/MM/YYYY')}</Typography>
                        </Stack> */}

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

                    {isPrinHoaDonTheoNam === true && dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 &&
                        <Paper elevation={10}>

                            <Table striped hover>
                                <thead >
                                    <tr>
                                        <th><>Mã hoá đơn</></th>
                                        <th ><>Ngày lập hoá đơn</></th>
                                        <th ><>Tên khách hàng</></th>
                                        <th ><>Nhân viên lập hoá đơn</></th>
                                        <th ><>Ngày nhận phòng</></th>
                                        <th ><>Ngày trả phòng</></th>
                                        <th ><>Các phòng khách thuê</></th>
                                        <th ><>Các dịch vụ đã sử dụng</></th>
                                        <th ><>Tiền nhận</></th>
                                        <th ><>Tiền phòng</></th>
                                        <th ><>Tiền dịch vụ</></th>
                                        <th ><>Tổng Tiền</></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 ? dsHoaDonDaThanhToanDeThongKe.map((data) => (
                                        <tr key={data.maHoaDon}  >
                                            <td >
                                                {data.maHoaDon}
                                            </td>
                                            <td  >
                                                {moment(data.ngayLap).format(
                                                    "DD/MM/YYYY HH:MM"
                                                )}
                                            </td>
                                            <td  >
                                                {data.khachHang.hoTen}
                                            </td>

                                            <td  >
                                                {data.nhanVien.hoTen}
                                            </td>
                                            <td  >
                                                {moment(data.ngayNhanPhong).format(
                                                    "DD/MM/YYYY HH:MM"
                                                )}
                                            </td>
                                            <td  >
                                                {moment(data.ngayTraPhong).format(
                                                    "DD/MM/YYYY HH:MM"
                                                )}
                                            </td>
                                            <td  >
                                                {data.dsPhong.map((phong, index) => {
                                                    if (index === data.dsPhong.length - 1) {
                                                        return `${phong.tenPhong}`
                                                    }
                                                    else {
                                                        return `${phong.tenPhong},`
                                                    }

                                                })}
                                            </td>
                                            <td  >
                                                {data.dsChiTietDichVuDto.length > 0 ? data.dsChiTietDichVuDto.map((dv, index) => {
                                                    if (index === data.dsChiTietDichVuDto.length - 1) {
                                                        return `${dv.soLuong} ${dv.tenDichVu}(${dv.tenLoaiDichVu})`
                                                    }
                                                    else {
                                                        return ` ${dv.soLuong} ${dv.tenDichVu}(${dv.tenLoaiDichVu}),`
                                                    }

                                                }) : 'Không có'}
                                            </td>
                                            <td>
                                                {`${data.tienNhan.toLocaleString()} VND`}
                                            </td>

                                            <td  >
                                                {`${tinhTongTienPhong(data).toLocaleString()} VND`}
                                            </td>
                                            <td  >

                                                {
                                                    `${tinhTongTienDichVu(data).toLocaleString()} VND`
                                                }
                                            </td>
                                            <td  >

                                                {
                                                    `${tinhTongTienPhongVaDichVu(data).toLocaleString()} VND`
                                                }
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
                    {/* Ds Hóa Đơn Tháng */}
                    {isPrinHoaDonTheoNam === false && dsHoaDonDaThanhToanDeThongKeTheoThang && dsHoaDonDaThanhToanDeThongKeTheoThang.length > 0 &&
                        <Paper elevation={10} >

                            <Table striped hover>
                                <thead >
                                    <tr>
                                        <th><>Mã hoá đơn</></th>
                                        <th><>Ngày lập hoá đơn</></th>
                                        <th><>Tên khách hàng</></th>
                                        <th><>Nhân viên lập hoá đơn</></th>
                                        <th><>Ngày nhận phòng</></th>
                                        <th><>Ngày trả phòng</></th>
                                        <th><>Các phòng khách thuê</></th>
                                        <th><>Các dịch vụ đã sử dụng</></th>
                                        <th><>Tiền nhận</></th>
                                        <th><>Tiền phòng</></th>
                                        <th><>Tiền dịch vụ</></th>
                                        <th><>Tổng Tiền</></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {dsHoaDonDaThanhToanDeThongKeTheoThang && dsHoaDonDaThanhToanDeThongKeTheoThang.length > 0 ? dsHoaDonDaThanhToanDeThongKeTheoThang.map((data) => (
                                        <tr key={data.maHoaDon}  >
                                            <td >
                                                {data.maHoaDon}
                                            </td>
                                            <td  >
                                                {moment(data.ngayLap).format(
                                                    "DD/MM/YYYY HH:MM"
                                                )}
                                            </td>
                                            <td  >
                                                {data.khachHang.hoTen}
                                            </td>

                                            <td  >
                                                {data.nhanVien.hoTen}
                                            </td>
                                            <td  >
                                                {moment(data.ngayNhanPhong).format(
                                                    "DD/MM/YYYY HH:MM"
                                                )}
                                            </td>
                                            <td  >
                                                {moment(data.ngayTraPhong).format(
                                                    "DD/MM/YYYY HH:MM"
                                                )}
                                            </td>
                                            <td  >
                                                {data.dsPhong.map((phong, index) => {
                                                    if (index === data.dsPhong.length - 1) {
                                                        return `Phòng ${phong.maPhong}`
                                                    }
                                                    else {
                                                        return `Phòng ${phong.maPhong},`
                                                    }

                                                })}
                                            </td>
                                            <td  >
                                                {data.dsChiTietDichVuDto.length > 0 ? data.dsChiTietDichVuDto.map((dv, index) => {
                                                    if (index === data.dsChiTietDichVuDto.length - 1) {
                                                        return `${dv.soLuong} ${dv.tenDichVu}(${dv.tenLoaiDichVu})`
                                                    }
                                                    else {
                                                        return ` ${dv.soLuong} ${dv.tenDichVu}(${dv.tenLoaiDichVu}),`
                                                    }

                                                }) : 'Không có'}
                                            </td>
                                            <td  >
                                                {`${data.tienNhan.toLocaleString()} VND`}
                                            </td>

                                            <td  >

                                                {
                                                    `${tinhTongTienPhong(data).toLocaleString()} VND`
                                                }
                                            </td>
                                            <td  >

                                                {
                                                    `${tinhTongTienDichVu(data).toLocaleString()} VND`
                                                }
                                            </td>
                                            <td  >

                                                {
                                                    `${tinhTongTienPhongVaDichVu(data).toLocaleString()} VND`
                                                }
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
                                <Typography variant='h5' color='red'>Tổng doanh thu của khách sạn:</Typography>
                                {isPrinHoaDonTheoNam === true ? <Typography variant='h5' ml='10px'>{currentTongTienNam.toLocaleString()} VND</Typography> : <Typography variant='h5' ml='10px'>{currentTongTienThang.toLocaleString()} VND</Typography>}
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
                            <Typography variant='h5' align='center'  >
                                Khách sạn Sama Gò Vấp
                            </Typography>
                            <Divider sx={{ backgroundColor: 'black' }} variant='fullWidth' ></Divider>
                        </Box>

                    </Box>
                    <Box>

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

export default PopupPrintHoaDonTheoPhong

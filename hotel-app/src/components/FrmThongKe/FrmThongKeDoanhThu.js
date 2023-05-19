import { Box, Grid, Paper, TextField, Typography, Button, Radio, Chip, Stack, Autocomplete, IconButton } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import axios from 'axios';
import { thongKeDoanhThuTheoPhong, thongKeDoanhThuTheoThang } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { Toast, ToastContainer, FloatingLabel, Form, Table } from "react-bootstrap";
import moment from 'moment/moment';
import { DatePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import PopupPrintHoaDonTheoPhong from './PopupPrintHoaDonTheoPhong';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function FrmThongKeDoanhThu() {
    let ngayHienTai = new Date();

    const [openPopupPrint, setOpenPopupPrint] = useState(false);
    const [isPrinHoaDonTheoNam, setIsPrintHoaDonTheoNam] = useState(undefined);
    const [toast, setToast] = useState(null);
    const [dsHoaDonDaThanhToanDeThongKe, setDSHoaDonDaThanhToanDeThongKe] = useState(undefined);
    const [dsHoaDonDaThanhToanDeThongKeTheoThang, setDSHoaDonDaThanhToanDeThongKeTheoThang] = useState(undefined);
    const [detailReportDoanhThuPhongVaDichVuTheoThang, setDetailReportDoanhThuPhongVaDichVuTheoThang] = useState(false);
    const [detailReportDoanhThuPhongVaDichVu, setDetailReportDoanhThuPhongVaDichVu] = useState(false);
    // const [dsTongTien, setDSTongTien] = useState([]);
    const [currentTongTienNam, setCurrentTongTienNam] = useState(0);
    const [currentTongTienThang, setCurrentTongTienThang] = useState(0);
    const dsTongTienTemp = [];
    const [dsAllBillTheoThangTemp, setDsAllBillTheoThangTemp] = useState([])
    const dsTongTienTempThang = [];
    const dsTongTienPhongVaDichVuThang4 = [];
    const dsTongTienPhongTempThang4 = [];
    const dsTongTienDichVuTempThang4 = [];
    const dsTongTienPhongVaDichVuThang1 = [];
    const dsTongTienPhongTempThang1 = [];
    const dsTongTienDichVuTempThang1 = [];
    const dsTongTienPhongVaDichVuThang2 = [];
    const dsTongTienPhongTempThang2 = [];
    const dsTongTienDichVuTempThang2 = [];
    const dsTongTienPhongVaDichVuThang3 = [];
    const dsTongTienDichVuTempThang3 = [];
    const dsTongTienPhongTempThang3 = [];
    const dsTongTienPhongVaDichVuThang5 = [];
    const dsTongTienDichVuTempThang5 = [];
    const dsTongTienPhongTempThang5 = [];
    const dsTongTienPhongVaDichVuThang6 = [];
    const dsTongTienDichVuTempThang6 = [];
    const dsTongTienPhongTempThang6 = [];
    const dsTongTienPhongVaDichVuThang7 = [];
    const dsTongTienDichVuTempThang7 = [];
    const dsTongTienPhongTempThang7 = [];
    const dsTongTienPhongVaDichVuThang8 = [];
    const dsTongTienDichVuTempThang8 = [];
    const dsTongTienPhongTempThang8 = [];
    const dsTongTienPhongVaDichVuThang9 = [];
    const dsTongTienDichVuTempThang9 = [];
    const dsTongTienPhongTempThang9 = [];
    const dsTongTienPhongVaDichVuThang10 = [];
    const dsTongTienDichVuTempThang10 = [];
    const dsTongTienPhongTempThang10 = [];
    const dsTongTienPhongVaDichVuThang11 = [];
    const dsTongTienDichVuTempThang11 = [];
    const dsTongTienPhongTempThang11 = [];
    const dsTongTienPhongVaDichVuThang12 = [];
    const dsTongTienDichVuTempThang12 = [];
    const dsTongTienPhongTempThang12 = [];
    const [dsHoaDonChartTheoThang, setDSHoaDonChartTheoThang] = useState([]);
    const [dsHoaDonChartTheoTungNgayCuaThang, setDSHoaDonChartTheoTungNgayCuaThang] = useState(undefined);
    const [dsHoaDonChartTheoThang1, setDSHoaDonChartTheoThang1] = useState(undefined);
    const [dsHoaDonChartTheoThang2, setDSHoaDonChartTheoThang2] = useState(undefined);
    const [dsHoaDonChartTheoThang3, setDSHoaDonChartTheoThang3] = useState(undefined);
    const [dsHoaDonChartTheoThang4, setDSHoaDonChartTheoThang4] = useState(undefined);
    const [dsHoaDonChartTheoThang5, setDSHoaDonChartTheoThang5] = useState(undefined);
    const [dsHoaDonChartTheoThang6, setDSHoaDonChartTheoThang6] = useState(undefined);
    const [dsHoaDonChartTheoThang7, setDSHoaDonChartTheoThang7] = useState(undefined);
    const [dsHoaDonChartTheoThang8, setDSHoaDonChartTheoThang8] = useState(undefined);
    const [dsHoaDonChartTheoThang9, setDSHoaDonChartTheoThang9] = useState(undefined);
    const [dsHoaDonChartTheoThang10, setDSHoaDonChartTheoThang10] = useState(undefined);
    const [dsHoaDonChartTheoThang11, setDSHoaDonChartTheoThang11] = useState(undefined);
    const [dsHoaDonChartTheoThang12, setDSHoaDonChartTheoThang12] = useState(undefined);





    const handleRefesh = () => {
        setDSHoaDonDaThanhToanDeThongKe(undefined);
        setDSHoaDonDaThanhToanDeThongKeTheoThang(undefined);
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
    const tinhTongTienPhongThang = (data) => {
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
    const tinhTongTienDichVuThang = (data) => {
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
    const tinhTongTienPhongVaDichVuThang = (data) => {
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
        dsTongTienTempThang.push(priceTong)
        return priceTong;
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
        dsTongTienTemp.push(priceTong)
        return priceTong;
    }


    useEffect(() => {
        setDSHoaDonChartTheoThang([]);
        setDSHoaDonChartTheoTungNgayCuaThang(undefined);
        setDsAllBillTheoThangTemp([]);
        // setDSHoaDonDaThanhToanDeThongKeTheoThang([]);
    }, [search])
    useEffect(() => {
        createObjectHoaDonTheoThang();
    }, [dsHoaDonDaThanhToanDeThongKe])
    useEffect(() => {
        getAllBillTheoThangCoTongTienPhongVaDichVuTheoThang();

    }, [dsHoaDonDaThanhToanDeThongKeTheoThang])
    useEffect(() => {
        if (dsAllBillTheoThangTemp.length > 0) {
            const resultAllBillThang = getAllHoaDonChartThang(dsAllBillTheoThangTemp);
            // console.log('Result Chart Thang: ', resultAllBillThang);
            setDSHoaDonChartTheoTungNgayCuaThang(resultAllBillThang);
        }
    }, [dsAllBillTheoThangTemp])
    // useEffect(() => {
    //     if(dsAllBillTheoThangTemp.length>0){
    //         const resultAllBillThang= getAllHoaDonChartThang(dsAllBillTheoThangTemp);
    //         console.log('Result Chart Thang: ', resultAllBillThang);
    //     }
    // }, [dsAllBillTheoThangTemp])
    useEffect(() => {
        if (dsHoaDonChartTheoThang1 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang1])
        }
    }, [dsHoaDonChartTheoThang1])
    useEffect(() => {
        if (dsHoaDonChartTheoThang2 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang2])
        }
    }, [dsHoaDonChartTheoThang2])
    useEffect(() => {
        if (dsHoaDonChartTheoThang3 !== undefined) {
            console.log("Updating state with Tháng 3");
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang3])
        }
    }, [dsHoaDonChartTheoThang3])
    useEffect(() => {
        if (dsHoaDonChartTheoThang4 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang4])
        }
    }, [dsHoaDonChartTheoThang4])
    useEffect(() => {
        if (dsHoaDonChartTheoThang5 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang5])
        }
    }, [dsHoaDonChartTheoThang5])
    useEffect(() => {
        if (dsHoaDonChartTheoThang6 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang6])
        }
    }, [dsHoaDonChartTheoThang6])

    useEffect(() => {
        if (dsHoaDonChartTheoThang7 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang7])
        }
    }, [dsHoaDonChartTheoThang7])
    useEffect(() => {
        if (dsHoaDonChartTheoThang8 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang8])
        }
    }, [dsHoaDonChartTheoThang8])
    useEffect(() => {
        if (dsHoaDonChartTheoThang9 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang9])
        }
    }, [dsHoaDonChartTheoThang9])
    useEffect(() => {
        if (dsHoaDonChartTheoThang10 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang10])
        }
    }, [dsHoaDonChartTheoThang10])
    useEffect(() => {
        if (dsHoaDonChartTheoThang11 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang11])
        }
    }, [dsHoaDonChartTheoThang11])
    useEffect(() => {
        if (dsHoaDonChartTheoThang12 !== undefined) {
            setDSHoaDonChartTheoThang((prestate) => [...prestate, dsHoaDonChartTheoThang12])
        }
    }, [dsHoaDonChartTheoThang12])
    //Hàm tính giờ
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

    const handleOnchangeSelectedCombobox = (e, value) => {

        setSearch({ ...search, theo: value })
    }
    const handlOnChangeTuNgay = (date) => {
        setSearch({ ...search, tuNgay: date })
    }
    const handlOnChangeDenNgay = (date) => {
        setSearch({ ...search, denNgay: date })
    }

    const handleThongKeDoanhThuTheoPhong = async () => {
        console.log("Thống kê theo :", search);
        const { data } = await axios.post(thongKeDoanhThuTheoPhong, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Danh sách hóa đơn theo năm :", data);
        if (data) {
            setDSHoaDonDaThanhToanDeThongKe(data);
        }

    }
    const handleThongKeDoanhThuTheoThang = async () => {
        const { data } = await axios.post(thongKeDoanhThuTheoThang, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        // console.log("Danh sách hóa đơn theo tháng :", data);
        if (data) {
            setDSHoaDonDaThanhToanDeThongKeTheoThang(data);
        }


    }
    const handlePrint = () => {
        setCurrentTongTienNam(dsTongTienTemp.reduce((preValue, currentValue) => preValue + currentValue))
        setOpenPopupPrint(true);
        setIsPrintHoaDonTheoNam(true);
    }
    const handlePrintThang = () => {
        setCurrentTongTienThang(dsTongTienTempThang.reduce((preValue, currentValue) => preValue + currentValue))
        setOpenPopupPrint(true);
        setIsPrintHoaDonTheoNam(false);

    }
    const tinhTongTienPhongThang4 = (hoadon) => {
        console.log("Hóa đơn tháng 4 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang4.push(prices);
        return prices;
    }
    const tinhTongTienPhongThang1 = (hoadon) => {
        console.log("Hóa đơn tháng 1 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang1.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang1 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang1.push(priceDichVu)


        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang1 = (data) => {
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
        dsTongTienPhongVaDichVuThang1.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang2 = (hoadon) => {
        console.log("Hóa đơn tháng 1 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang2.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang2 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang2.push(priceDichVu)


        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang2 = (data) => {
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
        dsTongTienPhongVaDichVuThang2.push(priceTong)
        return priceTong;
    }
    const tinhTongTienDichVuThang4 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang4.push(priceDichVu)


        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang4 = (data) => {
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
        dsTongTienPhongVaDichVuThang4.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang3 = (hoadon) => {
        console.log("Hóa đơn tháng 3 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang3.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang3 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang3.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang3 = (data) => {
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
        dsTongTienPhongVaDichVuThang3.push(priceTong)
        return priceTong;
    }

    const tinhTongTienPhongThang5 = (hoadon) => {
        console.log("Hóa đơn tháng 5 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang5.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang5 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang5.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang5 = (data) => {
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
        dsTongTienPhongVaDichVuThang5.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang6 = (hoadon) => {
        console.log("Hóa đơn tháng 6 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang6.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang6 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang6.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang6 = (data) => {
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
        dsTongTienPhongVaDichVuThang6.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang7 = (hoadon) => {
        console.log("Hóa đơn tháng 7 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang7.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang7 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang7.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang7 = (data) => {
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
        dsTongTienPhongVaDichVuThang7.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang8 = (hoadon) => {
        console.log("Hóa đơn tháng 8 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang8.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang8 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang8.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang8 = (data) => {
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
        dsTongTienPhongVaDichVuThang8.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang9 = (hoadon) => {
        console.log("Hóa đơn tháng 9 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang9.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang9 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang9.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang9 = (data) => {
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
        dsTongTienPhongVaDichVuThang9.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang10 = (hoadon) => {
        console.log("Hóa đơn tháng 10 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang10.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang10 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang10.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang10 = (data) => {
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
        dsTongTienPhongVaDichVuThang10.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang11 = (hoadon) => {
        console.log("Hóa đơn tháng 11 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang11.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang11 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang11.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang11 = (data) => {
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
        dsTongTienPhongVaDichVuThang11.push(priceTong)
        return priceTong;
    }
    const tinhTongTienPhongThang12 = (hoadon) => {
        console.log("Hóa đơn tháng 12 :", hoadon);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang12.push(prices);
        return prices;
    }
    const tinhTongTienDichVuThang12 = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        dsTongTienDichVuTempThang12.push(priceDichVu)
        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVuThang12 = (data) => {
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
        dsTongTienPhongVaDichVuThang12.push(priceTong)
        return priceTong;
    }
    const createObjectHoaDonTheoThang = () => {

        dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 && dsHoaDonDaThanhToanDeThongKe.map((hoadon, index) => {
            let stringDate = moment(hoadon.ngayLap).format("DD/MM/YYYY");
            let [day, month, year] = stringDate.split("/");
            // console.log("month:", month);

            if (month === "04") {
                console.log("Chạy tháng 4");
                tinhTongTienPhongThang4(hoadon)
                tinhTongTienDichVuThang4(hoadon)
                tinhTongTienPhongVaDichVuThang4(hoadon)
                if (tinhTongTienPhongThang4 && tinhTongTienDichVuThang4 && tinhTongTienPhongVaDichVuThang4) {
                    if (dsTongTienPhongTempThang4.length > 0) {
                        // console.log("Tong Tien Tháng Tư Reduce:", dsTongTienPhongTempThang4.reduce((preValue, currentValue) => preValue + currentValue));
                        setDSHoaDonChartTheoThang4({
                            name: 'Tháng 4',
                            tienPhong: dsTongTienPhongTempThang4.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang4.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang4.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }

            }
            else if (month === "03") {
                console.log("Chạy tháng 3");
                tinhTongTienPhongThang3(hoadon)
                tinhTongTienDichVuThang3(hoadon)
                tinhTongTienPhongVaDichVuThang3(hoadon)
                if (tinhTongTienPhongThang3 && tinhTongTienDichVuThang3 && tinhTongTienPhongVaDichVuThang3) {
                    if (dsTongTienPhongTempThang3.length > 0) {
                        // console.log("Tong Tien Tháng ba Reduce:", dsTongTienPhongTempThang3.reduce((preValue, currentValue) => preValue + currentValue));
                        setDSHoaDonChartTheoThang3({
                            name: 'Tháng 3',
                            tienPhong: dsTongTienPhongTempThang3.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang3.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang3.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "01") {
                console.log("Chạy tháng 1");
                tinhTongTienPhongThang1(hoadon)
                tinhTongTienDichVuThang1(hoadon)
                tinhTongTienPhongVaDichVuThang1(hoadon)
                if (tinhTongTienPhongThang1 && tinhTongTienDichVuThang1 && tinhTongTienPhongVaDichVuThang1) {
                    if (dsTongTienPhongTempThang1.length > 0) {
                        // console.log("Tong Tien Tháng ba Reduce:", dsTongTienPhongTempThang3.reduce((preValue, currentValue) => preValue + currentValue));
                        setDSHoaDonChartTheoThang1({
                            name: 'Tháng 1',
                            tienPhong: dsTongTienPhongTempThang1.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang1.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang1.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "02") {
                console.log("Chạy tháng 2");
                tinhTongTienPhongThang2(hoadon)
                tinhTongTienDichVuThang2(hoadon)
                tinhTongTienPhongVaDichVuThang2(hoadon)
                if (tinhTongTienPhongThang2 && tinhTongTienDichVuThang2 && tinhTongTienPhongVaDichVuThang2) {
                    if (dsTongTienPhongTempThang2.length > 0) {
                        setDSHoaDonChartTheoThang2({
                            name: 'Tháng 2',
                            tienPhong: dsTongTienPhongTempThang2.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang2.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang2.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "05") {
                console.log("Chạy tháng 5");
                tinhTongTienPhongThang5(hoadon)
                tinhTongTienDichVuThang5(hoadon)
                tinhTongTienPhongVaDichVuThang5(hoadon)
                if (tinhTongTienPhongThang5 && tinhTongTienDichVuThang5 && tinhTongTienPhongVaDichVuThang5) {
                    if (dsTongTienPhongTempThang5.length > 0) {
                        setDSHoaDonChartTheoThang5({
                            name: 'Tháng 5',
                            tienPhong: dsTongTienPhongTempThang5.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang5.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang5.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "06") {
                console.log("Chạy tháng 6");
                tinhTongTienPhongThang6(hoadon)
                tinhTongTienDichVuThang6(hoadon)
                tinhTongTienPhongVaDichVuThang6(hoadon)
                if (tinhTongTienPhongThang6 && tinhTongTienDichVuThang6 && tinhTongTienPhongVaDichVuThang6) {
                    if (dsTongTienPhongTempThang6.length > 0) {
                        setDSHoaDonChartTheoThang6({
                            name: 'Tháng 6',
                            tienPhong: dsTongTienPhongTempThang6.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang6.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang6.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "07") {
                console.log("Chạy tháng 7");
                tinhTongTienPhongThang7(hoadon)
                tinhTongTienDichVuThang7(hoadon)
                tinhTongTienPhongVaDichVuThang7(hoadon)
                if (tinhTongTienPhongThang7 && tinhTongTienDichVuThang7 && tinhTongTienPhongVaDichVuThang7) {
                    if (dsTongTienPhongTempThang7.length > 0) {
                        setDSHoaDonChartTheoThang7({
                            name: 'Tháng 7',
                            tienPhong: dsTongTienPhongTempThang7.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang7.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang7.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "08") {
                console.log("Chạy tháng 8");
                tinhTongTienPhongThang8(hoadon)
                tinhTongTienDichVuThang8(hoadon)
                tinhTongTienPhongVaDichVuThang8(hoadon)
                if (tinhTongTienPhongThang8 && tinhTongTienDichVuThang8 && tinhTongTienPhongVaDichVuThang8) {
                    if (dsTongTienPhongTempThang8.length > 0) {
                        setDSHoaDonChartTheoThang8({
                            name: 'Tháng 8',
                            tienPhong: dsTongTienPhongTempThang8.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang8.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang8.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "09") {
                console.log("Chạy tháng 9");
                tinhTongTienPhongThang9(hoadon)
                tinhTongTienDichVuThang9(hoadon)
                tinhTongTienPhongVaDichVuThang9(hoadon)
                if (tinhTongTienPhongThang9 && tinhTongTienDichVuThang9 && tinhTongTienPhongVaDichVuThang9) {
                    if (dsTongTienPhongTempThang9.length > 0) {
                        setDSHoaDonChartTheoThang9({
                            name: 'Tháng 9',
                            tienPhong: dsTongTienPhongTempThang9.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang9.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang9.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "10") {
                console.log("Chạy tháng 10");
                tinhTongTienPhongThang10(hoadon)
                tinhTongTienDichVuThang10(hoadon)
                tinhTongTienPhongVaDichVuThang10(hoadon)
                if (tinhTongTienPhongThang10 && tinhTongTienDichVuThang10 && tinhTongTienPhongVaDichVuThang10) {
                    if (dsTongTienPhongTempThang10.length > 0) {
                        setDSHoaDonChartTheoThang10({
                            name: 'Tháng 10',
                            tienPhong: dsTongTienPhongTempThang10.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang10.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang10.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "11") {
                console.log("Chạy tháng 11");
                tinhTongTienPhongThang11(hoadon)
                tinhTongTienDichVuThang11(hoadon)
                tinhTongTienPhongVaDichVuThang11(hoadon)
                if (tinhTongTienPhongThang11 && tinhTongTienDichVuThang11 && tinhTongTienPhongVaDichVuThang11) {
                    if (dsTongTienPhongTempThang11.length > 0) {
                        setDSHoaDonChartTheoThang11({
                            name: 'Tháng 11',
                            tienPhong: dsTongTienPhongTempThang11.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang11.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang11.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }
            else if (month === "12") {
                console.log("Chạy tháng 12");
                tinhTongTienPhongThang12(hoadon)
                tinhTongTienDichVuThang12(hoadon)
                tinhTongTienPhongVaDichVuThang12(hoadon)
                if (tinhTongTienPhongThang12 && tinhTongTienDichVuThang12 && tinhTongTienPhongVaDichVuThang12) {
                    if (dsTongTienPhongTempThang12.length > 0) {
                        setDSHoaDonChartTheoThang12({
                            name: 'Tháng 12',
                            tienPhong: dsTongTienPhongTempThang12.reduce((preValue, currentValue) => preValue + currentValue),
                            tienDichVu: dsTongTienDichVuTempThang12.reduce((preValue, currentValue) => preValue + currentValue),
                            tongTien: dsTongTienPhongVaDichVuThang12.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }

        })


    }
    const handleDetailReport = () => {
        setDetailReportDoanhThuPhongVaDichVu(true);
    }
    const handleDetailReportThang = () => {
        setDetailReportDoanhThuPhongVaDichVuTheoThang(true);
        setDsAllBillTheoThangTemp([]);
    }
    const getAllBillTheoThangCoTongTienPhongVaDichVuTheoThang = () => {
        console.log("Chạy hàm getAllBillTheoThangCoTongTienPhongVaDichVuTheoThang");
        dsHoaDonDaThanhToanDeThongKeTheoThang && dsHoaDonDaThanhToanDeThongKeTheoThang.length > 0 && dsHoaDonDaThanhToanDeThongKeTheoThang.map((data) => {

            setDsAllBillTheoThangTemp((prestate) => [...prestate, {
                maHoaDon: data.maHoaDon,
                ngayLap: moment(data.ngayLap).format("DD/MM/YYYY"),
                tienPhong: tinhTongTienPhongThang(data),
                tienDichVu: tinhTongTienDichVuThang(data),
                tongTien: tinhTongTienPhongVaDichVuThang(data)
            }]


            )
        })
    }
    const getAllHoaDonChartThang = (dsAllBillTheoThangTemp) => {
        const dates = [...new Set(dsAllBillTheoThangTemp.map((bill) => bill.ngayLap))];
        const result = dates.map((date) => {
            const bills = dsAllBillTheoThangTemp.filter((bill) => bill.ngayLap === date);
            const total = bills.reduce((acc, bill) => {
                acc.tienPhong += bill.tienPhong;
                acc.tienDichVu += bill.tienDichVu;
                acc.tongTien += bill.tongTien;
                return acc;
            }, { tienPhong: 0, tienDichVu: 0, tongTien: 0 });
            return { ngayLap: `${date.substring(0, 5)}`, ...total };
        });
        return result;
    }
    // console.log("State Tong Tien  : ", currentTongTien);
    // console.log("DSThanhToanDeThongKe:", dsHoaDonDaThanhToanDeThongKe);
    // console.log("dsChartThang:", dsHoaDonChartTheoThang);
    // console.log("dsThongKeTheoThang:", dsHoaDonDaThanhToanDeThongKeTheoThang);
    console.log("currentTongTienThang:", currentTongTienThang);
    console.log("dsAllBillTheoThangTemp:", dsAllBillTheoThangTemp);
    console.log('Result Chart Thang: ', dsHoaDonChartTheoTungNgayCuaThang);
    // console.log("search:", search);
    // console.log("dsChartThang4:", dsHoaDonChartTheoThang4);
    // console.log("dsChartThang3:", dsHoaDonChartTheoThang3);
    // console.log("dsTongTienTempThang4:", dsTongTienPhongTempThang4);
    return (
        <StyledContainer>
            {/* <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Thống kê doanh thu</Typography>
            </Box> */}
            <Grid container spacing={2} >
                <Grid item md={12}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Theo năm', 'Theo tháng']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Thống kê tổng doanh thu" disabled />}
                    />
                </Grid>

                <Grid item md={12}>
                    {search.theo === 'Theo năm' && <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker

                                sx={{ width: '100%' }}
                                label="Trong năm"
                                value={search && search.tuNgay ? search.tuNgay : ""}
                                views={['year']}
                                onChange={(date) => { handlOnChangeTuNgay(date) }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>}
                    {search.theo === 'Theo tháng' && <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker

                                sx={{ width: '100%' }}
                                label="Trong tháng"
                                value={search && search.tuNgay ? search.tuNgay : ""}
                                views={['year', 'month']}
                                format="MM/YYYY"
                                onChange={(date) => { handlOnChangeTuNgay(date) }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>}
                </Grid>

                {/* <Grid item md={6}>
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
                </Grid> */}

                <Grid item md={4}>
                    {search.theo === "Theo năm" && <Button fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKeDoanhThuTheoPhong() }} >Thống kê theo năm  </Button>}
                    {search.theo === "Theo tháng" && <Button fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKeDoanhThuTheoThang() }} >Thống kê theo tháng  </Button>}
                </Grid>
                <Grid item md={4}>
                    {search.theo === "Theo năm" && <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { handleDetailReport() }} >Xem chi tiết báo cáo</Button>}
                    {search.theo === "Theo tháng" && <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { handleDetailReportThang() }} >Xem chi tiết báo cáo</Button>}
                </Grid>
                <Grid item md={4}>
                    {search.theo === "Theo năm" && detailReportDoanhThuPhongVaDichVu === true && <Button fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrint() }} >In thống kê </Button>}
                    {search.theo === "Theo tháng" && detailReportDoanhThuPhongVaDichVuTheoThang === true && <Button fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrintThang() }} >In thống kê tháng </Button>}
                </Grid>



            </Grid>
            {/* Danh sách kết quả thống kê theo doanh thu theo năm */}
            {dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 && detailReportDoanhThuPhongVaDichVu === true &&
                <StyledPaper elevation={10} >
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <Box flexGrow={1}>

                        </Box>
                        <IconButton color="inherit" aria-label="close" onClick={() => {
                            setDetailReportDoanhThuPhongVaDichVu(false);

                        }}>
                            <CloseIcon />
                        </IconButton>

                    </Stack>

                    <Table striped hover>
                        <thead>
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

                </StyledPaper>}
            {/* ------------------------------------------------------- */}
            {dsHoaDonDaThanhToanDeThongKeTheoThang && dsHoaDonDaThanhToanDeThongKeTheoThang.length > 0 && detailReportDoanhThuPhongVaDichVuTheoThang === true &&
                <StyledPaper elevation={10} >
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <Box flexGrow={1}>

                        </Box>
                        <IconButton color="inherit" aria-label="close" onClick={() => {
                            setDetailReportDoanhThuPhongVaDichVuTheoThang(false);

                        }}>
                            <CloseIcon />
                        </IconButton>

                    </Stack>

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
                                    <td>
                                        {moment(data.ngayLap).format(
                                            "DD/MM/YYYY HH:MM"
                                        )}
                                    </td>
                                    <td>
                                        {data.khachHang.hoTen}
                                    </td>

                                    <td>
                                        {data.nhanVien.hoTen}
                                    </td>
                                    <td>
                                        {moment(data.ngayNhanPhong).format(
                                            "DD/MM/YYYY HH:MM"
                                        )}
                                    </td>
                                    <td>
                                        {moment(data.ngayTraPhong).format(
                                            "DD/MM/YYYY HH:MM"
                                        )}
                                    </td>
                                    <td>
                                        {data.dsPhong.map((phong, index) => {
                                            if (index === data.dsPhong.length - 1) {
                                                return `${phong.tenPhong}`
                                            }
                                            else {
                                                return `${phong.tenPhong},`
                                            }

                                        })}
                                    </td>
                                    <td>
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

                                    <td>

                                        {
                                            `${tinhTongTienPhongThang(data).toLocaleString()} VND`
                                        }
                                    </td>
                                    <td>

                                        {


                                            `${tinhTongTienDichVuThang(data).toLocaleString()} VND`

                                        }
                                    </td>
                                    <td>

                                        {


                                            `${tinhTongTienPhongVaDichVuThang(data).toLocaleString()} VND`

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

                </StyledPaper>}
            {
                dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 && detailReportDoanhThuPhongVaDichVu === false && <Stack mt='35px' overflow='hidden' >
                    {/* <ResponsiveContainer width="100%" height={350}>
                        <LineChart width={700} height={250} data={dsHoaDonChartTheoThang}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickCount={10} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="tienPhong" stroke="#8884d8" />
                            <Line type="monotone" dataKey="tienDichVu" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="tongTien" stroke="#ea384d" />
                        </LineChart>
                    </ResponsiveContainer> */}
                    <ResponsiveContainer width="100%" height={450}>
                        <ComposedChart
                            width={500}
                            height={400}
                            data={dsHoaDonChartTheoThang}

                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="tongTien" fill="#f64f59" stroke="#f64f59" />
                            <Bar dataKey="tienPhong" barSize={10} fill="#5433ff" />
                            <Line type="monotone" dataKey="tienDichVu" stroke="#ffd200" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </Stack>
            }
            {/* Chart Thống kê doanh thu theo tháng */}
            {
                dsHoaDonDaThanhToanDeThongKeTheoThang && dsHoaDonDaThanhToanDeThongKeTheoThang.length > 0 && detailReportDoanhThuPhongVaDichVuTheoThang === false && <Stack mt='35px' overflow='hidden' >

                    <ResponsiveContainer width="100%" height={450}>
                        <ComposedChart
                            width={500}
                            height={300}
                            data={dsHoaDonChartTheoTungNgayCuaThang}

                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            {/* <XAxis dataKey="ngayLap" label={{ value: 'Ngày', position: 'insideRight', style: { marginBottom: 50 } }} /> */}
                            <XAxis dataKey="ngayLap" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="tongTien" fill="#f64f59" stroke="#f64f59" />
                            <Bar dataKey="tienPhong" barSize={10} fill="#5433ff" />
                            <Line type="monotone" dataKey="tienDichVu" stroke="#ffd200" />
                        </ComposedChart>
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
            <PopupPrintHoaDonTheoPhong openPopupPrint={openPopupPrint} setOpenPopupPrint={setOpenPopupPrint} isPrinHoaDonTheoNam={isPrinHoaDonTheoNam} dsHoaDonDaThanhToanDeThongKe={dsHoaDonDaThanhToanDeThongKe} currentTongTienNam={currentTongTienNam} currentTongTienThang={currentTongTienThang} dsHoaDonDaThanhToanDeThongKeTheoThang={dsHoaDonDaThanhToanDeThongKeTheoThang} search={search} />
        </StyledContainer>
    )
}

export default FrmThongKeDoanhThu
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
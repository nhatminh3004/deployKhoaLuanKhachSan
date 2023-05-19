import { Box, Grid, Paper, TextField, Typography, Radio, Chip, Button as ButtonMUI, TableContainer, TableHead, TableRow, TableCell, TableBody, Stack, Autocomplete } from '@mui/material';
import { BiRefresh } from 'react-icons/bi';
import { Toast, ToastContainer, Button, FloatingLabel, Form, Table } from "react-bootstrap";
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import axios from 'axios';
import { addNhanVien, getAllNhanVienRoute, timNhanVien, updateNhanVien } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import moment from 'moment/moment';
import { parse } from 'date-fns';
function FrmTimKiemNhanVien() {

    const [toast, setToast] = useState(null);
    const [dsNhanVien, setDsNhanVien] = useState(undefined);
    const [dsNhanVienTimKiem, setDsNhanVienTimKiem] = useState(undefined);
    const [search, setSearch] = useState([{
        theo: "Theo mã",
        keyword: "",
    },
    {
        theo: "Theo tên",
        keyword: "",
    },
    {
        theo: "Theo số điện thoại",
        keyword: "",
    },
    {
        theo: "Theo địa chỉ",
        keyword: "",
    },
    {
        theo: "Theo tình trạng tài khoản",
        keyword: "",
    }]);
    const handleChangeTextFieldSearch = (e) => {
        let tempSearch = [...search];
        if (search.length === 0) {
            setSearch([{ theo: e.target.name, keyword: e.target.value }]);
            return;
        }
        for (let i = 0; i < search.length; i++) {
            if (search[i].theo === e.target.name) {
                tempSearch.splice(i, 1);
                tempSearch = [
                    ...tempSearch,
                    { theo: e.target.name, keyword: e.target.value },
                ];
                setSearch(tempSearch);
                return;
            }
            if (i === search.length - 1) {
                tempSearch = [
                    ...tempSearch,
                    { theo: e.target.name, keyword: e.target.value },
                ];
                setSearch(tempSearch);
            }
        }
    }

    const handleRefeshNhanVien = () => {
        loadNhanVienFromDB();
        setDsNhanVienTimKiem(undefined);
    }
    const handleSearchNhanVien = async () => {
        // console.log("Search tìm kiếm :", search);
        const { data } = await axios.post(timNhanVien, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data) {
            setDsNhanVienTimKiem(data);
            setDsNhanVien(undefined)
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

            setToast({
                header: "Khóa tài khoản thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
        }

    }
    const handleOnSelect = (name, e) => {
        let tempSearch = [...search];
        if (search.length === 0) {
            setSearch([{ theo: name, keyword: e.target.value }]);
            return;
        }
        for (let i = 0; i < search.length; i++) {
            if (search[i].theo === name) {
                tempSearch.splice(i, 1);
                tempSearch = [...tempSearch, { theo: name, keyword: e.target.value }];
                setSearch(tempSearch);
                return;
            }
            if (i === search.length - 1) {
                tempSearch = [...tempSearch, { theo: name, keyword: e.target.value }];
                setSearch(tempSearch);
            }
        }
    };
    console.log('Search nhan vien:', search);
    console.log('dsNhanVien:', dsNhanVien);
    console.log('dsNhanVienTimKiem:', dsNhanVienTimKiem);

    return (
        <StyledContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Tìm kiếm nhân viên</Typography>
            </Box>
            <Paper elevation={15} sx={{ marginTop: '10px', flexDirection: 'column', maxHeight: '45%', overflow: 'auto', padding: '15px' }}>
                <Grid container spacing={2} >
                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mã nhân viên"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="Theo mã"
                                onChange={(e) => handleChangeTextFieldSearch(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Tên nhân viên"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="Theo tên"
                                onChange={(e) => handleChangeTextFieldSearch(e)}
                            />
                        </FloatingLabel>
                    </Grid>
                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Số điện thoại"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="Theo số điện thoại"
                                onChange={(e) => handleChangeTextFieldSearch(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Địa chỉ"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="Theo địa chỉ"
                                onChange={(e) => handleChangeTextFieldSearch(e)}
                            />
                        </FloatingLabel>
                    </Grid>
                    <Grid item md={6}>
                        {/* <Form.Label htmlFor="inputTang">Tình trạng tài khoản:</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            id="inputTang"
                            onChange={(e) => handleOnSelect("Theo tình trạng tài khoản", e)}
                        >
                            <option value={``}>Không chọn</option>
                            <option value={true}>
                                Kích hoạt
                            </option>
                            <option value={false}>
                                Khóa
                            </option>
                        </Form.Select> */}
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Trạng thái tài khoản"
                            className="mb-3"


                        >
                            <Form.Select

                                aria-label="Default select example"
                                onChange={(e) => handleOnSelect("Theo tình trạng tài khoản", e)}
                            >
                                <option value={``}>Không chọn</option>
                                <option value={true}>
                                    Kích hoạt
                                </option>
                                <option value={false}>
                                    Khóa
                                </option>
                            </Form.Select>
                        </FloatingLabel>
                    </Grid>
                    <Stack sx={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', mt: '10px', ml: '8px', gap: '1.5rem' }}>
                        <Button variant="success" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleSearchNhanVien()} >
                            Tìm kiếm
                        </Button>

                        <Button variant="warning" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleRefeshNhanVien()}>
                            <BiRefresh style={{ fontSize: '1.5rem' }} />
                        </Button>
                    </Stack>
                </Grid>


            </Paper>
            {/* <Box sx={{ display: 'flex', height: '100px', mt: '10px' }}>
                {search.theo === "Theo số điện thoại" ?
                    <Box sx={{ width: '50%', alignItems: 'center', display: 'flex' }}>
                        <Chip color="info" label="+84" sx={{ height: '50px', width: '71px', borderRadius: '100px' }} />
                        <TextField id="outlined-search" label="Nhập số điện thoại" type="search" fullWidth onChange={(e) => { handleChangePhoneSearch(e) }} />
                    </Box>
                    : <Box sx={{ width: '50%', alignItems: 'center', display: 'flex' }}>
                        <TextField id="outlined-search" label="Nhập họ tên" type="search" fullWidth onChange={(e) => { handleChangeTextFieldSearch(e) }} />
                    </Box>}

                <Box sx={{ width: '30%', alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Theo số điện thoại', 'Theo họ tên']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Tìm theo" disabled />}
                    />
                </Box>
                <Box sx={{ width: '30%', alignItems: 'center', display: 'flex', marginLeft: '20px', justifyContent: 'space-between' }}>
                    <ButtonMUI sx={{
                        backgroundColor: '#0D6EFD', '&:hover': {
                            backgroundColor: '#0D6EFD',
                        }
                    }} variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleSearchNhanVien() }} >Tìm kiếm</ButtonMUI>
                    <ButtonMUI sx={{
                        backgroundColor: '#FFC107', '&:hover': {
                            backgroundColor: '#FFC107',
                        }
                    }} size='medium' variant='contained' startIcon={<CachedOutlinedIcon />} onClick={() => { handleRefeshNhanVien() }}>Tải lại dữ liệu</ButtonMUI>
                </Box>
            </Box> */}

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
                            <tr key={data.nhanvien.maNhanVien}  >
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

                            null
                        }
                        {dsNhanVienTimKiem && dsNhanVienTimKiem.length > 0 ? dsNhanVienTimKiem.map((data) => (
                            <tr key={data.maNhanVien}  >
                                <td component="th" scope="row">
                                    {data.maNhanVien}
                                </td>
                                <td align="center">{data.hoTen}</td>
                                <td align="center">{data.diaChi}</td>
                                <td align="center">{data.cccd}</td>
                                <td align="center">{data.email}</td>
                                <td align="center">{data.soDienThoai}</td>
                                <td align="center">{data.luongCoBan}</td>
                                <td align="center">{data.ngaySinh ? moment(data.ngaySinh).format("DD/MM/YYYY") : "Chưa có dữ liệu "}</td>
                                <td align="center">{data.ngayVaoLam ? moment(data.ngayVaoLam).format("DD/MM/YYYY") : "Chưa có dữ liệu "}</td>
                                <td align="center">
                                    {data.daKichHoat ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                                </td>
                                <td align="center">{data.daKichHoat ? <ButtonMUI variant='contained' size='small' sx={{ backgroundColor: 'red' }} onClick={() => { handlehuyKichHoatTaiKhoan(data) }}>Khóa</ButtonMUI> : <ButtonMUI onClick={() => { handleKichHoatTaiKhoan(data) }} variant='contained' size='small' sx={{ backgroundColor: 'green' }}>Kích hoạt</ButtonMUI>}
                                </td>
                            </tr>
                        )) :

                            null
                        }
                    </tbody>
                </Table>
            </StyledPaper>




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

        </StyledContainer>
    )
}

export default FrmTimKiemNhanVien
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
height: 470px;
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
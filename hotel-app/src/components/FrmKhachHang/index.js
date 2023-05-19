import { Box, Button as ButtonMUI, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { Toast, ToastContainer, Button, FloatingLabel, Form, Table } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { BiRefresh } from 'react-icons/bi';
import styled from "styled-components";
import { addKhachHang, getAllKhachHangRoute, timKiemKhachHang, updateKhachHang } from '../../utils/APIRoutes';
import axios from 'axios';
function FrmKhachHang() {
    const [toast, setToast] = useState(null);
    const [khachHangSelected, setKhachHangSelected] = useState(undefined);
    const [dsKhachHang, setDsKhachHang] = useState(undefined);
    const [khachHangXoaRongTemp, setKhachHangXoaRongTemp] = useState(undefined);
    const [khachHangMoi, setKhachHangMoi] = useState({
        maKhachHang: 0,
        hoTen: "",
        cccdKhachHang: "",
        soDienThoaiKH: "",
        diaChiKH: "",
        emailKH: "",
    });
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo căn cước công dân"
    });

    useEffect(() => {
        loadKhachHangFromDB();
    }, [])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi
    useEffect(() => {
        if (khachHangSelected) {
            setKhachHangXoaRongTemp(khachHangSelected)
            setKhachHangMoi(khachHangSelected)
        }
        else {
            setKhachHangMoi({
                maKhachHang: 0,
                hoTen: "",
                cccdKhachHang: "",
                soDienThoaiKH: "",
                diaChiKH: "",
                emailKH: "",
            })
            setKhachHangXoaRongTemp(undefined);
        }
    }, [khachHangSelected])
    const loadKhachHangFromDB = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        const { data } = await axios.get(`${getAllKhachHangRoute}`, {}, config);
        // console.log("data khach hang load from database", data);
        setDsKhachHang(data);
    }
    const handleSelected = (khachhang) => {
        // console.log("Khach Hang :", khachhang);
        if (khachHangSelected && khachhang.maKhachHang === khachHangSelected.maKhachHang) {
            setKhachHangSelected(undefined);
        }
        else {
            setKhachHangSelected(khachhang)
        }

    }
    const handleOnChange = (e) => {
        setKhachHangMoi({ ...khachHangMoi, [e.target.name]: e.target.value });
    }
    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleChangeTextFieldSearch = (e) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, keyword: e.target.value })
    }

    const validateAdd = () => {
        const { cccdKhachHang, diaChiKH, emailKH, hoTen, soDienThoaiKH } = khachHangMoi;
        if (hoTen === "") {
            setToast({
                header: "Họ tên không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (emailKH === "") {
            setToast({
                header: "Email không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (diaChiKH === "") {
            setToast({
                header: "Địa chỉ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (cccdKhachHang === "") {
            setToast({
                header: "Căn cước không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (soDienThoaiKH === "") {
            setToast({
                header: "Số điện thoại không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        for (var i = 0; i < dsKhachHang.length; i++) {
            if (cccdKhachHang === dsKhachHang[i].cccdKhachHang) {
                setToast({
                    header: "Căn cước công dân khách hàng đã tồn tại trong hệ thống",
                    content: "",
                    bg: "danger",
                    textColor: "#fff",
                });
                return false;
            }
        }

        return true;
    };
    const validateUpdate = () => {
        const { cccdKhachHang, diaChiKH, emailKH, hoTen, soDienThoaiKH } = khachHangMoi;
        if (hoTen === "") {
            setToast({
                header: "Họ tên không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (emailKH === "") {
            setToast({
                header: "Email không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (diaChiKH === "") {
            setToast({
                header: "Địa chỉ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (cccdKhachHang === "") {
            setToast({
                header: "Căn cước không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (soDienThoaiKH === "") {
            setToast({
                header: "Số điện thoại không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }


        return true;
    };
    const handleAddKhachHang = async (e) => {
        e.preventDefault();
        const { cccdKhachHang, diaChiKH, emailKH, hoTen, soDienThoaiKH, maKhachHang } = khachHangMoi
        const objectData = {
            maKhachHang,
            cccdKhachHang,
            diaChiKH,
            emailKH,
            hoTen,
            soDienThoaiKH: "+84" + soDienThoaiKH

        }
        if (khachHangMoi.maKhachHang === 0 && validateAdd()) {
            const { data } = await axios.post(addKhachHang, objectData, {}, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            if (data && data.length !== []) {
                setDsKhachHang(data);
                setKhachHangMoi({
                    ...khachHangMoi, maKhachHang: 0,
                    hoTen: "",
                    cccdKhachHang: "",
                    soDienThoaiKH: "",
                    diaChiKH: "",
                    emailKH: "",
                })
                setToast({
                    header: "Thêm khách hàng mới thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }
    }
    const handleUpdateKhachHang = async () => {
        if (khachHangMoi.maKhachHang !== 0 && validateUpdate()) {
            const { data } = await axios.put(updateKhachHang, khachHangMoi, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            setToast({
                header: "Cập nhật thông tin khách hàng thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
            if (data && data.length !== []) {
                setDsKhachHang(data);
                setKhachHangSelected(undefined);
            }
        }
    }
    const handleSearchKhachHang = async () => {
        const { data } = await axios.post(timKiemKhachHang, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data) {
            setDsKhachHang(data);
            setKhachHangSelected(undefined);
        }
    }
    const handleRefeshKhachHang = () => {
        loadKhachHangFromDB();
    }
    const handleXoaRong = () => {
        if (khachHangXoaRongTemp) {
            setKhachHangMoi({
                maKhachHang: khachHangXoaRongTemp.maKhachHang,
                hoTen: "",
                cccdKhachHang: "",
                soDienThoaiKH: "",
                diaChiKH: "",
                emailKH: "",
            });
        }
        else {
            setKhachHangMoi({
                maKhachHang: 0,
                hoTen: "",
                cccdKhachHang: "",
                soDienThoaiKH: "",
                diaChiKH: "",
                emailKH: "",
            });
        }

    }
    // console.log("khachHangMoi :", khachHangMoi);
    // console.log("khachHangXoaRongTemp :", khachHangXoaRongTemp);

    return (
        <StyledContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Quản lý khách hàng</Typography>
            </Box>
            <Paper elevation={15} sx={{ marginTop: '10px', flexDirection: 'column', maxHeight: '45%', overflow: 'auto', padding: '15px' }}>
                <Grid container spacing={2} component='form' onSubmit={(e) => handleAddKhachHang(e)}>
                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mã khách hàng"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="maKhachHang"
                                disabled={true}
                                value={khachHangMoi && khachHangMoi.maKhachHang != 0 ? khachHangMoi.maKhachHang : ""}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Tên khách hàng"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="hoTen"
                                value={khachHangMoi && khachHangMoi.hoTen ? khachHangMoi.hoTen : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Căn cước công dân"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="cccdKhachHang"
                                value={khachHangMoi && khachHangMoi.cccdKhachHang ? khachHangMoi.cccdKhachHang : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>
                    <Grid item md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', }}>
                            <Chip color="info" label="+84" sx={{ height: '47px', width: '47px', borderRadius: '30px' }} />
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Số điện thoại"
                                className="mb-1"
                                style={{ width: '100%' }}
                            >
                                <Form.Control
                                    type="text"
                                    name="soDienThoaiKH"
                                    value={khachHangMoi && khachHangMoi.soDienThoaiKH ? khachHangMoi.soDienThoaiKH : ""}
                                    onChange={(e) => handleOnChange(e)}
                                />
                            </FloatingLabel>
                        </Box>
                    </Grid>


                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="emailKH"
                                value={khachHangMoi && khachHangMoi.emailKH ? khachHangMoi.emailKH : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Địa chỉ"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="diaChiKH"
                                value={khachHangMoi && khachHangMoi.diaChiKH ? khachHangMoi.diaChiKH : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>



                    <Stack sx={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', mt: '10px', ml: '8px', gap: '1.5rem' }}>
                        <Button variant="success" style={{ padding: '0.5rem 1.5rem' }} type='submit' >
                            Thêm
                        </Button>
                        <Button variant="primary" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleUpdateKhachHang()}>
                            Cập nhật
                        </Button>
                        <Button variant="danger" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleXoaRong()} >
                            Xóa rỗng
                        </Button>
                        <Button variant="warning" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleRefeshKhachHang()}>
                            <BiRefresh style={{ fontSize: '1.5rem' }} />
                        </Button>
                    </Stack>
                </Grid>


            </Paper>

            {/* Danh sách khách hàng */}

            <StyledPaper elevation={10}>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Mã khách hàng</th>
                            <th >Tên khách hàng</th>
                            <th>Căn cước</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsKhachHang && dsKhachHang.length > 0 ? dsKhachHang.map((data) => (
                            <tr key={data.maKhachHang} onClick={() => handleSelected(data)} className={khachHangSelected && khachHangSelected.maKhachHang === data.maKhachHang
                                ? "row-selected"
                                : ""} >
                                <td component="th" scope="row">
                                    {data.maKhachHang}
                                </td>
                                <td>{data.hoTen}</td>
                                <td>{data.cccdKhachHang}</td>
                                <td>{data.soDienThoaiKH}</td>
                                <td>{data.emailKH}</td>
                                <td>{data.diaChiKH}</td>
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

export default FrmKhachHang
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
height: 455px;
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
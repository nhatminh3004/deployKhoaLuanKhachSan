import { Autocomplete, Box, Button as ButtonMUI, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import { Toast, ToastContainer, Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { BiRefresh } from 'react-icons/bi';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LoupeOutlinedIcon from '@mui/icons-material/LoupeOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import { addDichVu, getAllLoaiDichVuRoute, getAllServiceRoute, timKiemDichVu, updateDichVu } from '../../utils/APIRoutes';
import axios from 'axios';
import PopupLoaiDichVu from '../FrmLoaiDichVu/PopupLoaiDichVu';
function FrmDichVu() {
    const [toast, setToast] = useState(null);
    const [dichVuSelected, setDichVuSelected] = useState(undefined);
    const [maDichVuCu, setMaDichVuCu] = useState(undefined);
    const [temoLoaiDichVu, setTempLoaiDichVu] = useState([]);
    const [dsDichVu, setDsDichVu] = useState(undefined);
    const [dichVuXoaRongTemp, setDichVuXoaRongTemp] = useState(undefined);
    const [dichvuMoi, setDichVuMoi] = useState({

    });
    const [openPopup, setOpenPopup] = useState(false);
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo mã dịch vụ"
    });

    useEffect(() => {
        loadDichVuFromDB();
    }, [])
    useEffect(() => {
        loadDichVuFromDB();
    }, [openPopup])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi
    useEffect(() => {
        if (dichVuSelected) {
            setDichVuMoi(dichVuSelected);
            setDichVuXoaRongTemp(dichVuSelected);
        }
        else {
            setDichVuMoi({
                maDichVu: 0,
                tenDichVu: "",
                giaDichVu: "",
                soLuong: ""
            })
            setDichVuXoaRongTemp(undefined);
        }
    }, [dichVuSelected])
    const loadDichVuFromDB = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        const { data } = await axios.get(`${getAllServiceRoute}`, {}, config);
        console.log("data dich vu load from database", data);
        setDsDichVu(data);
        const dataLoaiDichVu = await axios.get(`${getAllLoaiDichVuRoute}`, {}, config);
        setTempLoaiDichVu(dataLoaiDichVu.data);
    }
    const handleSelected = (dichVu) => {
        if (dichVuSelected && dichVu.maDichVu === dichVuSelected.maDichVu) {
            setDichVuSelected(undefined);
        }
        else {
            setDichVuSelected(dichVu)
        }
    }
    const handleOnChange = (e) => {
        setDichVuMoi({ ...dichvuMoi, [e.target.name]: e.target.value });
    }
    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleChangeTextFieldSearch = (e) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, keyword: e.target.value })
    }

    const validate = () => {
        const { tenDichVu, giaDichVu, soLuong } = dichvuMoi;
        if (tenDichVu === "") {
            setToast({
                header: "Tên dịch vụ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        if (soLuong === "") {
            setToast({
                header: "Số lượng không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        if (giaDichVu === "") {
            setToast({
                header: "Giá dịch vụ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        // for (var i = 0; i < dsDichVu.length; i++) {
        //     if (tenDichVu == dsDichVu[i].tenDichVu || giaDichVu === dsDichVu[i].giaDichVu) {
        //         setToast({
        //             header: "Tên và giá dịch vụ không được trùng",
        //             content: "",
        //             bg: "danger",
        //             textColor: "#fff",
        //         });
        //         return false;
        //     }
        // }

        return true;
    };
    const handleAddDichVu = async (e) => {
        e.preventDefault();
        console.log("Dich Vu moi : ", dichvuMoi);
        const dichVuTemp = {
            ...dichvuMoi,
            maDichVu: 0,
            maLoaiDichVu: dichvuMoi.maLoaiDichVu || 1,

        }
        console.log("Dich vu temp: ", dichVuTemp);
        if (dichvuMoi.maDichVu === 0 && validate()) {
            const { data } = await axios.post(addDichVu, dichVuTemp, {}, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            if (data && data.length !== []) {
                loadDichVuFromDB();
                setDichVuMoi({
                    ...dichvuMoi, maDichVu: 0,
                    tenDichVu: "",
                    giaDichVu: "",
                    soLuong: ""
                })
                setToast({
                    header: "Thêm dịch vụ mới thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }
    }
    const handleUpdateDichVu = async () => {
        if (dichvuMoi.maDichVu !== 0 && validate()) {
            const { data } = await axios.post(updateDichVu, dichvuMoi, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            setToast({
                header: "Cập nhật dịch vụ thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
            if (data && data.length !== []) {
                loadDichVuFromDB();
                setDichVuSelected(undefined);
            }
        }
    }

    const handleRefeshDichVu = () => {
        loadDichVuFromDB();
    }
    const handleOnSelect = (name, e) => {
        // console.log("select loaiDichVu ID :", e.target.value);
        setDichVuMoi({
            ...dichvuMoi,
            [name]: e.target.value,
        });

    };
    const handleXoaRong = () => {
        if (dichVuXoaRongTemp) {
            setDichVuMoi({
                maDichVu: dichVuXoaRongTemp.maDichVu,
                tenDichVu: "",
                giaDichVu: "",
                soLuong: "",
                maLoaiDichVu: 1

            });
        }
        else {
            setDichVuMoi({
                maDichVu: 0,
                tenDichVu: "",
                giaDichVu: "",
                soLuong: "",
                maLoaiDichVu: 1
            });
        }

    }
    // console.log("Search combobox :", search);
    // console.log("Temp loai DichVu :", temoLoaiDichVu);
    console.log("Dich vu moi :", dichvuMoi);
    return (
        <StyledContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Quản lý dịch vụ</Typography>
            </Box>
            <Paper elevation={15} sx={{ marginTop: '10px', flexDirection: 'column', maxHeight: '45%', overflow: 'auto', padding: '15px' }}>
                <Grid container spacing={2} component='form' onSubmit={(e) => handleAddDichVu(e)}>
                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label=""
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="ma_dich_vu"
                                disabled={true}
                                value={dichvuMoi && dichvuMoi.maDichVu && dichvuMoi.maDichVu !== 0 ? dichvuMoi.maDichVu : "Mã dịch vụ"}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Tên dịch vụ"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="tenDichVu"
                                value={dichvuMoi && dichvuMoi.tenDichVu ? dichvuMoi.tenDichVu : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Giá dịch vụ"
                            className="mb-1"
                        >
                            <Form.Control
                                type="number"
                                name="giaDichVu"
                                value={dichvuMoi && dichvuMoi.giaDichVu ? dichvuMoi.giaDichVu : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={4}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Số lượng"
                            className="mb-1"
                        >
                            <Form.Control
                                type="number"
                                name="soLuong"
                                value={dichvuMoi && dichvuMoi.soLuong ? dichvuMoi.soLuong : ""}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </FloatingLabel>
                    </Grid>
                    <Grid item md={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', }}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Loại dịch vụ"
                                className="mb-1"
                                style={{ flexGrow: '2' }}
                            >
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={(e) => handleOnSelect("maLoaiDichVu", e)}
                                >
                                    {temoLoaiDichVu &&
                                        temoLoaiDichVu.length !== 0 &&
                                        temoLoaiDichVu.map((loaiDichVu, index) => {
                                            return (
                                                <option
                                                    value={`${loaiDichVu.maLoaiDichVu}`}
                                                    key={index}
                                                    selected={
                                                        dichvuMoi.maLoaiDichVu &&
                                                        dichvuMoi.maLoaiDichVu == loaiDichVu.maLoaiDichVu
                                                    }
                                                >
                                                    {loaiDichVu.tenLoaiDichVu}
                                                </option>
                                            );
                                        })}

                                </Form.Select>
                            </FloatingLabel>
                            <IconButton color="success" aria-label="add to shopping cart" onClick={() => setOpenPopup(true)} sx={{ '&:hover': 'none' }}>
                                <LoupeOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Grid>




                    <Stack sx={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', mt: '10px', ml: '8px', gap: '1.5rem' }}>
                        <Button variant="success" style={{ padding: '0.5rem 1.5rem' }} type='submit' >
                            Thêm dịch vụ
                        </Button>
                        <Button variant="primary" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleUpdateDichVu()}>
                            Cập nhật
                        </Button>
                        <Button variant="danger" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleXoaRong()} >
                            Xóa rỗng
                        </Button>
                        <Button variant="warning" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleRefeshDichVu()}>
                            <BiRefresh style={{ fontSize: '1.5rem' }} />
                        </Button>
                    </Stack>
                </Grid>


            </Paper>

            {/* Danh sách Dịch Vụ */}
            <StyledPaper elevation={10}>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Mã dịch vụ</th>
                            <th >Tên dịch vụ</th>
                            <th>Tên loại dịch vụ</th>
                            <th>Đơn vị tính</th>
                            <th>Giá dịch vụ</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsDichVu && dsDichVu.length > 0 ? dsDichVu.map((data) => (
                            <tr key={data.maDichVu} onClick={() => handleSelected(data)} className={dichVuSelected && dichVuSelected.maDichVu === data.maDichVu
                                ? "row-selected"
                                : ""} >
                                <td component="th" scope="row">
                                    {data.maDichVu}
                                </td>
                                <td>{data.tenDichVu}</td>
                                <td>{data.tenLoaiDichVu}</td>
                                <td>{data.donViLoaiDichVu}</td>
                                <td>{`${data.giaDichVu.toLocaleString()} VND`}</td>
                                <td>{data.soLuong}</td>
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
            <PopupLoaiDichVu openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </StyledContainer>
    )
}

export default FrmDichVu
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
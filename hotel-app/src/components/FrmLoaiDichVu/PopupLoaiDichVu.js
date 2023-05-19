import { Autocomplete, Box, Button as ButtonMUI, Dialog, DialogContent, DialogTitle, Paper, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Toast, ToastContainer, Button, FloatingLabel, Form, Table } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { BiRefresh } from 'react-icons/bi';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios';
import { addLoaiDichVu, getAllLoaiDichVuRoute, timKiemLoaiDichVu, updateLoaiDichVu } from '../../utils/APIRoutes';
import styled from 'styled-components';

const PopupLoaiDichVu = (props) => {
    const { openPopup, setOpenPopup } = props;
    const [toast, setToast] = useState(null);
    const [loaidichvuSelected, setLoaiDichVuSelected] = useState(undefined);
    const [loaidichVuXoaRongTemp, setLoaiDichVuXoaRongTemp] = useState(undefined);
    const [dsLoaiDichVu, setDsLoaiDichVu] = useState(undefined);
    const [loaidichvuMoi, setLoaiDichVuMoi] = useState({
        maLoaiDichVu: 0,
        tenLoaiDichVu: "",
        donViLoaiDichVu: "",

    });


    useEffect(() => {
        loadLoaiDichVuFromDB();
    }, [])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi
    useEffect(() => {
        if (loaidichvuSelected) {
            console.log("Loai dich vụ moi", loaidichvuMoi);
            setLoaiDichVuMoi(loaidichvuSelected)
            setLoaiDichVuXoaRongTemp(loaidichvuSelected);
        }
        else {
            setLoaiDichVuMoi({
                maLoaiDichVu: 0,
                tenLoaiDichVu: "",
                donViLoaiDichVu: "",
            })
            setLoaiDichVuXoaRongTemp(undefined);
        }
    }, [loaidichvuSelected])
    const loadLoaiDichVuFromDB = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        const { data } = await axios.get(`${getAllLoaiDichVuRoute}`, {}, config);
        console.log("data Loại dich vu load from database", data);
        setDsLoaiDichVu(data);
    }
    const handleSelected = (loaiDichVu) => {
        console.log("Loai Dich vu selected", loaiDichVu);
        if (loaidichvuSelected && loaiDichVu.maLoaiDichVu === loaidichvuSelected.maLoaiDichVu) {
            setLoaiDichVuSelected(undefined);
        }
        else {
            setLoaiDichVuSelected(loaiDichVu)
        }

    }
    const handleOnChange = (e) => {
        setLoaiDichVuMoi({ ...loaidichvuMoi, [e.target.name]: e.target.value });
    }




    const validateAddLoaiDichVu = () => {
        const { tenLoaiDichVu, donViLoaiDichVu } = loaidichvuMoi;
        if (tenLoaiDichVu === "") {
            setToast({
                header: "Tên loại dịch vụ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (donViLoaiDichVu === "") {
            setToast({
                header: "Đơn vị loại dịch vụ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        // for (var i = 0; i < dsLoaiDichVu.length; i++) {
        //     if (tenLoaiDichVu === dsLoaiDichVu[i].tenLoaiDichVu || donViLoaiDichVu === dsLoaiDichVu[i].donViLoaiDichVu) {
        //         setToast({
        //             header: "Tên loại dịch vụ hoặc đơn vị tính đã tồn tại trên hệ thống !",
        //             content: "",
        //             bg: "danger",
        //             textColor: "#fff",
        //         });
        //         return false;
        //     }
        // }


        return true;
    };
    const handleAddLoaiDichVu = async (e) => {
        console.log("Data :", loaidichvuMoi);
        if (loaidichvuMoi.maLoaiDichVu === 0 && validateAddLoaiDichVu()) {
            const { data } = await axios.post(addLoaiDichVu, loaidichvuMoi, {}, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            if (data && data.length !== []) {
                setDsLoaiDichVu(data);
                setLoaiDichVuMoi({
                    ...loaidichvuMoi, maLoaiDichVu: 0,
                    tenLoaiDichVu: "",
                    donViLoaiDichVu: "",
                })
                setToast({
                    header: "Thêm loại dịch vụ mới thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }





    }
    const handleUpdateLoaiDichVu = async () => {
        if (loaidichvuMoi.maLoaiDichVu !== 0 && validateAddLoaiDichVu()) {
            const { data } = await axios.post(updateLoaiDichVu, loaidichvuMoi, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            setToast({
                header: "Cập nhật loại dịch vụ thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
            if (data && data.length !== []) {
                loadLoaiDichVuFromDB();
                setLoaiDichVuSelected(undefined);
            }
        }
    }

    const handleRefeshLoaiDichVu = () => {
        loadLoaiDichVuFromDB()
    }
    // Searcj loại dịch vụ
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo mã loại dịch vụ"
    });
    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleChangeTextFieldSearch = (e) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, keyword: e.target.value })
    }
    const handleSearchDichVu = async () => {
        // console.log("Result search loaiDichVu: ", search);
        const { data } = await axios.post(timKiemLoaiDichVu, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data && data.length !== []) {
            setDsLoaiDichVu(data);
            setLoaiDichVuSelected(undefined);
        }

    }
    const handleXoaRong = () => {
        if (loaidichVuXoaRongTemp) {
            setLoaiDichVuMoi({
                maLoaiDichVu: loaidichVuXoaRongTemp.maLoaiDichVu,
                tenLoaiDichVu: "",
                donViLoaiDichVu: "",

            });
        }
        else {
            setLoaiDichVuMoi({
                maLoaiDichVu: 0,
                tenLoaiDichVu: "",
                donViLoaiDichVu: "",

            });
        }

    }


    return (
        <Dialog open={openPopup} fullScreen>
            <DialogTitle>
                <Stack flexDirection='row' justifyContent='space-between'>
                    <Box flexGrow={1}>
                        Cập nhật loại dịch vụ
                    </Box>
                    <IconButton color="inherit" aria-label="close" onClick={() => setOpenPopup(false)}>
                        <CloseIcon />
                    </IconButton>

                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <StyledContainer>
                    <Paper elevation={15} sx={{ marginTop: '1px', flexDirection: 'column', maxHeight: '45%', overflow: 'auto', padding: '15px' }}>
                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Mã loại dịch vụ"
                                    className="mb-1"
                                >
                                    <Form.Control
                                        type="text"
                                        name="maLoaiDichVu"
                                        disabled={true}
                                        value={loaidichvuMoi && loaidichvuMoi.maLoaiDichVu !== 0 ? loaidichvuMoi.maLoaiDichVu : ""}
                                    />
                                </FloatingLabel>
                            </Grid>

                            <Grid item md={4}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Tên loại dịch vụ"
                                    className="mb-1"
                                >
                                    <Form.Control
                                        type="text"
                                        name="tenLoaiDichVu"
                                        value={loaidichvuMoi && loaidichvuMoi.tenLoaiDichVu ? loaidichvuMoi.tenLoaiDichVu : ""}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </FloatingLabel>
                            </Grid>

                            <Grid item md={4}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Đơn vị tính"
                                    className="mb-1"
                                >
                                    <Form.Control
                                        type="text"
                                        name="donViLoaiDichVu"
                                        value={loaidichvuMoi && loaidichvuMoi.donViLoaiDichVu ? loaidichvuMoi.donViLoaiDichVu : ""}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </FloatingLabel>
                            </Grid>
                            <Stack sx={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', mt: '10px', ml: '8px', gap: '1.5rem' }}>
                                <Button variant="success" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleAddLoaiDichVu()} >
                                    Thêm loại dịch vụ
                                </Button>
                                <Button variant="primary" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleUpdateLoaiDichVu()}>
                                    Cập nhật loại dịch vụ
                                </Button>
                                <Button variant="danger" style={{ padding: '0.5rem 1.5rem' }} onClick={() => { handleXoaRong() }} >
                                    Xóa rỗng
                                </Button>
                                <Button variant="warning" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleRefeshLoaiDichVu()}>
                                    <BiRefresh style={{ fontSize: '1.5rem' }} />
                                </Button>
                            </Stack>
                        </Grid>


                    </Paper>


                    {/* Thanh Search */}
                    <Box sx={{ display: 'flex', height: '100px', mt: '10px' }}>
                        <Box sx={{ width: '30%', alignItems: 'center', display: 'flex' }}>
                            <TextField id="outlined-search" label="Nhập để tìm kiếm" type="search" fullWidth onChange={(e) => { handleChangeTextFieldSearch(e) }} />
                        </Box>
                        <Box sx={{ width: '30%', alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                            <Autocomplete
                                onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                                disablePortal
                                id="combo-box-demo"
                                options={['Theo mã loại dịch vụ', 'Theo tên loại dịch vụ']}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField  {...params} label="Tìm theo" disabled />}
                            />
                        </Box>
                        <Box sx={{ alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                            <ButtonMUI sx={{
                                backgroundColor: '#0D6EFD', '&:hover': {
                                    backgroundColor: '#0D6EFD',
                                }
                            }} variant='contained' size='medium' endIcon={<SearchOutlinedIcon />} onClick={() => { handleSearchDichVu() }} >Tìm kiếm</ButtonMUI>
                        </Box>


                    </Box>


                    {/* Danh sách Loại Dịch Vụ */}
                    <StyledPaper elevation={10}>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Mã loại dịch vụ</th>
                                    <th >Tên loại dịch vụ</th>
                                    <th>Đơn vị tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dsLoaiDichVu && dsLoaiDichVu.length > 0 ? dsLoaiDichVu.map((data) => (
                                    <tr key={data.maLoaiDichVu} onClick={() => handleSelected(data)} className={loaidichvuSelected && loaidichvuSelected.maLoaiDichVu === data.maLoaiDichVu
                                        ? "row-selected"
                                        : ""} >
                                        <td component="th" scope="row">
                                            {data.maLoaiDichVu}
                                        </td>
                                        <td>{data.tenLoaiDichVu}</td>
                                        <td>{data.donViLoaiDichVu}</td>
                                    </tr>
                                )) :

                                    <Box sx={{ display: 'flex', height: '420px', width: '100%' }}>
                                        <Typography variant='h3'>Chưa có dữ liệu</Typography>
                                    </Box>
                                }
                            </tbody>
                        </Table>
                    </StyledPaper>
                    {/* <Paper elevation={24} sx={{ overflow: 'auto', backgroundColor: 'red' }}>
                        <TableContainer component={Paper} elevation={15}>
                            <Table aria-label="user table">
                                <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                                    <TableRow>
                                        <TableCell><Typography>Mã loại dịch vụ</Typography></TableCell>
                                        <TableCell align="center"><Typography>Tên loại dịch vụ</Typography></TableCell>
                                        <TableCell align="center"><Typography>Đơn vị tính</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dsLoaiDichVu && dsLoaiDichVu.length > 0 ? dsLoaiDichVu.map((data) => (
                                        <TableRow key={data.maLoaiDichVu} onClick={() => handleSelected(data)} className={loaidichvuSelected && loaidichvuSelected.maLoaiDichVu === data.maLoaiDichVu
                                            ? "row-selected"
                                            : ""}>
                                            <TableCell component="th" scope="row">
                                                {data.maLoaiDichVu}
                                            </TableCell>
                                            <TableCell align="center">{data.tenLoaiDichVu}</TableCell>
                                            <TableCell align="center">{data.donViLoaiDichVu}</TableCell>

                                        </TableRow>
                                    )) :

                                        <Box sx={{ display: 'flex', height: '420px', width: '100%' }}>
                                            <Typography variant='h3'>Chưa có dữ liệu</Typography>
                                        </Box>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper> */}



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

            </DialogContent>
        </Dialog>
    )
}

export default PopupLoaiDichVu
const StyledContainer = styled.div`
  width: 100%;
  max-height: 100%;
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
height: 400px;
overflow: auto;
margin-top: 10px;
&::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`
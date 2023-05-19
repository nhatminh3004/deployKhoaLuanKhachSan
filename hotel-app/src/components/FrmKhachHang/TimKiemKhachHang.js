import { Autocomplete, Box, Button as ButtonMUI, Chip, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { BiRefresh } from 'react-icons/bi';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Toast, ToastContainer, Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { getAllKhachHangRoute, timKiemKhachHang } from '../../utils/APIRoutes';
import axios from 'axios';
function FrmTimKiemKhachHang() {
    const [toast, setToast] = useState(null);
    const [dsKhachHang, setDsKhachHang] = useState(undefined);
    const [search, setSearch] = useState([
        {
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
    ]);

    useEffect(() => {
        loadKhachHangFromDB();
    }, [])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi

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
        // setSearch({ ...search, keyword: e.target.value })
    }
    Array.prototype.isNull = function () {
        return this.join().replace(/,/g, '').length === 0;
    };
    const handleSearchKhachHang = async () => {
        const { data } = await axios.post(timKiemKhachHang, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Danh Sach KhachHangTiemKiem", data);
        if (data.isNull()) {
            console.log("Mảng null");
            setDsKhachHang(undefined)
        }
        else {
            setDsKhachHang(data);

        }

    }
    const handleRefeshKhachHang = () => {
        loadKhachHangFromDB();
    }
    console.log("Search Khách hàng :", search);



    return (
        <StyledContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Tìm kiếm khách hàng</Typography>
            </Box>

            {/* Thanh Search */}
            <Paper elevation={15} sx={{ marginTop: '10px', flexDirection: 'column', maxHeight: '45%', overflow: 'auto', padding: '15px' }}>
                <Grid container spacing={2} >
                    <Grid item md={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mã khách hàng"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="Theo mã"
                                onChange={(e) => handleChangeTextFieldSearch(e)}
                            />
                        </FloatingLabel>
                    </Grid>

                    <Grid item md={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Tên khách hàng"
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="Theo tên"
                                onChange={(e) => handleChangeTextFieldSearch(e)}
                            />
                        </FloatingLabel>
                    </Grid>
                    <Grid item md={6}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Số điện thoại"
                            className="mb-1"
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
                            className="mb-1"
                        >
                            <Form.Control
                                type="text"
                                name="Theo địa chỉ"
                                onChange={(e) => handleChangeTextFieldSearch(e)}
                            />
                        </FloatingLabel>
                    </Grid>
                    <Stack sx={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', mt: '10px', ml: '8px', gap: '1.5rem' }}>
                        <Button variant="success" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleSearchKhachHang()} >
                            Tìm kiếm
                        </Button>

                        <Button variant="warning" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleRefeshKhachHang()}>
                            <BiRefresh style={{ fontSize: '1.5rem' }} />
                        </Button>
                    </Stack>
                </Grid>


            </Paper>

            {/* Danh sách Khách hàng */}
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
                            <tr key={data.maKhachHang}>
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

export default FrmTimKiemKhachHang
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: red; */
  padding: 20px;
  
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
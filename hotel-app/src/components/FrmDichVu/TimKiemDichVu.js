import { Autocomplete, Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { Toast, ToastContainer, Button as ButtonBootrap, FloatingLabel, Form, Table } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import { addDichVu, getAllServiceRoute, timKiemDichVu, updateDichVu } from '../../utils/APIRoutes';
import axios from 'axios';
function FrmTimKiemDichVu() {
    const [toast, setToast] = useState(null);
    const [dichVuSelected, setDichVuSelected] = useState(undefined);

    const [dsDichVu, setDsDichVu] = useState(undefined);
    const [dichvuMoi, setDichVuMoi] = useState({
        maDichVu: 0,
        tenDichVu: "",
        giaDichVu: ""
    });
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo mã dịch vụ"
    });

    useEffect(() => {
        loadDichVuFromDB();
    }, [])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi
    useEffect(() => {
        if (dichVuSelected) {
            setDichVuMoi(dichVuSelected)
        }
        else {
            setDichVuMoi({
                maDichVu: 0,
                tenDichVu: "",
                giaDichVu: ""
            })
        }
    }, [dichVuSelected])
    const loadDichVuFromDB = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        const { data } = await axios.get(`${getAllServiceRoute}`, {}, config);
        // console.log("data dich vu load from database", data);
        setDsDichVu(data);
    }

    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleChangeTextFieldSearch = (e) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, keyword: e.target.value })
    }


    const handleSearchDichVu = async () => {
        const { data } = await axios.post(timKiemDichVu, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data) {
            setDsDichVu(data);
            setDichVuSelected(undefined);
        }
    }
    const handleRefeshDichVu = () => {
        loadDichVuFromDB();
    }
    console.log("dsDichVuSauKhiSearch:", dsDichVu);
    return (
        <StyledContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Tìm dịch vụ</Typography>
            </Box>

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
                        options={['Theo mã dịch vụ', 'Theo tên dịch vụ']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Tìm theo" disabled />}
                    />
                </Box>
                <Box sx={{ alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                    <Button sx={{
                        backgroundColor: '#0D6EFD', '&:hover': {
                            backgroundColor: '#0D6EFD',
                        }
                    }} variant='contained' size='medium' endIcon={<SearchOutlinedIcon />} onClick={() => { handleSearchDichVu() }} >Tìm kiếm</Button>
                </Box>
                <Box sx={{ alignItems: 'center', display: 'flex', marginLeft: '5px' }}>
                    <Button sx={{
                        backgroundColor: '#FFC107', '&:hover': {
                            backgroundColor: '#FFC107',
                        }
                    }} size='medium' variant='contained' startIcon={<CachedOutlinedIcon />} onClick={() => { handleRefeshDichVu() }}>Tải lại dữ liệu</Button>
                </Box>

            </Box>


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
                            <tr key={data.maDichVu}  >
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
        </StyledContainer>
    )
}

export default FrmTimKiemDichVu
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: red; */
  padding: 20px;
 
`;
const StyledPaper = styled(Paper)`
height: 590px;
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
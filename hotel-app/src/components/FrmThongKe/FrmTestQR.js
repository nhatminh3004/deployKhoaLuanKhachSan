import { Box, Grid, Paper, TextField, Typography, Button, Radio, Chip, TableContainer, Stack, Autocomplete } from '@mui/material';
import { Toast, ToastContainer, FloatingLabel, Form, Table } from "react-bootstrap";
import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';
import axios from 'axios';

function FrmTestQR() {

    const [toast, setToast] = useState(null);
    const [ketQuaThanhToan, setKetQuaThanhToan] = useState([]);
    const [showButtonXacNhan, setShowButtonXacNhan] = useState(true);
    const [generateQR, setgenrateQR] = useState(undefined);
    const [priceMOMO, setPriceMOMO] = useState({
        price: ""
    });

    useEffect(() => {
        let intervalidID;

        if (ketQuaThanhToan.length === 0) {
            intervalidID = setInterval(async () => {
                const { data } = await axios.get("https://nhatminh3004-momo.onrender.com/resultQR", {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                });
                console.log('Kết quả Mảng Thanh Toán MOMO', data);
                if (data.length > 0) {
                    setKetQuaThanhToan(data)
                    setShowButtonXacNhan(false);
                    clearInterval(intervalidID);
                }
            }, 15000);
        } else {
            clearInterval(intervalidID);
        }

        return () => clearInterval(intervalidID);
    }, [generateQR])

    const handleOnChangePriceMOMO = (e) => {
        setPriceMOMO({ ...priceMOMO, [e.target.name]: e.target.value });
    }


    const handleQRMOMO = async () => {
        // const object = {
        //     name: 'Minh',
        //     age: 12
        // }
        // const { data } = await axios.post("http://cpic.com:4000/notify", object, {
        //     headers: {
        //         "Content-Type": "application/json;charset=UTF-8",
        //     },
        // });
        // console.log('Data test QR :', data);
        const priceObject = {
            price: priceMOMO.price
        }
        const { data } = await axios.post("https://nhatminh3004-momo.onrender.com/momo", priceObject, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
        setgenrateQR(data);
        // console.log('Price MOMO:', priceObject);

    }

    const handleXacNhanThanhToan = async () => {

        if (ketQuaThanhToan[0].message === "Thành công.") {
            setToast({
                header: "Thanh toán MOMO thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
            // setKetQuaThanhToan([]);
            // setgenrateQR([]);
            // setShowButtonXacNhan(true);
        }
        else {
            setToast({
                header: "Thanh toán thất bại",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            setKetQuaThanhToan([]);
            setgenrateQR([]);
            setShowButtonXacNhan(true);

        }

    }

    console.log('Price MOMO OBJECT:', priceMOMO);
    console.log('GenerateQR:', generateQR);
    console.log('Kết quả thanh toán:', ketQuaThanhToan);
    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Test QR</Typography>

            </Box>
            <Box>
                <Grid item md={4}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Giá tiền"
                        className="mb-1"
                    >
                        <Form.Control
                            type="number"
                            name="price"
                            value={priceMOMO && priceMOMO.price !== "" ? priceMOMO.price : ""}
                            onChange={(e) => handleOnChangePriceMOMO(e)}
                        />
                    </FloatingLabel>
                </Grid>
                <Button disabled={priceMOMO.price != "" ? false : true} variant='contained' onClick={() => handleQRMOMO()}>Thanh toán QR MoMo</Button>
                <Button disabled={showButtonXacNhan} variant='contained' onClick={() => handleXacNhanThanhToan()}>Xác nhận</Button>
                <Button variant='contained' onClick={() => { window.open('https://www.google.com', '_blank'); }}>Link</Button>

            </Box>







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

export default FrmTestQR
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
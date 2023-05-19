import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { checkPhoneExistRoute, registerRoute } from "../utils/APIRoutes";
import { authentication } from "../utils/firebase-config";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    hoTen: "",
    cccd: "",
    soDienThoai: "",
    diaChi: "",
    email: "",
    matKhau: "",
    xacNhanMatKhau: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]; // Khởi tạo mảng refs để lưu trữ ô nhập mã OTP
  const handleChangeOTP = (event, index) => {
    const { value } = event.target;

    setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);

    if (value !== "") {
      // Nếu người dùng đã nhập giá trị vào ô hiện tại
      if (index < otp.length - 1) {
        // Và ô đó không phải là ô cuối cùng
        otpInputRefs[index + 1].current.focus(); // Di chuyển focus đến ô tiếp theo
      }
    }
  };
  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recapcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };
  const handleSendCode = async (e) => {
    e.preventDefault();
    const { soDienThoai } = values;
    const phone = "+84" + soDienThoai;
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const data = {
      phone: phone,
    };
    const res = await axios.post(`${checkPhoneExistRoute}`, data, config);
    if (res.data) {
      generateRecapcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setToast({
            header: "Mã otp đã được gửi",
            content: "",
            bg: "success",
            textColor: "#fff",
          });
          setStep("VERIFY_OTP");
        })
        .catch((error) => {
          setToast({
            header: "Lỗi:" + error,
            content: "",
            bg: "danger",
            textColor: "#fff",
          });
        });
    } else {
      setToast({
        header: "Tài khoản đã được đăng ký!",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
    }
  };
  const handleVerifyOTP = () => {
    let otpInput = "";
    otp.map((item) => {
      otpInput += item;
    });
    if (otpInput.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otpInput)
        .then((result) => {
          //success verify
          setStep("VERIFY_SUCCESS");
        })
        .catch((error) => {
          setToast({
            header: "Otp nhập sai",
            content: "",
            bg: "danger",
            textColor: "#fff",
          });
        });
    }
  };

  const [step, setStep] = useState("INPUT_PHONE_NUMBER");
  // const [step, setStep] = useState("VERIFY_SUCCESS");
  // const [step, setStep] = useState("VERIFY_OTP");
  const [result, setResult] = useState("");
  const [toast, setToast] = useState(null);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { hoTen, cccd, soDienThoai, diaChi, email, matKhau } = values;
      const { data } = await axios.post(
        registerRoute,
        {
          hoTen,
          cccd,
          soDienThoai: "+84" + soDienThoai,
          diaChi,
          email,
          matKhau,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      if (data && data.token && data.nhanVien) {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("nhanVien", JSON.stringify(data.nhanVien));
        navigate("/");
      }
    }
  };
  const handleValidation = () => {
    const { hoTen, cccd, soDienThoai, diaChi, email, matKhau, xacNhanMatKhau } =
      values;
    if (hoTen.length === 0) {
      setToast({
        header: "Họ và tên không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (cccd.length != 12) {
      setToast({
        header: "CCCD gồm 12 ký tự",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (diaChi.length === 0) {
      setToast({
        header: "Địa chỉ không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (email.length === 0) {
      // toast.error('Email không được trống', toastOptions);

      setToast({
        header: "Email không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (matKhau.length < 8) {
      // toast.error('Password should be equal or greater than 8 characters', toastOptions);
      setToast({
        header: "Mật khẩu phải lớn hơn 8 ký tự",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (matKhau != xacNhanMatKhau) {
      setToast({
        header: "Mật khẩu và Nhập lại mật khẩu phải giống nhau",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }

    return true;
  };
  return (
    <>
      <Container>
        <div className="form-container">
          {/* Bước nhập số điện thoại để nhận OTP */}
          {step === "INPUT_PHONE_NUMBER" && (
            <div className="wrapper">
              <div className="grid-container">
                <div className="item-grid-login">
                  <div className="box-login">
                    <div className="header_login">
                      <span className="title_header">Nhận mã OTP</span>
                      <header></header>
                    </div>
                    <div className="form-container">
                      <Form onSubmit={(e) => handleSendCode(e)}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">
                            +84
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Phone number"
                            aria-label="Phone number"
                            aria-describedby="basic-addon1"
                            name="soDienThoai"
                            onChange={(e) => handleOnChange(e)}
                          />
                        </InputGroup>
                        <div className="btn-container">
                          <span>
                            Bạn đã có tài khoản ?{" "}
                            <Link to="/login">Đăng nhập</Link>
                          </span>
                          <Button variant="success" type="submit">
                            Nhận OTP
                          </Button>
                        </div>
                        <div id="recapcha-container"></div>
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="item-grid-slider">
                  <div className="grid-slider-container-input-phonenumber"></div>
                </div>
              </div>
            </div>
          )}
          {/* Bước nhập mã otp gửi đến số điện thoại */}
          {step === "VERIFY_OTP" && (
            <div className="wrapper">
              <div className="grid-container">
                <div className="item-grid-login">
                  <div className="box-login">
                    <div className="header_login">
                      <span className="title_header">Xác thực OTP</span>
                      <header>Nhập mã otp gồm 6 số</header>
                    </div>
                    <div className="otp-container">
                      {otp.map((item, index) => (
                        <input
                          type="text"
                          className="otp"
                          maxLength="1"
                          key={index}
                          value={item}
                          onChange={(event) => handleChangeOTP(event, index)}
                          onKeyDown={(event) => {
                            if (event.key === "Backspace" && index > 0) {
                              // Nếu người dùng nhấn phím Backspace và không phải ô đầu tiên

                              setOtp([
                                ...otp.slice(0, index),
                                "",
                                ...otp.slice(index + 1),
                              ]);
                              otpInputRefs[index - 1].current.focus(); // Di chuyển focus đến ô trước đó
                            }
                          }}
                          ref={otpInputRefs[index]} // Gán ref cho ô nhập hiện tại
                        />
                      ))}
                    </div>
                    <div className="btn-container">
                      <span>
                        Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
                      </span>
                      <Button
                        variant="success"
                        onClick={() => handleVerifyOTP()}
                      >
                        Xác thực
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="item-grid-slider">
                  <div className="grid-slider-container-verify-otp"></div>
                </div>
              </div>
            </div>
          )}

          {/* Bước Verify success */}
          {step === "VERIFY_SUCCESS" && (
            <div className="wrapper">
              <div className="grid-container">
                <div className="item-grid-login">
                  <div className="box-login">
                    <div className="header_login">
                      <span className="title_header">Điền thông tin</span>
                      <header>Đăng Ký</header>
                    </div>
                    <div className="form-container">
                      <Form
                        className="custom-form"
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <div className="custom-input">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Họ và tên"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Họ và tên"
                              name="hoTen"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="CCCD"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Căn cước công dân"
                              name="cccd"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Địa chỉ"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Địa chỉ"
                              name="diaChi"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-3"
                          >
                            <Form.Control
                              type="email"
                              placeholder="Email"
                              name="email"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </FloatingLabel>

                          <FloatingLabel
                            controlId="floatingInput"
                            label="Mật khẩu"
                            className="mb-3"
                          >
                            <Form.Control
                              type="password"
                              placeholder="Mật khẩu"
                              name="matKhau"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Nhập lại mật khẩu"
                            className="mb-3"
                          >
                            <Form.Control
                              type="password"
                              placeholder="Nhập lại mật khẩu"
                              name="xacNhanMatKhau"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </FloatingLabel>
                        </div>
                        <div className="btn-container">
                          <span>
                            Bạn đã có tài khoản ?{" "}
                            <Link to="/login">Đăng nhập</Link>
                          </span>
                          <Button variant="success" type="submit">
                            Đăng ký
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="item-grid-slider">
                  <div className="grid-slider-container-verifysuccess"></div>
                </div>
              </div>
            </div>
          )}
        </div>

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
              {/* <Toast.Body style={{ color: `${toast.textColor}` }}>
                {toast.content}
              </Toast.Body> */}
            </Toast>
          </ToastContainer>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  .wrapper {
    height: 100vh;
    background: linear-gradient(55deg, #d2001a, #7462ff, #f48e21, #23d5ab);
    background-size: 300% 300%;
    animation: color 11s ease-in-out infinite;
    padding: 100px 50px 100px 50px;
    box-sizing: border-box;
  }
  @keyframes color {
    0% {
      background-position: 0 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
  .grid-container {
    /* background-color: yellowgreen; */
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  .item-grid-login {
    background-color: rgba(240, 247, 247, 0.493);
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100%;
    overflow: auto;
    /* background-color: #d2001a; */
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-image: linear-gradient(#373b44, #1095c1);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }

  .item-grid-slider {
    background-color: rgba(32, 35, 35, 0.493);
    width: 100%;
    height: 100%;
  }
  .wrapper-slide {
    background-color: red;
    width: 100%;
    height: 90%;
  }
  .load-wrap {
    width: 100%;
    height: 100vh;
    background: linear-gradient(55deg, #d2001a, #7462ff, #f48e21, #23d5ab);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .grid-slider-container-verifysuccess {
    background-image: url("https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?w=740&t=st=1676724421~exp=1676725021~hmac=40d402a5dc6b284720197c8559260b926b25cf5f1675dab7f267298b61df37c1");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    background-position: center;
  }
  .grid-slider-container-input-phonenumber {
    background-image: url("https://img.freepik.com/premium-vector/authentication-code-illustration-isometric-style-illustration_108061-562.jpg?w=740");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    background-position: center;
  }
  .grid-slider-container-verify-otp {
    background-image: url("https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7897.jpg?w=740&t=st=1676728797~exp=1676729397~hmac=16e28cda1d191945535f94d0e6c4c75f3c8cb103c8150e69d5489276a67e9e08");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    background-position: center;
  }

  .box-login {
    /* background-color: #f48e21; */
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 15px;
    max-height: 100%;
    .header_login {
      /* background-color: #d2001a; */
      margin-bottom: 20px;
      padding: 15px 5px 15px 5px;
      .title_header {
        color: rgb(3, 3, 3);
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0 10px 0;
      }
    }
  }

  header {
    color: rgb(3, 3, 3);
    font-size: 30px;
    display: flex;
    justify-content: center;
    padding: 10px 0 10px 0;
  }
  /* --------------------- */
  .form-container {
    text-align: left;
    .custom-form {
      height: 90%;

      .custom-input {
        padding: 0.5rem 1rem;
        height: 90%;
        overflow: auto;
        input {
          outline: none;
        }
      }
    }

    .title {
      text-align: center;
      padding-bottom: 1rem;
    }
    .btn-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 21px;
    }
    .btn-forgot-password {
      width: fit-content;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .otp-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0;
      .otp {
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        border: 1px solid #eee;
        font-size: 30px;
        width: 75px;
        height: 80px;
        margin: 10px;
        text-align: center;
        font-weight: 300;
        &:valid {
          border-color: #9861c2;
          box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
`;

export default Register;

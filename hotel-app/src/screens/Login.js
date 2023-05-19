import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import { useEffect } from "react";
function Login() {
  const [loadding, setLoadding] = useState(false);
  useEffect(() => {
    setLoadding(true);
    setTimeout(() => {
      setLoadding(false);
    }, 2000);
  }, []);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const openRegisterScreen = () => {
    navigate("/register");
  };
  const openForgetPassWord = () => {
    navigate("/forgotPassword");
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = values;

    if (username === "") {
      setToast({
        header: "Tài khoản không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
    } else if (password === "") {
      setToast({
        header: "Mật khẩu không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
    } else {
      await axios
        .post(
          `${loginRoute}`,
          { username, password },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("nhanVien", JSON.stringify(res.data.nhanVien));
          navigate("/");
        })
        .catch((e) => {
          if (e.code === "ERR_BAD_REQUEST") {
            setToast({
              header: "Tài khoản hoặc mật khẩu không đúng",
              content: "",
              bg: "danger",
              textColor: "#fff",
            });
          }
        });
    }
  };
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      {loadding ? (
        <div className="load-wrap">
          <RingLoader
            color={"red"}
            loading={loadding}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={0.8}
          />
        </div>
      ) : (
        <div className="wrapper">
          <div className="grid-container">
            <div className="item-grid-login">
              <div className="box-login">
                <div className="header_login">
                  <span>Bạn đã có tài khoản ?</span>
                  <header>Đăng Nhập</header>
                </div>
                <div className="form-container">
                  <Form onSubmit={(e) => onHandleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label>Tài khoản</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tài khoản"
                        name="username"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu"
                        name="password"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </Form.Group>
                    <p className="btn-forgot-password" onClick={openForgetPassWord}>Quên mật khẩu ?</p>
                    <div className="btn-container">
                      <Button variant="primary" type="submit">
                        Đăng nhập
                      </Button>
                      <Button variant="success" onClick={openRegisterScreen}>
                        Đăng ký
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="item-grid-slider">
              <div className="grid-slider-container"></div>
            </div>
          </div>
        </div>
      )}

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
    </Container>
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
    min-height: 100%;
    /* background-color: #d2001a; */
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
  .grid-slider-container {
    background-image: url("https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1676720129~exp=1676720729~hmac=00e2f15b1d0bc342bb3aa7ed8132be58b00f5f7042b3c72b122776a1c9a3f1aa");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    background-position: center;
  }
  span {
    color: rgb(3, 3, 3);
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 10px 0;
  }
  .box-login {
    /* background-color: #f48e21; */
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 15px;
  }
  .header_login {
    /* background-color: #d2001a; */
    margin-bottom: 20px;
    padding: 15px 5px 15px 5px;
  }

  header {
    color: rgb(3, 3, 3);
    font-size: 30px;
    display: flex;
    justify-content: center;
    padding: 10px 0 10px 0;
  }
  .form-container {
    /* background-color:red; */
    text-align: left;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
  }
  .btn-forgot-password {
    width: fit-content;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default Login;

import styled from "styled-components";
import { Result } from 'antd';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";

function SuccessMoMo() {
  const urlParams = new URLSearchParams(window.location.search);
  const result = urlParams.get('message');
  const [ketQuaThanhToan, setKetQuaThanhToan] = useState(undefined);
  const [loadding, setLoadding] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setKetQuaThanhToan(result);
      setLoadding(false);
    }, 5000);

    // let intervalidID;

    // if (result === null) {
    //   intervalidID = setInterval( () => {
    //     console.log('Kết quả Mảng Thanh Toán bên vòng lặp:', ketQuaThanhToan);
    //     if(result!==null){
    //       setKetQuaThanhToan(result);
    //       setLoadding(false);
    //       clearInterval(intervalidID);
    //     }


    //   }, 5000);
    // } else {
    //   clearInterval(intervalidID);
    // }

    // return () => clearInterval(intervalidID);
  }, [result])
  console.log('Param nhận được :', result);
  console.log('Loading :', loadding);
  console.log('Kết quả thanh toán nhận :', ketQuaThanhToan);
  return (
    <Container>
      {loadding ? <div className="wrapper">
        <RingLoader
          color={"blue"}
          loading={loadding}
          size={250}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.8}
        />
      </div> : ketQuaThanhToan !== null && ketQuaThanhToan === "Thành công." ?
        <div className="wrapper">
          <Result
            status="success"
            title="Thanh toán hóa đơn thành công"
            subTitle="Bạn lòng vào lại ứng dụng và ấn xác nhận để hoàn thành"
            extra={[

            ]}
          />
        </div>
        :
        <div className="wrapper">
          <Result
            status="404"
            title="Thanh toán thất bại"
            subTitle="Vui lòng vào ứng dụng để thử lại."
            extra={[

            ]}
          />
        </div>}






    </Container>
  );
}

const Container = styled.div`
  .wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
 
  
  
`;

export default SuccessMoMo;

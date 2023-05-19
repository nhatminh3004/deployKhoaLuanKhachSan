import React from 'react'
import FrmThongKeDichVu from './FrmThongKeDichVu'
import styled from 'styled-components'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FrmThongKePhong from './FrmThongKePhong';
import FrmThongKeDoanhThu from './FrmThongKeDoanhThu';
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import FrmTestQR from './FrmTestQR';
import FrmThongKeKhachHang from './FrmThongKeKhachHang';
import FrmTestQRMain from './FrmTestQRMain';
function TabThongKe() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // console.log('value TabThongKe:', value);
    return (
        <TabStyled>
            <div>
                <Tabs value={value} onChange={handleChange} textColor="inherit"
                    variant="fullWidth">
                    <Tab icon={<FastfoodOutlinedIcon />} label="Thống kê dịch vụ" />
                    <Tab icon={<MeetingRoomOutlinedIcon />} label="Thống kê phòng" />
                    <Tab icon={<MonetizationOnOutlinedIcon />} label="Thống kê doanh thu" />
                    <Tab icon={<PermContactCalendarOutlinedIcon />} label="Thống kê khách hàng" />
                    {/* <Tab icon={<MonetizationOnOutlinedIcon />} label="Test QR" /> */}
                </Tabs>
            </div>
            <div style={{}}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    {value === 0 && <div><FrmThongKeDichVu /></div>}
                    {value === 1 && <div><FrmThongKePhong /></div>}
                    {value === 2 && <div><FrmThongKeDoanhThu /></div>}
                    {/* {value === 4 && <div><FrmTestQR /></div>} */}
                    {value === 3 && <div><FrmThongKeKhachHang /></div>}
                </div>
            </div>
        </TabStyled>
    )
}


export default TabThongKe
const TabStyled = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  /* background-color: red; */
  grid-template-rows: 10% 90%;
`;
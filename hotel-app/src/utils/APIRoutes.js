export const host = "http://localhost:8080";
//Login
export const loginRoute = `${host}/api/auth/authenticate`;
//Change Password
export const changeMatKhauRoute = `${host}/api/auth/changeMatKhau`;
//Forgot Password
export const forgotPassWord = `${host}/api/auth/forgotPassWord`;
//Register
export const registerRoute = `${host}/api/auth/register`;
export const checkPhoneExistRoute = `${host}/api/auth/checkPhoneExist`;

//Booking
export const getRoomsOrderRoute = `${host}/api/phong/sapXepTrangThai`;
export const getBookingsRoute = `${host}/api/phieuDatPhong`;
export const getBookingsOrderDateRoute = `${host}/api/phieuDatPhong/orderDate`;
export const getBookingsByCCCD = `${host}/api/phieuDatPhong/searchByCCCD`;
export const addBookingsRoute = `${host}/api/phieuDatPhong/themPhieu`;

//Bill
export const addBillsRoute = `${host}/api/hoaDon`;
export const getBillsOrderDateRoute = `${host}/api/hoaDon/orderDate`;
export const getBillsByCCCD = `${host}/api/hoaDon/searchByCCCD`;
export const bookingServices = `${host}/api/hoaDon/datDichVu`;
export const getAllBillsRoute = `${host}/api/hoaDon`;
export const getSearchBillsRoute = `${host}/api/hoaDon/searchHoaDon`;
export const searchBillsByPhongRoute = `${host}/api/hoaDon/searchHoaDonByPhong`;

//Floor
export const getFloorsRoute = `${host}/api/tang`;
export const addFloorsRoute = `${host}/api/tang`;
export const findFloorRoute = `${host}/api/tang/timKiemTang`;

//Room
export const getRoomsRoute = `${host}/api/phong`;
export const addRoomRoute = `${host}/api/phong`;
export const deleteRoomRoute = `${host}/api/phong/xoaPhong`;
export const findRoomRoute = `${host}/api/phong/timKiemPhong`;

//RoomType
export const getRoomTypesRoute = `${host}/api/loaiPhong`;
export const addRoomTypeRoute = `${host}/api/loaiPhong`;
export const findRoomTypeRoute = `${host}/api/loaiPhong/timKiemLoaiPhong`;

//Service
export const getAllServiceRoute = `${host}/api/dichvu/layAllDichVuAndLoaiDichVu`;
export const addDichVu = `${host}/api/dichvu`;
export const updateDichVu = `${host}/api/dichvu`;
export const timKiemDichVu = `${host}/api/dichvu/timKiemDichVu`;
// Type Service
//Service
export const getAllLoaiDichVuRoute = `${host}/api/loaiDichVu`;
export const addLoaiDichVu = `${host}/api/loaiDichVu`;
export const updateLoaiDichVu = `${host}/api/loaiDichVu`;
export const timKiemLoaiDichVu = `${host}/api/loaiDichVu/timKiemLoaiDichVu`;
//Customer
export const getAllKhachHangRoute = `${host}/api/khachhang`;
export const addKhachHang = `${host}/api/khachhang`;
export const updateKhachHang = `${host}/api/khachhang`;
export const timKiemKhachHang = `${host}/api/khachhang/timKiemKhachHang`;
export const timKiemKhachHangDatPhong = `${host}/api/khachhang/timKiemKhachHangDatPhong`;
export const timKiemKhachHangWithCCCD = `${host}/api/khachhang/timKiemKhachHangCCCD`;

//Employee
export const addNhanVien = `${host}/api/nhanvien`;
export const getAllNhanVienRoute = `${host}/api/nhanvien`;
export const updateNhanVien = `${host}/api/nhanvien`;
export const timNhanVien = `${host}/api/nhanvien/timKiemNhanVien`;

//Thống Kê
export const thongKeSoLanDatPhong = `${host}/api/thongke/thongKeSoLanDatPhong`;
export const thongKeSoLanDatDichVu = `${host}/api/thongke/thongKeSoLanDatDichVu`;
export const thongKeDoanhThuTheoPhong = `${host}/api/thongke/thongKeDoanhThuTheoPhong`;
export const thongKeDoanhThuTheoThang = `${host}/api/thongke/thongKeDoanhThuTheoThang`;
export const getAllHoaDonTheoNgay = `${host}/api/thongke/layAllHoaDonTheoNgay`;
export const layDanhSachMaKhachHangVaSoLanDatPhongThanhCong = `${host}/api/thongke/danhSachMaKhachHangVaSoLanDatThanhCong`;
export const layDanhSachMaKhachHangVaSoLanHuyDatPhong = `${host}/api/thongke/danhSachMaKhachHangVaSoLanHuyDatPhong`;

//Ca
export const addShiftRoute = `${host}/api/caLamViec`;
export const findShiftRoute = ``;
export const getShiftsRoute = `${host}/api/caLamViec`;
export const getShiftsOrderGioBatDauRoute = `${host}/api/caLamViec/orderByGioBatDau`;

//Phân công
export const getAssignmentsRoute = `${host}/api/bangPhanCong`;
export const getAssignmentByNhanVienRoute = `${host}/api/bangPhanCong/getByMaNhanVien`;
export const addAssignment = `${host}/api/bangPhanCong`;
export const getAssignDetailDtos = `${host}/api/bangPhanCong/getDetailByThu`;

//Chấm công
export const getTimekeeping = `${host}/api/bangChamCong/getByThuAndMaChiTietPhanCong`;
export const addTimekeeping = `${host}/api/bangChamCong/themBangChamCong`;

//Tính lương
export const addPayrolls = `${host}/api/bangLuong`;
export const getPayrollsByNhanVienRoute = `${host}/api/bangLuong/getByMaNhanVien`;

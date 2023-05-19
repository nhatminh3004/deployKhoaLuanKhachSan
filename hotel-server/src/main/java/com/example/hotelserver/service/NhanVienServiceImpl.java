package com.example.hotelserver.service;

import com.example.hotelserver.config.JwtService;
import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.entity.TaiKhoan;
import com.example.hotelserver.entity.VaiTro;
import com.example.hotelserver.repository.NhanVienRepo;
import com.example.hotelserver.repository.TaiKhoanRepo;
import com.example.hotelserver.repository.VaiTroRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private NhanVienRepo employeeRepo;
    private final PasswordEncoder passwordEncoder;
    private final VaiTroRepo vaiTroRepo;
    private final TaiKhoanRepo taiKhoanRepo;
    private final JwtService jwtService;

    @Override
    public List<Map<String, Object>> getAllInfoNhanVienWithAccount() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<NhanVien> listNhanVien = employeeRepo.getAllNhanVien();
        for (NhanVien nv : listNhanVien) {
            Map<String, Object> map = new HashMap<>();
            var nhanvienDTO = NhanVienDto.builder().maNhanVien(nv.getMaNhanVien())
                    .hoTen(nv.getHoTen())
                    .diaChi(nv.getDiaChi())
                    .email(nv.getEmail())
                    .soDienThoai(nv.getSoDienThoai())
                    .cccd(nv.getCccd())
                    .ngaySinh(nv.getNgaySinh())
                    .luongCoBan(nv.getLuongCoBan())
                    .ngayVaoLam(nv.getNgayVaoLam())
                    .maTaiKhoan(nv.getTaiKhoan().getMaTaiKhoan())
                    .tenTaiKhoan(nv.getTaiKhoan().getTenTaiKhoan())
                    .matKhau(nv.getTaiKhoan().getMatKhau())
                    .daKichHoat(nv.getTaiKhoan().isDaKichHoat())
                    .build();
            map.put("nhanvien", nhanvienDTO);
            result.add(map);
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> getAllInfoNhanVienWithAccountByHoTen(String tenNhanVien) {
        List<Map<String, Object>> result = new ArrayList<>();
        List<NhanVien> listNhanVien = employeeRepo.timNhanVienBangHoTen(tenNhanVien);
        for (NhanVien nv : listNhanVien) {
            Map<String, Object> map = new HashMap<>();
            var nhanvienDTO = NhanVienDto.builder().maNhanVien(nv.getMaNhanVien())
                    .hoTen(nv.getHoTen())
                    .diaChi(nv.getDiaChi())
                    .email(nv.getEmail())
                    .soDienThoai(nv.getSoDienThoai())
                    .cccd(nv.getCccd())
                    .ngaySinh(nv.getNgaySinh())
                    .luongCoBan(nv.getLuongCoBan())
                    .ngayVaoLam(nv.getNgayVaoLam())
                    .maTaiKhoan(nv.getTaiKhoan().getMaTaiKhoan())
                    .tenTaiKhoan(nv.getTaiKhoan().getTenTaiKhoan())
                    .matKhau(nv.getTaiKhoan().getMatKhau())
                    .daKichHoat(nv.getTaiKhoan().isDaKichHoat())
                    .build();
            map.put("nhanvien", nhanvienDTO);
            result.add(map);
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> getAllInfoNhanVienWithAccountByPhone(String phone) {
        List<Map<String, Object>> result = new ArrayList<>();
//        List<NhanVien>  listNhanVien= new ArrayList<>();
        NhanVien nv = employeeRepo.findBySoDienThoai(phone);

        Map<String, Object> map = new HashMap<>();
        var nhanvienDTO = NhanVienDto.builder().maNhanVien(nv.getMaNhanVien())
                .hoTen(nv.getHoTen())
                .diaChi(nv.getDiaChi())
                .email(nv.getEmail())
                .soDienThoai(nv.getSoDienThoai())
                .cccd(nv.getCccd())
                .ngaySinh(nv.getNgaySinh())
                .luongCoBan(nv.getLuongCoBan())
                .ngayVaoLam(nv.getNgayVaoLam())
                .maTaiKhoan(nv.getTaiKhoan().getMaTaiKhoan())
                .tenTaiKhoan(nv.getTaiKhoan().getTenTaiKhoan())
                .matKhau(nv.getTaiKhoan().getMatKhau())
                .daKichHoat(nv.getTaiKhoan().isDaKichHoat())
                .build();
        map.put("nhanvien", nhanvienDTO);
        result.add(map);

        return result;
    }

    @Override
    public NhanVien findBySoDienThoai(String phone) {
        return employeeRepo.findBySoDienThoai(phone);
    }

    @Override
    public String themMoiNhanVien(NhanVienDto request) {
        System.out.println("Request thêm mới nhân viên nhận vào : " + request);
        if (checkNhanVienExist(request.getSoDienThoai(), request.getCccd())) {
            VaiTro role = vaiTroRepo.findByTenVaiTro("ROLE_EMPLOYEE");
            if (role == null) {
                role = new VaiTro(0, "ROLE_EMPLOYEE");
                vaiTroRepo.save(role);
            }
            var taikhoan = TaiKhoan.builder()
                    .tenTaiKhoan(request.getSoDienThoai())
                    .matKhau(passwordEncoder.encode(request.getMatKhau()))
                    .daKichHoat(request.isDaKichHoat())
                    .vaiTro(role)
                    .build();
            taiKhoanRepo.save(taikhoan);

            var newNhanVien = NhanVien.builder().hoTen(request.getHoTen())
                    .cccd(request.getCccd())
                    .email(request.getEmail())
                    .diaChi(request.getDiaChi())
                    .luongCoBan(request.getLuongCoBan())
                    .ngaySinh(request.getNgaySinh())
                    .ngayVaoLam(request.getNgayVaoLam()).soDienThoai(request.getSoDienThoai()).taiKhoan(taikhoan).build();
            employeeRepo.save(newNhanVien);
            String jwtToken = jwtService.generateToken(taikhoan);
            return jwtToken;
        } else {
            return null;
        }


    }

    @Override
    public boolean checkNhanVienExist(String sdt, String cccd) {
        if (taiKhoanRepo.findByTenTaiKhoan(sdt).isEmpty() &&
                employeeRepo.findByCccd(cccd) == null) {
            return true;
        }
        return false;
    }

    @Override
    public String capnhatNhanVien(NhanVienDto request) {
        VaiTro role = vaiTroRepo.findByTenVaiTro("ROLE_EMPLOYEE");

        TaiKhoan taikhoanUpdate = taiKhoanRepo.findTaiKhoansByMaTaiKhoan(request.getMaTaiKhoan());
        taikhoanUpdate.setDaKichHoat(request.isDaKichHoat());


        var updateNhanVien = NhanVien.builder().hoTen(request.getHoTen())
                .maNhanVien(request.getMaNhanVien())
                .cccd(request.getCccd())
                .email(request.getEmail())
                .diaChi(request.getDiaChi())
                .luongCoBan(request.getLuongCoBan())
                .ngaySinh(request.getNgaySinh())
                .ngayVaoLam(request.getNgayVaoLam()).soDienThoai(request.getSoDienThoai()).taiKhoan(taikhoanUpdate).build();
        employeeRepo.save(updateNhanVien);
        return "update success";
    }

    @Override
    public List<NhanVienDto> timNhanVienCustomQuery(String query) {
        List<NhanVienDto> result = new ArrayList<>();
        List<String> maNhanViens = employeeRepo.findMaNhanVienByCustomField(query);
        if (!maNhanViens.isEmpty()) {
            for (String maNV : maNhanViens) {
                NhanVien nv = employeeRepo.findById(Long.valueOf(maNV)).get();
                if (nv != null) {
                    var nhanVienDTO = NhanVienDto.builder()
                            .maNhanVien(nv.getMaNhanVien())
                            .hoTen(nv.getHoTen())
                            .diaChi(nv.getDiaChi())
                            .email(nv.getEmail())
                            .soDienThoai(nv.getSoDienThoai())
                            .cccd(nv.getCccd())
                            .luongCoBan(nv.getLuongCoBan())
                            .ngaySinh(nv.getNgaySinh())
                            .ngayVaoLam(nv.getNgayVaoLam())
                            .maTaiKhoan(nv.getTaiKhoan().getMaTaiKhoan())
                            .tenTaiKhoan(nv.getTaiKhoan().getTenTaiKhoan())
                            .daKichHoat(nv.getTaiKhoan().isDaKichHoat())
                            .build();
                    result.add(nhanVienDTO);
                }
            }
        }

            return result;
        }



    @Override
    public NhanVien findByCCCD(String cccd) {
        return employeeRepo.findByCccd(cccd);
    }
}

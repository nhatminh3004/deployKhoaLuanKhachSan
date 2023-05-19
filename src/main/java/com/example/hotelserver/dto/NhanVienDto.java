package com.example.hotelserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class NhanVienDto {
    private long maNhanVien;
    private String hoTen;
    private String diaChi;
    private String email;
    private String soDienThoai;
    private String cccd;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date ngaySinh;
    private double luongCoBan;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date ngayVaoLam;
    private long maTaiKhoan;
    private String tenTaiKhoan;
    private String matKhau;
    private boolean daKichHoat;

}

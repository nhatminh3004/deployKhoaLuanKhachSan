package com.example.hotelserver.dto;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.TrangThaiDatPhong;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;
import java.util.List;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class NhanVienTestDTO {

	private long maNhanVien;

	private String tenNhanVien;

	private String tenTaiKhoan;


}

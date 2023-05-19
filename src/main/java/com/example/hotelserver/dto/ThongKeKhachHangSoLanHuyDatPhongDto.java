package com.example.hotelserver.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)

public class ThongKeKhachHangSoLanHuyDatPhongDto {
	private int maKhachHang;
	private int tongSoLanHuyPhong;
	private String diaChiKhachHang;
	private String emailKhachHang;
	private String hoTenKhachHang;
	private String soDienThoaiKhachHang;

}

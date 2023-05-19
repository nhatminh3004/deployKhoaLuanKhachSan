package com.example.hotelserver.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)

public class ThongKeKhachHangSoLanDatPhongThanhCongDto {
	private int maKhachHang;
	private int tongSoDatThanhCong;
	private String diaChiKhachHang;
	private String emailKhachHang;
	private String hoTenKhachHang;
	private String soDienThoaiKhachHang;

}

package com.example.hotelserver.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)

public class DanhSachSoLanHuyDatPhongVaMaKhachHangDto {
	private int maKhachHang;
	private int tongSoLanHuyPhong;

}

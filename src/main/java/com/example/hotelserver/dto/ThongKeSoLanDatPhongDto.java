package com.example.hotelserver.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

import java.util.List;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)

public class ThongKeSoLanDatPhongDto {
	private String maPhong;
	private String tenPhong;
	private double giaPhong;
	private String tenTang;
	private String tenLoaiPhong;
	private double tongSoLanDat;


}

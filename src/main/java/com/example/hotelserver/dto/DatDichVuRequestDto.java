package com.example.hotelserver.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
public class DatDichVuRequestDto {
	private long maHoaDon;
	private List<DatDichVuDto> dsDichVu;
}

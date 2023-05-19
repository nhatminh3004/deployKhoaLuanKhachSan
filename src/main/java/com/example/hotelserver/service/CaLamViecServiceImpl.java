package com.example.hotelserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.ThemCaLamViecDto;
import com.example.hotelserver.entity.CaLamViec;
import com.example.hotelserver.repository.CaLamViecRepo;

@Service
public class CaLamViecServiceImpl implements CaLamViecService {
	@Autowired
	private CaLamViecRepo caLamViecRepo;

	@Override
	public List<CaLamViec> layTatCaCaLamViec() {
		return caLamViecRepo.findAll();
	}

	@Override
	public boolean themCa(ThemCaLamViecDto caLamViecDto) {
		try {
			CaLamViec caLamViec = CaLamViec.builder().maCa(caLamViecDto.getMaCa())
					.tenCa(caLamViecDto.getTenCa())
					.gioBatDau(caLamViecDto.getGioBatDau())
					.soGio(caLamViecDto.getSoGio())
					.gioKetThuc(caLamViecDto.getGioKetThuc())
					.build();
			caLamViecRepo.save(caLamViec);
			return true;
		} catch (Exception e) {
			System.out.println("Error at themCa: " + e);
			return false;
		}
	}

	@Override
	public boolean kiemTraCaLamViecTonTaiTheoTen(String tenCa) {
		CaLamViec result = caLamViecRepo.findByTenCa(tenCa);
		if (result != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<CaLamViec> timCaLamViecTheoTen(String tenCa) {
		return caLamViecRepo.findByTenCaLike(tenCa);
	}

	@Override
	public CaLamViec timCaLamViecTheoMa(long maCa) {
		return caLamViecRepo.findById(maCa).get();

	}

	@Override
	public List<CaLamViec> timCaLamViecSapXepGioBatDau() {
		return caLamViecRepo.findAllOrderByGioBatDau();
	}
	
	
}

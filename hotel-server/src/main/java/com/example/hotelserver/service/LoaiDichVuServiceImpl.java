package com.example.hotelserver.service;

import com.example.hotelserver.entity.LoaiDichVu;
import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.repository.LoaiDichVuRepo;
import com.example.hotelserver.repository.LoaiPhongRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiDichVuServiceImpl implements LoaiDichVuService {
	@Autowired
	private LoaiDichVuRepo loaiDichVuRepo;

	@Override
	public List<LoaiDichVu> layTatCaLoaiDichVu() {
		return loaiDichVuRepo.findAll();
	}

	@Override
	public boolean themLoaiDichVu(LoaiDichVu loaiDichVu) {
		try {
			loaiDichVuRepo.save(loaiDichVu);
			return true;
		} catch (Exception e) {
			System.out.println("Error at themLoaiDichVu: " + e);
			return false;
		}
	}

	@Override
	public boolean kiemTraLoaiDichVuTonTaiTheoTen(String tenLoaiDichVu) {
		List<LoaiDichVu> result = loaiDichVuRepo.findByTenLoaiDichVuLike(tenLoaiDichVu);
		if (result != null && !result.isEmpty()) {
			return true;
		}
		return false;
	}

	@Override
	public List<LoaiDichVu> timLoaiDichVuTheoTen(String tenLoaiDichVu) {
		return loaiDichVuRepo.findByTenLoaiDichVuLike(tenLoaiDichVu);

	}

	@Override
	public LoaiDichVu timLoaiDichVuTheoMa(long maLoaiDichVu) {
		return loaiDichVuRepo.findById(maLoaiDichVu).get();

	}
	
	
}

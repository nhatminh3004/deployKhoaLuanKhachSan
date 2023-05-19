package com.example.hotelserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.repository.LoaiPhongRepo;

@Service
public class LoaiPhongServiceImpl implements LoaiPhongService {
	@Autowired
	private LoaiPhongRepo loaiPhongRepo;

	@Override
	public List<LoaiPhong> layTatCaLoaiPhong() {
		return loaiPhongRepo.findAll();
	}

	@Override
	public boolean themLoaiPhong(LoaiPhong loaiPhong) {
		try {
			loaiPhongRepo.save(loaiPhong);
			return true;
		} catch (Exception e) {
			System.out.println("Error at themLoaiPhong: " + e);
			return false;
		}
	}

	@Override
	public boolean kiemTraLoaiPhongTonTaiTheoTen(String tenLoaiPhong) {
		LoaiPhong result = loaiPhongRepo.findByTenLoaiPhong(tenLoaiPhong);
		if (result != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<LoaiPhong> timLoaiPhongTheoTen(String tenLoaiPhong) {
		return loaiPhongRepo.findByTenLoaiPhongLike(tenLoaiPhong);

	}

	@Override
	public LoaiPhong timLoaiPhongTheoMa(long maLoaiPhong) {
		return loaiPhongRepo.findById(maLoaiPhong).get();

	}
	
	
}

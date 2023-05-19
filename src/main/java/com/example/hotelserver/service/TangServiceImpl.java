package com.example.hotelserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.Tang;
import com.example.hotelserver.repository.TangRepo;

@Service
public class TangServiceImpl implements TangService{
	@Autowired
	private TangRepo tangRepo;

	@Override
	public boolean themTang(Tang tang) {
		try {
			tangRepo.save(tang);
			return true;
		} catch (Exception e) {
			System.out.println("Error at TangServiceImpl: " + e);
			return false;
		}
	}

	@Override
	public List<Tang> layTatCaTang() {
		return tangRepo.findAll();
	}

	@Override
	public boolean kiemTraTangTonTaiTheoTen(String tenTang) {
		// TODO Auto-generated method stub
		if (tangRepo.findByTenTang(tenTang) != null) {
			return true;
			
		}
		return false;
	}

	@Override
	public List<Tang> timTangTheoTen(String tenTang) {
		return tangRepo.findByTenTangLike(tenTang);
	}

	@Override
	public Tang timTangTheoMa(int maTang) {
		return tangRepo.findById(maTang).get();
	}
	
	
	
	
}

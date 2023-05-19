package com.example.hotelserver.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.ThemBangChamCongDto;
import com.example.hotelserver.entity.BangChamCong;
import com.example.hotelserver.entity.ChiTietPhanCong;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.repository.BangChamCongRepo;

@Service
public class BangChamCongServiceImpl implements BangChamCongService {
	@Autowired
	private BangChamCongRepo bangChamCongRepo;

	@Override
	public BangChamCong layBangChamCongTheoThuVaMaChiTietPhanCong(int thu, long maChiTietPhanCong) {
	    LocalDate currentdate = LocalDate.now();
//		System.out.println(currentdate.getDayOfMonth());
//		System.out.println(currentdate.getMonthValue());
//		System.out.println(currentdate.getYear());
		BangChamCong bangChamCong = bangChamCongRepo.findBangChamCongByThuAndMaChiTiet(thu
				, maChiTietPhanCong
				, currentdate.getDayOfMonth(), currentdate.getMonthValue(), currentdate.getYear());
		return bangChamCong;
	}

	@Override
	public List<BangChamCong> themBangChamCong(List<ThemBangChamCongDto> dsThemBangChamCongDto) {
		List<BangChamCong> dsBangChamCong = new ArrayList<>();
		for (ThemBangChamCongDto themBangChamCongDto : dsThemBangChamCongDto) {
			if (themBangChamCongDto.isDuocChon()) {
				BangChamCong bangChamCong = BangChamCong.builder()
						.maBangChamCong(themBangChamCongDto.getMaBangChamCong())
						.ngayChamCong(themBangChamCongDto.getNgayChamCong())
						.thu(themBangChamCongDto.getThu())
						.chiTietPhanCong(ChiTietPhanCong.builder().maChiTietPhanCong(themBangChamCongDto.getMaChiTietPhanCong()).build())
						.nhanVien(NhanVien.builder().maNhanVien(themBangChamCongDto.getMaNhanVien()).build())
						.build();
				
				BangChamCong newBangChamCong = bangChamCongRepo.save(bangChamCong);
				if (newBangChamCong != null) {					
					dsBangChamCong.add(newBangChamCong);
				}
			} else {
				if (themBangChamCongDto.getMaBangChamCong() > 0) {
					bangChamCongRepo.deleteById(themBangChamCongDto.getMaBangChamCong());
				}
			}
		}
		
		return dsBangChamCong;
	}


}

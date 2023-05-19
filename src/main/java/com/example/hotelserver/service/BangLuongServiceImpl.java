package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.BangLuongDto;
import com.example.hotelserver.entity.BangChamCong;
import com.example.hotelserver.entity.BangLuong;
import com.example.hotelserver.entity.ChiTietBangLuong;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.repository.BangChamCongRepo;
import com.example.hotelserver.repository.BangLuongRepo;
import com.example.hotelserver.repository.ChiTietBangLuongRepo;
import com.example.hotelserver.repository.NhanVienRepo;

@Service
public class BangLuongServiceImpl implements BangLuongService {
	@Autowired
	private BangLuongRepo bangLuongRepo;
	
	@Autowired
	private NhanVienRepo nhanVienRepo;

	@Autowired
	private ChiTietBangLuongRepo chiTietBangLuongRepo;
	
	@Autowired
	private BangChamCongRepo bangChamCongRepo;
	
	@Override
	public List<BangLuongDto> themBangLuong(int thang, int nam) {
		List<BangLuongDto> dsBangLuongDto = new ArrayList<>();
		List<NhanVien> dsNhanVien = nhanVienRepo.findAll();
		if (dsNhanVien != null && !dsNhanVien.isEmpty()) {
			for (NhanVien nhanVien : dsNhanVien) {
				List<BangChamCong> dsBangChamCong = bangChamCongRepo
						.findBangChamCongByThangAndNamAndMaNhanVien(thang, nam, nhanVien.getMaNhanVien());
				if (dsBangChamCong != null && !dsBangChamCong.isEmpty()) {
					Map<String, Object> mapBangLuong = bangLuongRepo.findBangLuongByThangAndNamAndMaNhanVien(thang
							, nam, nhanVien.getMaNhanVien());
					if (mapBangLuong != null && mapBangLuong.get("maBangLuong") != null) {
//						System.out.println(mapBangLuong);
						BangLuong bangLuong = BangLuong.builder()
								.nam(Integer.parseInt(mapBangLuong.get("nam").toString()))
								.maBangLuong(mapBangLuong.get("maBangLuong").toString())
								.thang(Integer.parseInt(mapBangLuong.get("thang").toString()))
								.nhanVien(nhanVien)
								.build();
						List<ChiTietBangLuong> dsChiTietBangLuong = new ArrayList<>();
						for (BangChamCong bangChamCong : dsBangChamCong) {
							Map<String, Object> mapChiTietBangLuong = chiTietBangLuongRepo
									.findChiTietBangLuongByBangChamCong(bangChamCong.getMaBangChamCong());
							if (mapChiTietBangLuong != null && mapChiTietBangLuong.get("maChiTietBangLuong") != null) {
								ChiTietBangLuong chiTietBangLuong = ChiTietBangLuong.builder()
										.maChiTietBangLuong(Long.parseLong(mapChiTietBangLuong.get("maChiTietBangLuong").toString()))
										.bangChamCong(bangChamCong)
										.build();
								dsChiTietBangLuong.add(chiTietBangLuong);
							} else {
								ChiTietBangLuong chiTietBangLuong = ChiTietBangLuong.builder()
										.maChiTietBangLuong(0)
										.bangChamCong(bangChamCong)
										.bangLuong(bangLuong)
										.build();
								ChiTietBangLuong newChiTietBangLuong = chiTietBangLuongRepo.save(chiTietBangLuong);
								if (newChiTietBangLuong != null) {
									dsChiTietBangLuong.add(newChiTietBangLuong);
								}
							}
						}
						bangLuong.setDsChiTietBangLuong(dsChiTietBangLuong);
						BangLuongDto bangLuongDto = BangLuongDto.builder()
								.nam(bangLuong.getNam())
								.maBangLuong(bangLuong.getMaBangLuong())
								.thang(bangLuong.getThang())
								.nhanVien(nhanVien)
								.dsChiTietBangLuong(dsChiTietBangLuong)
								.tongLuong(bangLuong.tinhLuong())
								.build();
						dsBangLuongDto.add(bangLuongDto);
					} else {
						String thangStr = thang + "";
						if (thang < 10) {
							thangStr = "0" + thang; 
						} 
						BangLuong bangLuong = BangLuong.builder()
								.nam(nam)
								.maBangLuong("" + thangStr + nam + "NV" + nhanVien.getMaNhanVien())
								.thang(thang)
								.nhanVien(nhanVien)
								.build();
						BangLuong newBangLuong = bangLuongRepo.save(bangLuong);
						if (newBangLuong != null) {
							List<ChiTietBangLuong> dsChiTietBangLuong = new ArrayList<>();
							for (BangChamCong bangChamCong : dsBangChamCong) {
								Map<String, Object> mapChiTietBangLuong = chiTietBangLuongRepo
										.findChiTietBangLuongByBangChamCong(bangChamCong.getMaBangChamCong());
								if (mapChiTietBangLuong != null && mapChiTietBangLuong.get("maChiTietBangLuong") != null) {
									ChiTietBangLuong chiTietBangLuong = ChiTietBangLuong.builder()
											.maChiTietBangLuong(Long.parseLong(mapChiTietBangLuong.get("maChiTietBangLuong").toString()))
											.bangChamCong(bangChamCong)
											.build();
									dsChiTietBangLuong.add(chiTietBangLuong);
								} else {
									ChiTietBangLuong chiTietBangLuong = ChiTietBangLuong.builder()
											.maChiTietBangLuong(0)
											.bangChamCong(bangChamCong)
											.bangLuong(bangLuong)
											.build();
									ChiTietBangLuong newChiTietBangLuong = chiTietBangLuongRepo.save(chiTietBangLuong);
									if (newChiTietBangLuong != null) {
										dsChiTietBangLuong.add(newChiTietBangLuong);
									}
								}
							}
							newBangLuong.setDsChiTietBangLuong(dsChiTietBangLuong);
							BangLuongDto bangLuongDto = BangLuongDto.builder()
									.nam(newBangLuong.getNam())
									.maBangLuong(newBangLuong.getMaBangLuong())
									.thang(newBangLuong.getThang())
									.nhanVien(nhanVien)
									.dsChiTietBangLuong(dsChiTietBangLuong)
									.tongLuong(newBangLuong.tinhLuong())
									.build();
							dsBangLuongDto.add(bangLuongDto);
						}
					}
				}
			}
		}
		
		return dsBangLuongDto;
	}

	@Override
	public List<BangLuongDto> layBangLuongTheoMaNhanVien(long maNhanVien) {
		NhanVien nhanVien = nhanVienRepo.findById(maNhanVien).get();
		List<BangLuongDto> dsBangLuongDto = new ArrayList<>();
		if (nhanVien != null) {
			List<Map<String, Object>> dsMapBangLuong = bangLuongRepo.findBangLuongByMaNhanVien(maNhanVien);
			if (dsMapBangLuong != null && !dsMapBangLuong.isEmpty()) {
				for (Map<String, Object> mapBangLuong : dsMapBangLuong) {
					BangLuong bangLuong = BangLuong.builder()
							.nam(Integer.parseInt(mapBangLuong.get("nam").toString()))
							.maBangLuong(mapBangLuong.get("maBangLuong").toString())
							.thang(Integer.parseInt(mapBangLuong.get("thang").toString()))
							.nhanVien(nhanVien)
							.build();
					List<Map<String, Object>> dsChiTietBangLuongMap = chiTietBangLuongRepo.findChiTietBangLuongByMaBangLuong(bangLuong.getMaBangLuong());
					List<ChiTietBangLuong> dsChiTietBangLuong = new ArrayList<>();
					if (dsChiTietBangLuongMap != null && !dsChiTietBangLuongMap.isEmpty()) {
						for (Map<String, Object> mapChiTietBangLuong : dsChiTietBangLuongMap) {
							BangChamCong bangChamCong = bangChamCongRepo.findById(Long.parseLong(mapChiTietBangLuong.get("maBangChamCong").toString())).get();
							ChiTietBangLuong chiTietBangLuong = ChiTietBangLuong.builder()
									.maChiTietBangLuong(Long.parseLong(mapChiTietBangLuong.get("maChiTietBangLuong").toString()))
									.bangChamCong(bangChamCong)
									.build();
							dsChiTietBangLuong.add(chiTietBangLuong);
						}
						bangLuong.setDsChiTietBangLuong(dsChiTietBangLuong);
						BangLuongDto bangLuongDto = BangLuongDto.builder()
								.nam(bangLuong.getNam())
								.maBangLuong(bangLuong.getMaBangLuong())
								.thang(bangLuong.getThang())
								.nhanVien(nhanVien)
								.dsChiTietBangLuong(dsChiTietBangLuong)
								.tongLuong(bangLuong.tinhLuong())
								.build();
						dsBangLuongDto.add(bangLuongDto);
					}
				}
				
			}
		}
		
		return dsBangLuongDto;
	}
	
//	@Override
//	public List<BangLuongDto> themBangLuong(int thang, int nam) {
//		List<BangLuongDto> dsBangLuongDto = new ArrayList<>();
//		List<Map<String, Object>> dsBangLuong = bangLuongRepo.findBangLuongByThangAndNam(thang, nam);
//		if (dsBangLuong != null && !dsBangLuong.isEmpty()) {
//			for (Map<String, Object> map : dsBangLuong) {
//				NhanVien nhanVien =  nhanVienRepo.findById(Long.parseLong(map.get("maNhanVien").toString())).get();
//				BangLuong bangLuong = BangLuong.builder()
//						.nam(Integer.parseInt(map.get("nam").toString()))
//						.maBangLuong(map.get("maBangLuong").toString())
//						.thang(Integer.parseInt(map.get("thang").toString()))
//						.nhanVien(nhanVien)
//						.build();
////				System.out.println("bangLuong: " + bangLuong);
//				List<ChiTietBangLuong> dsChiTietBangLuong = new ArrayList<>();
//				List<Map<String, Object>> listMap = chiTietBangLuongRepo
//						.findChiTietBangLuongByMaBangLuong(map.get("maBangLuong").toString());
//				for (Map<String, Object> mapCT : listMap) {
//					BangChamCong bangChamCong = bangChamCongRepo.findById(Long.parseLong(mapCT.get("maBangChamCong").toString())).get();
//					ChiTietBangLuong chiTietBangLuong = ChiTietBangLuong.builder()
//							.maChiTietBangLuong(Long.parseLong(mapCT.get("maChiTietBangLuong").toString()))
//							.bangChamCong(bangChamCong)
//							.build();
//					System.out.println(chiTietBangLuong);
//					dsChiTietBangLuong.add(chiTietBangLuong);
////					System.out.println(chiTietBangLuong);
//				}
//				bangLuong.setDsChiTietBangLuong(dsChiTietBangLuong);
//				bangLuongRepo.save(bangLuong);
//				BangLuongDto bangLuongDto = BangLuongDto.builder()
//						.nam(Integer.parseInt(map.get("nam").toString()))
//						.maBangLuong(map.get("maBangLuong").toString())
//						.thang(Integer.parseInt(map.get("thang").toString()))
//						.nhanVien(nhanVien)
//						.dsChiTietBangLuong(bangLuong.getDsChiTietBangLuong())
//						.tongLuong(bangLuong.tinhLuong())
//						.build();
////				System.out.println(bangLuong.getDsChiTietBangLuong());
////				System.out.println(bangLuongDto);
//				dsBangLuongDto.add(bangLuongDto);
//			}
//		} else {
//			List<NhanVien> dsNhanVien = nhanVienRepo.findAll();
//			String thangStr = thang + "";
//			if (thang < 10) {
//				thangStr = "0" + thang; 
//			} 
//			if (dsNhanVien != null && !dsNhanVien.isEmpty()) {
//				for (NhanVien nhanVien : dsNhanVien) {
//					List<BangChamCong> dsBangChamCong = bangChamCongRepo.findBangChamCongByThangAndNamAndMaNhanVien(thang, nam, nhanVien.getMaNhanVien());
//					if (dsBangChamCong != null && !dsBangChamCong.isEmpty()) {
//						BangLuong bangLuong = BangLuong.builder()
//								.nam(nam)
//								.maBangLuong("" + thangStr + nam + "NV" + nhanVien.getMaNhanVien())
//								.thang(thang)
//								.nhanVien(nhanVien)
//								.build();
//						List<ChiTietBangLuong> dsChiTietBangLuong = new ArrayList<>();
//						if (bangLuongRepo.save(bangLuong) != null) {
//							for (BangChamCong bangChamCong : dsBangChamCong) {
//								ChiTietBangLuong chiTietBangLuong = ChiTietBangLuong.builder()
//										.maChiTietBangLuong(0)
//										.bangChamCong(bangChamCong)
//										.bangLuong(bangLuong)
//										.build();
//								ChiTietBangLuong newChiTietBangLuong = chiTietBangLuongRepo.save(chiTietBangLuong);
//								if (newChiTietBangLuong != null) {
//									dsChiTietBangLuong.add(newChiTietBangLuong);
//								}
//							}
//							BangLuongDto bangLuongDto = BangLuongDto.builder()
//									.nam(nam)
//									.maBangLuong(bangLuong.getMaBangLuong())
//									.thang(thang)
//									.nhanVien(nhanVien)
//									.dsChiTietBangLuong(dsChiTietBangLuong)
//									.tongLuong(bangLuong.tinhLuong())
//									.build();
//							dsBangLuongDto.add(bangLuongDto);
//						}
//					}
//				}
//			}
//			
//		}
//		return dsBangLuongDto;
//	}


}

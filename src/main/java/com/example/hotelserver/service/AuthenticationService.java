package com.example.hotelserver.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hotelserver.config.JwtService;
import com.example.hotelserver.dto.AuthenticationRequest;
import com.example.hotelserver.dto.RegisterRequest;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.entity.TaiKhoan;
import com.example.hotelserver.entity.VaiTro;
import com.example.hotelserver.repository.NhanVienRepo;
import com.example.hotelserver.repository.TaiKhoanRepo;
import com.example.hotelserver.repository.VaiTroRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final TaiKhoanRepo repository;
	private final VaiTroRepo vaiTroRepo;
	private final NhanVienRepo nhanVienRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public String register(RegisterRequest request) {
		if (checkNhanVienExist(request.getSoDienThoai(), request.getCccd())) {
			VaiTro role = vaiTroRepo.findByTenVaiTro("ROLE_EMPLOYEE");
			if (role == null) {
				role = new VaiTro(0, "ROLE_EMPLOYEE");
				vaiTroRepo.save(role);
			}
			var taikhoan = TaiKhoan.builder()
					.tenTaiKhoan(request.getSoDienThoai())
					.matKhau(passwordEncoder.encode(request.getMatKhau()))
					.daKichHoat(false)
					.vaiTro(role)
					.build();
			repository.save(taikhoan);
			Date currentDate = new Date();
			var newNhanVien = NhanVien.builder().hoTen(request.getHoTen())
					.cccd(request.getCccd())
					.email(request.getEmail())
					.diaChi(request.getDiaChi())
					.ngayVaoLam(currentDate).soDienThoai(request.getSoDienThoai()).taiKhoan(taikhoan)
					.ngaySinh(currentDate)
					.build();
			nhanVienRepo.save(newNhanVien);

//			TaiKhoan newUser = repository.findByTenTaiKhoan(request.getSoDienThoai()).get();
//			nhanVienRepo.save(new NhanVien(0, request.getHoTen(), request.getDiaChi()
//					, request.getEmail(), request.getSoDienThoai()
//					, request.getCccd(), null, 0, null, newUser));
			String jwtToken = jwtService.generateToken(taikhoan);
			return jwtToken;
		} else {
			return null;
		}
	}
	
	public String changeRole(String username, String password, String roleName) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
			);
			var user = repository.findByTenTaiKhoan(username)
				.orElseThrow();
			VaiTro role = vaiTroRepo.findByTenVaiTro(roleName);
			if (role == null) {
				role = new VaiTro(0, roleName);
				vaiTroRepo.save(role);
			}
			Map<String, Object> map = new HashMap<>();
			map.put("role", roleName);
			user.setVaiTro(role);
			repository.save(user);
			var jwtToken = jwtService.generateToken(map, user);
			return jwtToken;
	}

	public String authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
		);
		var user = repository.findByTenTaiKhoan(request.getUsername())
			.orElseThrow();
		Map<String, Object> map = new HashMap<>();
		map.put("role", user.getVaiTro().getTenVaiTro());
		var jwtToken = jwtService.generateToken(map, user);
		return jwtToken;
	}
	
	public boolean checkNhanVienExist(String sdt, String cccd) {
		if (repository.findByTenTaiKhoan(sdt).isEmpty() && 
				nhanVienRepo.findByCccd(cccd) == null) {
			return true;
		}
		return false;
	}


}

package com.example.hotelserver.controller;

import java.util.HashMap;
import java.util.Map;

import com.example.hotelserver.entity.TaiKhoan;
import com.example.hotelserver.repository.TaiKhoanRepo;
import com.example.hotelserver.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.dto.AuthenticationRequest;
import com.example.hotelserver.dto.RegisterRequest;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/auth")
@RequiredArgsConstructor
public class UserController {
	private final AuthenticationService service;
	private final NhanVienService nhanVienService;
	private final TaiKhoanRepo taiKhoanRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
		String token = service.register(request);
		if (token == null) {
			return ResponseEntity.ok(new HashMap<>());
		}
		NhanVien nhanVien = nhanVienService.findByCCCD(request.getCccd());
		Map<String, Object> results = new HashMap<>();
		results.put("token", token);
		results.put("nhanVien", nhanVien);
		return ResponseEntity.ok(results);
	}
	
	@PutMapping("/changeRole")
	public ResponseEntity<String> changeRole(@RequestBody HashMap<String, Object> request) {
		String roleValue = request.get("roleName").toString();
		return ResponseEntity.ok(service.changeRole(request.get("username").toString()
				, request.get("password").toString()
				, roleValue ));
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<Map<String, Object>> authenticate(@RequestBody AuthenticationRequest request) {
//		System.out.println(Role.USER.name() + " " + Role.USER.getAuthority());
		String token = service.authenticate(request);
		if (token == null) {
			return ResponseEntity.ok(new HashMap<>());
		}
		NhanVien nhanVien = nhanVienService.findBySoDienThoai(request.getUsername());
		Map<String, Object> results = new HashMap<>();
		results.put("token", token);
		results.put("nhanVien", nhanVien);
		return ResponseEntity.ok(results);
	}
	
	@PostMapping("/checkPhoneExist")
	public ResponseEntity<Boolean> checkPhoneExist(@RequestBody Map<String, Object> request) {
//				System.out.println(request);
		boolean result = false;
		if (nhanVienService.findBySoDienThoai(request.get("phone").toString()) == null) {
			result = true;
		}
//		System.out.println(request.get("phone").toString());
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/changeMatKhau")
	public ResponseEntity<Boolean> changeMatKhau(@RequestBody Map<String, Object> request) {
		boolean result = false;
				System.out.println(request);
				String requestMatKhauCu = request.get("matKhauCu").toString();
				String requestEncodePassword = request.get("encodePassWord").toString();
		String matKhauMoi = request.get("matKhauMoi").toString();
		System.out.println("matKhauCu:"+requestMatKhauCu);
		System.out.println("encodePassWord:"+requestEncodePassword);
		System.out.println("newPassWord:"+matKhauMoi);
		if(passwordEncoder.matches(requestMatKhauCu,requestEncodePassword)){
			System.out.println("Xác nhận mật khẩu khớp");
			TaiKhoan tk = taiKhoanRepo.findTaiKhoansByMaTaiKhoan(Long.parseLong(request.get("maTaiKhoan").toString()));
			tk.setMatKhau(passwordEncoder.encode(matKhauMoi));
			taiKhoanRepo.save(tk);
			result=true;
		}
		else {
			System.out.println("Sai mật khẩu cũ");
		}

		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	@PostMapping("/forgotPassWord")
	public ResponseEntity<Boolean> forgotPassWord(@RequestBody Map<String, Object> request) {
		boolean result = false;
		System.out.println(request);
		String matKhauMoi = request.get("matKhauMoi").toString();
		System.out.println("newPassWord:"+matKhauMoi);
		TaiKhoan tk = taiKhoanRepo.findByTenTaiKhoan(request.get("soDienThoai").toString()).get();
		tk.setMatKhau(passwordEncoder.encode(matKhauMoi));
		taiKhoanRepo.save(tk);
		result=true;



		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
}

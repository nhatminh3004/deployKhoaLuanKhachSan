package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.VaiTro;
import com.example.hotelserver.entity.TaiKhoan;
import com.example.hotelserver.repository.VaiTroRepo;
import com.example.hotelserver.repository.TaiKhoanRepo;



@Service
public class UserServiceImpl implements UserService, UserDetailsService {
	private final TaiKhoanRepo userRepo;
	private final VaiTroRepo roleRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	public UserServiceImpl(TaiKhoanRepo userRepo, VaiTroRepo roleRepo, PasswordEncoder passwordEncoder) {
		this.userRepo = userRepo;
		this.roleRepo = roleRepo;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		TaiKhoan user = userRepo.findByTenTaiKhoan(username).get();
		
		if(user == null) {
			System.out.println("User not found in database");
			throw new UsernameNotFoundException("User not found in database");
		} else {
			System.out.println("User found in database: " + username);
		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(user.getVaiTro().getTenVaiTro()));
		return new org.springframework.security.core.userdetails.User(user.getUsername()
				, user.getPassword(), authorities);
	}
	
	@Override
	public TaiKhoan addUser(TaiKhoan user) {
		System.out.println("Saving new user " + user.getUsername() + " to database");
		
		user.setMatKhau(passwordEncoder.encode(user.getPassword()));
		
		return userRepo.save(user);
	}

	@Override
	public VaiTro addRole(VaiTro role) {
		System.out.println("Saving new role " + role.getTenVaiTro() + " to database");
		return roleRepo.save(role);
	}

	@Override
	public void addRoleToUser(String username, String roleName) {		
		System.out.println("Adding role " + roleName + " to user " + username);
		Optional<TaiKhoan> temp = userRepo.findByTenTaiKhoan(username);
		TaiKhoan user = temp.get();
		VaiTro role = roleRepo.findByTenVaiTro(roleName);
		if (role == null) {
			roleRepo.save(new VaiTro(0, roleName));
		}
		user.setVaiTro(role);
		userRepo.save(user);
	}

	@Override
	public TaiKhoan getUser(String username) {
		System.out.println("Fetching user " + username);
		return userRepo.findByTenTaiKhoan(username).get();
	}

	@Override
	public List<TaiKhoan> getUsers() {
		System.out.println("Fetching all users");
		return userRepo.findAll();
	}

	@Override
	public TaiKhoan getUserById(long id) {
		TaiKhoan user = null; 
		Optional<TaiKhoan> result = userRepo.findById(id);
		
		if (result.isPresent()) {
			user = result.get();
		} else {
			throw new RuntimeException("Don't find employee id - " + id);
		}
		
		return user;
	}
	

}

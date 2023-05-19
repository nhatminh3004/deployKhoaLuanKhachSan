package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.entity.VaiTro;
import com.example.hotelserver.entity.TaiKhoan;



public interface UserService {
	public TaiKhoan addUser(TaiKhoan user);
	public VaiTro addRole(VaiTro role);
	public void addRoleToUser(String username, String roleName);
	public TaiKhoan getUser(String username);
	public TaiKhoan getUserById(long id);
	public List<TaiKhoan> getUsers();
}

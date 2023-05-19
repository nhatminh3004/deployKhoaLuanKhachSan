package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "tang")
public class Tang {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_tang")
	private int maTang;
	
	@Column(name = "ten_tang", columnDefinition = "nvarchar(255)")
	private String tenTang;

	@Override
	public String toString() {
		return "Floor [floorId=" + maTang + ", floorName=" + tenTang + "]";
	}
	
	
}

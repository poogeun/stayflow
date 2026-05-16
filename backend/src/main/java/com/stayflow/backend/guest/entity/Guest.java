package com.stayflow.backend.guest.entity;

import com.stayflow.backend.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "guests")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Guest extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 50)
  private String name;

  @Column(nullable = false, length = 20)
  private String phone;

  @Column(length = 100)
  private String email;

  @Builder
  public Guest(String name, String phone, String email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }

}

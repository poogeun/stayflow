package com.stayflow.backend.room.entity;

import com.stayflow.backend.common.entity.BaseEntity;
import com.stayflow.backend.room.enums.RoomStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "rooms")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String roomNumber;

  @Column(nullable = false)
  private String roomType;

  @Column(nullable = false)
  private Integer capacity;

  @Column(nullable = false)
  private Integer price;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoomStatus status;

  @Builder
  public Room(
      String roomNumber,
      String roomType,
      Integer capacity,
      Integer price,
      RoomStatus status
  ) {
    this.roomNumber = roomNumber;
    this.roomType = roomType;
    this.capacity = capacity;
    this.price = price;
    this.status = status;
  }

  public void updateStatus(RoomStatus status) {
    this.status = status;
  }

  public void occupy() {
    this.status = RoomStatus.OCCUPIED;
  }

  public void clean() {
    this.status = RoomStatus.CLEANING;
  }

  public void available() {
    this.status = RoomStatus.AVAILABLE;
  }
}

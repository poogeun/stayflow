package com.stayflow.backend.reservation.entity;

import com.stayflow.backend.common.entity.BaseEntity;
import com.stayflow.backend.guest.entity.Guest;
import com.stayflow.backend.reservation.enums.ReservationStatus;
import com.stayflow.backend.room.entity.Room;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "reservations")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservation extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "guest_id", nullable = false)
  private Guest guest;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "room_id", nullable = false)
  private Room room;

  @Column(nullable = false)
  private LocalDate checkInDate;

  @Column(nullable = false)
  private LocalDate checkOutDate;

  @Column(nullable = false)
  private Integer totalPrice;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ReservationStatus status;

  @Builder
  public Reservation(
      Guest guest,
      Room room,
      LocalDate checkInDate,
      LocalDate checkOutDate,
      Integer totalPrice,
      ReservationStatus status
  ) {
    this.guest = guest;
    this.room = room;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.totalPrice = totalPrice;
    this.status = status;
  }

  public void updateStatus(ReservationStatus status) {
    this.status = status;
  }

  public void cancel() {
    this.status = ReservationStatus.CANCELED;
  }

  public void checkIn() {
    this.status = ReservationStatus.CHECKED_IN;
  }

  public void checkOut() {
    this.status = ReservationStatus.CHECKED_OUT;
  }
}

package com.stayflow.backend.reservation.dto;

import com.stayflow.backend.reservation.entity.Reservation;
import com.stayflow.backend.reservation.enums.ReservationStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReservationResponse(
    Long id,

    Long guestId,
    String guestName,
    String guestPhone,
    String guestEmail,

    Long roomId,
    String roomNumber,
    String roomType,

    LocalDate checkInDate,
    LocalDate checkOutDate,
    Integer totalPrice,
    ReservationStatus status,

    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
  public static ReservationResponse from(Reservation reservation) {
    return new ReservationResponse(
        reservation.getId(),

        reservation.getGuest().getId(),
        reservation.getGuest().getName(),
        reservation.getGuest().getPhone(),
        reservation.getGuest().getEmail(),

        reservation.getRoom().getId(),
        reservation.getRoom().getRoomNumber(),
        reservation.getRoom().getRoomType(),

        reservation.getCheckInDate(),
        reservation.getCheckOutDate(),
        reservation.getTotalPrice(),
        reservation.getStatus(),

        reservation.getCreatedAt(),
        reservation.getUpdatedAt()
    );
  }
}

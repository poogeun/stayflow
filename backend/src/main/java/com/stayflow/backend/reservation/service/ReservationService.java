package com.stayflow.backend.reservation.service;

import com.stayflow.backend.guest.entity.Guest;
import com.stayflow.backend.guest.repository.GuestRepository;
import com.stayflow.backend.reservation.dto.ReservationCreateRequest;
import com.stayflow.backend.reservation.dto.ReservationResponse;
import com.stayflow.backend.reservation.entity.Reservation;
import com.stayflow.backend.reservation.enums.ReservationStatus;
import com.stayflow.backend.reservation.repository.ReservationRepository;
import com.stayflow.backend.room.entity.Room;
import com.stayflow.backend.room.repository.RoomRepository;
import java.time.temporal.ChronoUnit;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

  private final ReservationRepository reservationRepository;
  private final GuestRepository guestRepository;
  private final RoomRepository roomRepository;

  @Transactional
  public ReservationResponse createReservation(ReservationCreateRequest request) {
    boolean alreadyReserved = reservationRepository.existsReservation(
        request.roomId(),
        ReservationStatus.CANCELLED,
        request.checkInDate(),
        request.checkOutDate()
    );

    if(alreadyReserved) {
      throw new IllegalArgumentException("해당 기간에 이미 예약된 객실입니다.");
    }

    Room room = roomRepository.findById(request.roomId())
        .orElseThrow(() -> new IllegalArgumentException("객실을 찾을 수 없습니다."));

    long nights = ChronoUnit.DAYS.between(
        request.checkInDate(),
        request.checkOutDate()
    );

    if(nights <= 0) {
      throw new IllegalArgumentException("체크아웃 날짜는 체크인 날짜보다 늦어야 합니다.");
    }

    Guest guest = Guest.builder()
        .name(request.guestName())
        .phone(request.guestPhone())
        .email(request.guestEmail())
        .build();

    Guest savedGuest = guestRepository.save(guest);

    Reservation reservation = Reservation.builder()
        .guest(savedGuest)
        .room(room)
        .checkInDate(request.checkInDate())
        .checkOutDate(request.checkOutDate())
        .totalPrice((int) nights * room.getPrice())
        .status(ReservationStatus.RESERVED)
        .build();

    Reservation savedReservation = reservationRepository.save(reservation);

    return ReservationResponse.from(savedReservation);
  }

  public ReservationResponse getReservation(Long reservationId) {
    Reservation reservation = reservationRepository.findById(reservationId)
        .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

    return ReservationResponse.from(reservation);
  }

  public List<ReservationResponse> getReservations() {
    return reservationRepository.findAll()
        .stream()
        .map(ReservationResponse::from)
        .toList();
  }

  @Transactional
  public ReservationResponse cancelReservation(Long reservationId) {
    Reservation reservation = reservationRepository.findById(reservationId)
        .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

    if (reservation.getStatus() == ReservationStatus.CANCELLED) {
      throw new IllegalArgumentException("이미 취소된 예약입니다.");
    }

    if (reservation.getStatus() == ReservationStatus.CHECKED_IN) {
      throw new IllegalArgumentException("체크인 완료된 예약은 취소할 수 없습니다.");
    }

    if (reservation.getStatus() == ReservationStatus.CHECKED_OUT) {
      throw new IllegalArgumentException("체크아웃 완료된 예약은 취소할 수 없습니다.");
    }

    reservation.cancel();

    return ReservationResponse.from(reservation);
  }

  @Transactional
  public ReservationResponse checkIn(Long reservationId) {
    Reservation reservation = reservationRepository.findById(reservationId)
        .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

    if (reservation.getStatus() != ReservationStatus.RESERVED) {
      throw new IllegalArgumentException("예약 완료 상태에서만 체크인할 수 있습니다.");
    }

    reservation.checkIn();
    reservation.getRoom().occupy();

    return ReservationResponse.from(reservation);
  }

  @Transactional
  public ReservationResponse checkOut(Long reservationId) {
    Reservation reservation = reservationRepository.findById(reservationId)
        .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

    if (reservation.getStatus() != ReservationStatus.CHECKED_IN) {
      throw new IllegalArgumentException("체크인 상태에서만 체크아웃할 수 있습니다.");
    }

    reservation.checkOut();
    reservation.getRoom().clean();

    return ReservationResponse.from(reservation);
  }

}

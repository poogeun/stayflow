package com.stayflow.backend.reservation.controller;

import com.stayflow.backend.reservation.dto.ReservationCreateRequest;
import com.stayflow.backend.reservation.dto.ReservationResponse;
import com.stayflow.backend.reservation.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Reservation", description = "예약 관리 API")
@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

  private final ReservationService reservationService;

  @Operation(summary = "예약 생성", description = "고객 예약 사이트에서 객실 예약을 생성합니다.")
  @PostMapping
  public ReservationResponse createReservation(
      @Valid @RequestBody ReservationCreateRequest request
  ) {
    return reservationService.createReservation(request);
  }

  @GetMapping("/{reservationId}")
  public ReservationResponse getReservation(
      @PathVariable Long reservationId
  ) {
    return reservationService.getReservation(reservationId);
  }

  @GetMapping
  public List<ReservationResponse> getReservations() {
    return reservationService.getReservations();
  }

  @PatchMapping("/{reservationId}/cancel")
  public ReservationResponse cancelReservation(
      @PathVariable Long reservationId
  ) {
    return reservationService.cancelReservation(reservationId);
  }

  @Operation(summary = "예약 체크인", description = "예약 상태를 CHECKED_IN으로 변경하고 객실 상태를 OCCUPIED로 변경합니다.")
  @PatchMapping("/{reservationId}/check-in")
  public ReservationResponse checkIn(
      @PathVariable Long reservationId
  ) {
    return reservationService.checkIn(reservationId);
  }

  @PatchMapping("/{reservationId}/check-out")
  public ReservationResponse checkOut(
      @PathVariable Long reservationId
  ) {
    return reservationService.checkOut(reservationId);
  }

}

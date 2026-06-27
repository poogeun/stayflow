package com.stayflow.backend.reservation.scheduler;

import com.stayflow.backend.reservation.entity.Reservation;
import com.stayflow.backend.reservation.enums.ReservationStatus;
import com.stayflow.backend.reservation.repository.ReservationRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReservationScheduler {

  private final ReservationRepository reservationRepository;

  @Scheduled(cron = "0 1 0 * * *")
  @Transactional
  public void markNoShow() {
    List<Reservation> targets = reservationRepository
        .findByStatusAndCheckInDateBefore(ReservationStatus.RESERVED, LocalDate.now());
    targets.forEach(r -> r.updateStatus(ReservationStatus.NO_SHOW));
    log.info("노쇼 처리 완료: {}건", targets.size());
  }

  @Scheduled(cron = "0 2 0 * * *")
  @Transactional
  public void autoCheckOut() {
    List<Reservation> targets = reservationRepository
        .findByStatusAndCheckOutDateBefore(ReservationStatus.CHECKED_IN, LocalDate.now());
    targets.forEach(Reservation::checkOut);
    log.info("자동 체크아웃 완료: {}건", targets.size());
  }
}

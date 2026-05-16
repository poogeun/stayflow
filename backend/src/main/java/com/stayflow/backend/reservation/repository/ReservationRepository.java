package com.stayflow.backend.reservation.repository;

import com.stayflow.backend.reservation.entity.Reservation;
import com.stayflow.backend.reservation.enums.ReservationStatus;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

  @Query("""
      select count(r) > 0
      from Reservation r
      where r.room.id = :roomId
        and r.status <> :excludeStatus
        and r.checkInDate < :checkOutDate
        and r.checkOutDate > :checkInDate
  """)
  boolean existsReservation(
      Long roomId,
      ReservationStatus excludeStatus,
      LocalDate checkInDate,
      LocalDate checkOutDate
  );

}

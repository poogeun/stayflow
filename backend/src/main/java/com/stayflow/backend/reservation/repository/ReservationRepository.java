package com.stayflow.backend.reservation.repository;

import com.stayflow.backend.reservation.entity.Reservation;
import com.stayflow.backend.reservation.enums.ReservationStatus;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

  Optional<Reservation> findByIdAndGuestPhone(Long id, String guestPhone);

  long countByCheckInDate(LocalDate checkInDate);

  long countByCheckOutDate(LocalDate checkOutDate);

  @Query("""
      select r.room.id
      from Reservation r
      where r.status <> :excludeStatus
        and r.checkInDate < :checkOutDate
        and r.checkOutDate > :checkInDate
""")
  List<Long> findReservedRoomIds(
      ReservationStatus excludeStatus,
      LocalDate checkInDate,
      LocalDate checkOutDate
  );

  long countByStatus(ReservationStatus status);

  @Query(value = "SELECT * FROM get_monthly_revenue_stats(:year)", nativeQuery = true)
  List<Object[]> getMonthlyRevenueStats(@Param("year") int year);

  List<Reservation> findByStatusAndCheckInDateBefore(ReservationStatus status, LocalDate date);

  List<Reservation> findByStatusAndCheckOutDateBefore(ReservationStatus status, LocalDate date);

}

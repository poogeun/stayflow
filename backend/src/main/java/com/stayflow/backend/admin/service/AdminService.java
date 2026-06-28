package com.stayflow.backend.admin.service;

import com.stayflow.backend.admin.dto.response.DashboardSummaryResponse;
import com.stayflow.backend.admin.dto.response.MonthlyRevenueResponse;
import com.stayflow.backend.ai.service.AiService;
import com.stayflow.backend.reservation.enums.ReservationStatus;
import com.stayflow.backend.reservation.repository.ReservationRepository;
import com.stayflow.backend.room.enums.RoomStatus;
import com.stayflow.backend.room.repository.RoomRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

  private final ReservationRepository reservationRepository;
  private final RoomRepository roomRepository;
  private final AiService aiService;

  public DashboardSummaryResponse getDashboardSummary() {

    LocalDate today = LocalDate.now();

    long todayCheckInCount =
        reservationRepository.countByCheckInDate(today);

    long todayCheckOutCount =
        reservationRepository.countByCheckOutDate(today);

    long occupiedRoomCount =
        roomRepository.countByStatus(RoomStatus.OCCUPIED);

    long cleaningRoomCount =
        roomRepository.countByStatus(RoomStatus.CLEANING);

    return new DashboardSummaryResponse(
        todayCheckInCount,
        todayCheckOutCount,
        occupiedRoomCount,
        cleaningRoomCount
    );
  }

  public String generateBriefing() {
    LocalDate today = LocalDate.now();

    long todayCheckIn = reservationRepository.countByCheckInDate(today);
    long todayCheckOut = reservationRepository.countByCheckOutDate(today);
    long occupied = roomRepository.countByStatus(RoomStatus.OCCUPIED);
    long cleaning = roomRepository.countByStatus(RoomStatus.CLEANING);
    long reserved = reservationRepository.countByStatus(ReservationStatus.RESERVED);
    long checkedIn = reservationRepository.countByStatus(ReservationStatus.CHECKED_IN);

    return aiService.generateBriefing(todayCheckIn, todayCheckOut, occupied, cleaning, reserved, checkedIn);
  }

  public List<MonthlyRevenueResponse> getMonthlyRevenue(int year) {
    return reservationRepository.getMonthlyRevenueStats(year).stream()
        .map(row -> new MonthlyRevenueResponse(
            ((Number) row[0]).intValue(),
            ((Number) row[1]).longValue(),
            ((Number) row[2]).intValue()
        )).toList();
  }

}

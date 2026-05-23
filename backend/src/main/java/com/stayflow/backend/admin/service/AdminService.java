package com.stayflow.backend.admin.service;

import com.stayflow.backend.admin.dto.response.DashboardSummaryResponse;
import com.stayflow.backend.reservation.repository.ReservationRepository;
import com.stayflow.backend.room.enums.RoomStatus;
import com.stayflow.backend.room.repository.RoomRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

  private final ReservationRepository reservationRepository;
  private final RoomRepository roomRepository;

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

}

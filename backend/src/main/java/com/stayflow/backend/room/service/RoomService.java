package com.stayflow.backend.room.service;

import com.stayflow.backend.reservation.enums.ReservationStatus;
import com.stayflow.backend.reservation.repository.ReservationRepository;
import com.stayflow.backend.room.dto.RoomCreateRequest;
import com.stayflow.backend.room.dto.RoomResponse;
import com.stayflow.backend.room.dto.RoomStatusUpdateRequest;
import com.stayflow.backend.room.entity.Room;
import com.stayflow.backend.room.enums.RoomStatus;
import com.stayflow.backend.room.repository.RoomRepository;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {

  private final RoomRepository roomRepository;
  private final ReservationRepository reservationRepository;

  @Transactional
  public RoomResponse createRoom(RoomCreateRequest request) {
    Room room = Room.builder()
        .roomNumber(request.roomNumber())
        .roomType(request.roomType())
        .capacity(request.capacity())
        .price(request.price())
        .status(request.status())
        .build();

    Room savedRoom = roomRepository.save(room);

    return RoomResponse.from(savedRoom);
  }

  public List<RoomResponse> getRooms() {
    return roomRepository.findAll()
        .stream()
        .map(RoomResponse::from)
        .toList();
  }

  public RoomResponse getRoom(Long roomId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("객실을 찾을 수 없습니다."));

    return RoomResponse.from(room);
  }

  @Transactional
  public RoomResponse updateRoomStatus(Long roomId, RoomStatusUpdateRequest request) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("객식을 찾을 수 없습니다."));

    room.updateStatus(request.status());

    return RoomResponse.from(room);
  }

  @Transactional
  public RoomResponse completeCleaning(Long roomId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("객식을 찾을 수 없습니다."));

    if (room.getStatus() != RoomStatus.CLEANING) {
      throw new IllegalArgumentException("청소 중인 객실만 청소 완료 처리할 수 있습니다.");
    }

    room.available();

    return RoomResponse.from(room);
  }

  public List<RoomResponse> getAvailableRooms(
      LocalDate checkInDate,
      LocalDate checkOutDate
  ) {
    long nights = ChronoUnit.DAYS.between(checkInDate, checkOutDate);

    if (nights <= 0) {
      throw new IllegalArgumentException("체크아웃 날짜는 체크인 날짜보다 늦어야 합니다.");
    }

    List<Long> reservedRoomIds = reservationRepository.findReservedRoomIds(
        ReservationStatus.CANCELED,
        checkInDate,
        checkOutDate
    );

    List<Room> rooms;

    if (reservedRoomIds.isEmpty()) {
      rooms = roomRepository.findByStatus(RoomStatus.AVAILABLE);
    } else {
      rooms = roomRepository.findAvailableRooms(
          RoomStatus.AVAILABLE,
          reservedRoomIds
      );
    }

    return rooms.stream()
        .map(RoomResponse::from)
        .toList();
  }

}

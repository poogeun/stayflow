package com.stayflow.backend.room.service;

import com.stayflow.backend.room.dto.RoomCreateRequest;
import com.stayflow.backend.room.dto.RoomResponse;
import com.stayflow.backend.room.dto.RoomStatusUpdateRequest;
import com.stayflow.backend.room.entity.Room;
import com.stayflow.backend.room.enums.RoomStatus;
import com.stayflow.backend.room.repository.RoomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {

  private final RoomRepository roomRepository;

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

}

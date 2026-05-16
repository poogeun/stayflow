package com.stayflow.backend.room.dto;

import com.stayflow.backend.room.entity.Room;
import com.stayflow.backend.room.enums.RoomStatus;
import java.time.LocalDateTime;

public record RoomResponse(
    Long id,
    String roomNumber,
    String roomType,
    Integer capacity,
    Integer price,
    RoomStatus status,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
  public static RoomResponse from(Room room) {
    return new RoomResponse(
        room.getId(),
        room.getRoomNumber(),
        room.getRoomType(),
        room.getCapacity(),
        room.getPrice(),
        room.getStatus(),
        room.getCreatedAt(),
        room.getUpdatedAt()
    );
  }
}

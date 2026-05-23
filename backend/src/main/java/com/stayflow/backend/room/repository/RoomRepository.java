package com.stayflow.backend.room.repository;

import com.stayflow.backend.room.entity.Room;
import com.stayflow.backend.room.enums.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
  long countByStatus(RoomStatus status);
}

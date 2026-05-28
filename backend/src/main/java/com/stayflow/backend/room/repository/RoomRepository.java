package com.stayflow.backend.room.repository;

import com.stayflow.backend.room.entity.Room;
import com.stayflow.backend.room.enums.RoomStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoomRepository extends JpaRepository<Room, Long> {
  long countByStatus(RoomStatus status);

  List<Room> findByStatus(RoomStatus status);

  @Query("""
      select r
      from Room r
      where r.status = :status
        and r.id not in :roomIds
""")
  List<Room> findAvailableRooms(
      RoomStatus status,
      List<Long> roomIds
  );
}

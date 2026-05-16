package com.stayflow.backend.room.repository;

import com.stayflow.backend.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

}

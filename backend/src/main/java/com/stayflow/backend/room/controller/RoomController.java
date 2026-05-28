package com.stayflow.backend.room.controller;

import com.stayflow.backend.room.dto.RoomCreateRequest;
import com.stayflow.backend.room.dto.RoomResponse;
import com.stayflow.backend.room.dto.RoomStatusUpdateRequest;
import com.stayflow.backend.room.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Room", description = "객실 관리 API")
@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

  private final RoomService roomService;

  @Operation(summary = "객실 등록", description = "PMS에서 객실 정보를 등록합니다.")
  @PostMapping
  public RoomResponse createRoom(@Valid @RequestBody RoomCreateRequest request) {
    return roomService.createRoom(request);
  }

  @Operation(summary = "객실 목록 조회", description = "등록된 객실 목록을 조회합니다.")
  @GetMapping
  public List<RoomResponse> getRooms() {
    return roomService.getRooms();
  }

  @GetMapping("/{roomId}")
  public RoomResponse getRoom(@PathVariable Long roomId) {
    return roomService.getRoom(roomId);
  }

  @GetMapping("/available")
  public List<RoomResponse> getAvailableRooms(
      @RequestParam LocalDate checkInDate,
      @RequestParam LocalDate checkOutDate
  ) {
    return roomService.getAvailableRooms(checkInDate, checkOutDate);
  }

  @PatchMapping("/{roomId}/status")
  public RoomResponse updateRoomStatus(
      @PathVariable Long roomId,
      @Valid @RequestBody RoomStatusUpdateRequest request
  ) {
    return roomService.updateRoomStatus(roomId, request);
  }

  @PatchMapping("/{roomId}/cleaning-complete")
  public RoomResponse completeCleaning(@PathVariable Long roomId) {
    return roomService.completeCleaning(roomId);
  }
}

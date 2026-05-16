package com.stayflow.backend.room.dto;

import com.stayflow.backend.room.enums.RoomStatus;
import jakarta.validation.constraints.NotNull;

public record RoomStatusUpdateRequest(
    @NotNull
    RoomStatus status
) {

}

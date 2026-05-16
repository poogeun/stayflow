package com.stayflow.backend.room.dto;

import com.stayflow.backend.room.enums.RoomStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoomCreateRequest(

    @NotBlank
    String roomNumber,

    @NotBlank
    String roomType,

    @NotNull
    @Min(1)
    Integer capacity,

    @NotNull
    @Min(0)
    Integer price,

    @NotNull
    RoomStatus status
) {

}

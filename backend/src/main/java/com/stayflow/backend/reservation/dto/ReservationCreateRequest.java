package com.stayflow.backend.reservation.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record ReservationCreateRequest(
    @NotBlank
    String guestName,

    @NotBlank
    String guestPhone,

    String guestEmail,

    @NotNull
    Long roomId,

    @NotNull
    @Future
    LocalDate checkInDate,

    @NotNull
    @Future
    LocalDate checkOutDate
) {

}

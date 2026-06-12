package com.stayflow.backend.payment.dto;

import java.time.LocalDate;

public record PaymentConfirmRequest(
    String paymentKey,
    String orderId,
    int amount,

    Long roomId,
    String guestName,
    String guestPhone,
    String guestEmail,
    LocalDate checkInDate,
    LocalDate checkOutDate
) {}

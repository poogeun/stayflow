package com.stayflow.backend.admin.dto.response;

public record MonthlyRevenueResponse(
    int month,
    long revenue,
    int reservationCount
) {

}

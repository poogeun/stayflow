package com.stayflow.backend.admin.dto.response;

public record DashboardSummaryResponse(

    long todayCheckInCount,

    long todayCheckOutCount,

    long occupiedRoomCount,

    long cleaningRoomCount
) {
}

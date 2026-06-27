package com.stayflow.backend.admin.controller;

import com.stayflow.backend.admin.dto.response.DashboardSummaryResponse;
import com.stayflow.backend.admin.dto.response.MonthlyRevenueResponse;
import com.stayflow.backend.admin.service.AdminService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

  private final AdminService adminService;

  @GetMapping("/dashboard")
  public DashboardSummaryResponse getDashboardSummary() {
    return adminService.getDashboardSummary();
  }

  @GetMapping("/ai-briefing")
  public String getAiBriefing() {
    return adminService.generateBriefing();
  }

  @GetMapping("/revenue-stats")
  public List<MonthlyRevenueResponse> getMonthlyRevenue(
      @RequestParam(defaultValue = "2026") int year
  ) {
    return adminService.getMonthlyRevenue(year);
  }

}

package com.stayflow.backend.payment;

import com.stayflow.backend.payment.dto.PaymentConfirmRequest;
import com.stayflow.backend.reservation.dto.ReservationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

  private final PaymentService paymentService;

  @PostMapping("/confirm")
  public ResponseEntity<ReservationResponse> confirm(@RequestBody PaymentConfirmRequest request) {
    return ResponseEntity.ok(paymentService.confirmPayment(request));
  }

}

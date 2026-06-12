package com.stayflow.backend.payment;

import com.stayflow.backend.payment.dto.PaymentConfirmRequest;
import com.stayflow.backend.reservation.dto.ReservationCreateRequest;
import com.stayflow.backend.reservation.dto.ReservationResponse;
import com.stayflow.backend.reservation.service.ReservationService;
import java.util.Base64;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class PaymentService {

  private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

  @Value("${toss.secret-key}")
  private String secretKey;

  private final ReservationService reservationService;

  public ReservationResponse confirmPayment(PaymentConfirmRequest request) {
    String encoded = Base64.getEncoder()
        .encodeToString((secretKey + ":").getBytes());

    for (int i = 0; i < 3; i++) {
      try {
        RestClient.create()
            .post()
            .uri("https://api.tosspayments.com/v1/payments/confirm")
            .header("Authorization", "Basic " + encoded)
            .contentType(MediaType.APPLICATION_JSON)
            .body(Map.of(
                "paymentKey", request.paymentKey(),
                "orderId", request.orderId(),
                "amount", request.amount()
            ))
            .retrieve()
            .toBodilessEntity();
        break;
      } catch (HttpServerErrorException e) {
        if (i == 2) throw e;
        try {
          Thread.sleep(300);
        } catch (InterruptedException ie) {
          Thread.currentThread().interrupt();
          throw new RuntimeException(ie);
        }
      }
    }

     return reservationService.createReservation(
          new ReservationCreateRequest(
              request.guestName(),
              request.guestPhone(),
              request.guestEmail(),
              request.roomId(),
              request.checkInDate(),
              request.checkOutDate()
          )
     );
  }
}

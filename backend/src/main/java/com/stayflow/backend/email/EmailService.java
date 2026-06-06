package com.stayflow.backend.email;

import com.stayflow.backend.reservation.dto.ReservationResponse;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

  private final JavaMailSender mailSender;
  private final TemplateEngine templateEngine;

  @Value("${mail.from}")
  private String fromEmail;

  @Async
  public void sendReservationConfirmation(ReservationResponse reservation) {
    if (reservation.guestEmail() == null || reservation.guestEmail().isBlank()) {
      log.warn("이메일 주소 없음, 발송 생략: reservationId={}", reservation.id());
      return;
    }

    try {
      Context context = new Context();
      context.setVariable("reservation", reservation);

      String html = templateEngine.process("email/reservation-confirmation", context);

      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

      helper.setFrom(fromEmail);
      helper.setTo(reservation.guestEmail());
      helper.setSubject("[StayFlow] 예약이 확인되었습니다 - 예약번호 " + reservation.id());
      helper.setText(html, true);

      mailSender.send(message);
      log.info("예약 확인 이메일 발송 완료: reservationId={}", reservation.id());

    } catch (MessagingException e) {
      log.error("이메일 발송 실패: reservationId={}", reservation.id(), e);
    }
  }

}

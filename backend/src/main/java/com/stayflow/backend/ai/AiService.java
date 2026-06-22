package com.stayflow.backend.ai;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class AiService {

  @Value("${gemini.api-key}")
  private String apiKey;

  public String generateBriefing(
      long todayCheckIn,
      long todayCheckOut,
      long occupied,
      long cleaning,
      long reserved,
      long checkedIn
  ) {
    String prompt = """
        당신은 호텔 PMS의 운영 보조 AI입니다. 호텔 스태프에게 오늘의 운영 현황을 3~4문장으로 브리핑해주세요.
        숫자를 그대로 나열하지 말고 의미 있는 인사이트 위주로, 실무적인 말투로 작성하세요.
        
        오늘 날짜: %s
        오늘 체크인 예정: %d건
        오늘 체크아웃 예정: %d건
        현재 투숙 중 객실: %d건
        청소 중 객실: %d개
        예약 확정 대기: %d건
        현재 투숙 중: %d건
        """.formatted(LocalDate.now(), todayCheckIn, todayCheckOut, occupied, cleaning, reserved, checkedIn);

    Map<String, Object> requestBody = Map.of(
        "contents", List.of(
            Map.of("parts", List.of(Map.of("text", prompt)))
        )
    );

    var response = RestClient.create()
        .post()
        .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=" + apiKey)        .body(requestBody)
        .retrieve()
        .toEntity(Map.class);

    var candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
    var content = (Map<String, Object>) candidates.get(0).get("content");
    var parts = (List<Map<String, Object>>) content.get("parts");

    return (String) parts.get(0).get("text");
  }
}

package com.stayflow.backend.ai.service;

import com.stayflow.backend.ai.dto.ChatMessageDto;
import com.stayflow.backend.room.entity.Room;
import com.stayflow.backend.room.repository.RoomRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class ChatService {

  @Value("${gemini.api-key}")
  private String apiKey;

  private final RoomRepository roomRepository;

  public String chat(List<ChatMessageDto> messages) {
    List<Room> rooms = roomRepository.findAll();

    String roomContext = rooms.stream()
        .map(r -> "- %s호 (%s) / 정원 %d명 / 1박 %,d원 / 상태: %s"
            .formatted(r.getRoomNumber(), r.getRoomType(), r.getCapacity(), r.getPrice(), translateStatus(r.getStatus().name())))
        .collect(Collectors.joining("\n"));

    String systemPrompt = """
        당신은 StayFlow 호텔의 AI 컨시어지입니다.
        투숙객의 질문에 친절하고 간결하게 한국어로 답변하세요.
        예약, 객실 안내, 체크인/아웃 등을 도와드립니다.
        체크인 시간은 15:00, 체크아웃 시간은 11:00입니다.
        
        [현재 객실 현황]
        %s
        """.formatted(roomContext);

    List<Map<String, Object>> contents = new ArrayList<>();

    // 시스템 프롬프트를 첫 번째 user 턴으로 주입
    contents.add(Map.of(
        "role", "user",
        "parts", List.of(Map.of("text", systemPrompt))
    ));

    contents.add(Map.of(
        "role", "model",
        "parts", List.of(Map.of("text", "안녕하세요! StayFlow 호텔 AI 컨시어지입니다. 무엇을 도와드릴까요?"))
    ));

    // 실제 대화 히스토리 추가
    for (ChatMessageDto msg : messages) {
      contents.add(Map.of(
          "role", msg.role(),
          "parts", List.of(Map.of("text", msg.content()))
      ));
    }

    Map<String, Object> requestBody = Map.of("contents", contents);

    var response = RestClient.create()
        .post()
        .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=" + apiKey)
        .contentType(MediaType.APPLICATION_JSON)
        .body(requestBody)
        .retrieve()
        .toEntity(Map.class);

    var candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
    var content = (Map<String, Object>) candidates.get(0).get("content");
    var parts = (List<Map<String, Object>>) content.get("parts");

    return (String) parts.get(0).get("text");
  }

  private String translateStatus(String status) {
    return switch (status) {
      case "AVAILABLE" -> "예약 가능";
      case "RESERVED" -> "예약됨";
      case "OCCUPIED" -> "투숙 중";
      case "CLEANING" -> "청소 중";
      case "MAINTENANCE" -> "점검 중";
      default -> status;
    };
  }

}

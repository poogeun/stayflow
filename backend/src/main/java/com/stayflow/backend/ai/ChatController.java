package com.stayflow.backend.ai;

import com.stayflow.backend.ai.dto.ChatRequest;
import com.stayflow.backend.ai.dto.ChatResponse;
import com.stayflow.backend.ai.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

  private final ChatService chatService;

  @PostMapping
  public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
    String content = chatService.chat(request.messages());
    return ResponseEntity.ok(new ChatResponse(content));
  }

}

package com.stayflow.backend.ai.dto;

import java.util.List;

public record ChatRequest(List<ChatMessageDto> messages) {

}

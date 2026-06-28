import { useEffect, useRef, useState } from "react";
import { postChat } from "../../api/chatApi";
import { Chat } from "@mui/icons-material";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input};
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const content = await postChat(nextMessages);
      setMessages([...nextMessages, { role: "model", content }]);
    } catch {
      setMessages([...nextMessages, { role: "model", content: "죄송합니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed top-6 right-10 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mt-16 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#111111] px-5 py-4">
            <div>
              <p className="text-sm font-bold text-white">AI 컨시어지</p>
              <p className="text-xs text-[#C8A97E]">StayFlow Hotel</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>

          {/* 메시지 목록 */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-sm text-gray-400 mt-4">
                안녕하세요! 궁금한 점을 물어보세요 😊
              </p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-6 whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#111111] text-white"
                      : "bg-[#F5F3EE] text-[#111111]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-[#F5F3EE] px-4 py-2 text-sm text-gray-400">
                  입력 중...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* 입력창 */}
          <div className="border-t border-gray-100 px-4 py-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#C8A97E]"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="rounded-xl bg-[#111111] px-4 py-2 text-sm font-bold text-white hover:opacity-80 disabled:opacity-40"
            >
              전송
            </button>
          </div>
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full bg-white border border-[#E8D9C5] px-5 py-3 shadow-lg hover:scale-[1.03] transition-transform"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A97E]">
          <Chat sx={{ fontSize: 20, color: "white" }} />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-[#111111]">AI 컨시어지</div>
          <div className="text-xs text-gray-400">무엇이든 물어보세요</div>
        </div>
      </button>
    </div>
  );
}

export default ChatWidget;
import { describe, beforeEach, jest, test, expect } from "bun:test";
import ChatStream, { TokenType } from "../src/app/utils/ChatStream";

describe("ChatStream", () => {
  let chatStream: ChatStream;

  beforeEach(() => {
    chatStream = new ChatStream("testSecretCode");
    global.fetch = jest.fn();
  });

  test("startStream processes chunks correctly", async () => {
    const mockReadable = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            "data: <thinking> Test thinking </thinking>\n\n",
          ),
        );
        controller.enqueue(
          new TextEncoder().encode("data: <claim>Test claim</claim>\n\n"),
        );
        controller.enqueue(new TextEncoder().encode("data: <cla\n\n"));
        controller.enqueue(new TextEncoder().encode("data: im>partial\n\n"));
        controller.enqueue(new TextEncoder().encode("data: claim</c\n\n"));
        controller.enqueue(
          new TextEncoder().encode("data: laim>\nlast text\n\n"),
        );

        controller.close();
      },
    });

    const mockResponse = {
      ok: true,
      body: mockReadable,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    await chatStream.startStream("test query", true);

    const state = chatStream.getState();

    expect(state.visibleTokens).toEqual([
      { type: TokenType.Thinking, content: " Test thinking " },
      { type: TokenType.Claim, content: "Test claim" },
      { type: TokenType.Claim, content: "partialclaim" },
      { type: TokenType.Text, content: "\nlast text" },
    ]);
    expect(state.isStreaming).toBe(false);
  });
});

import {
  Flex,
  Box,
  Input,
  Button,
  HStack,
  VStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import EmojiPicker from "emoji-picker-react";
import { Socket } from "socket.io-client";
import { neonButton } from "../styles";

function ChatWindow({
  username,
  room,
  chat,
  sendMessage,
  socketRef,
}: any) {
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);

  const typingTimeout = useRef<any>(null);

  // ✅ LISTEN FOR TYPING EVENTS
  useEffect(() => {
    const socket: Socket = socketRef.current;

    socket.on("typing", (user: string) => {
      setTypingUser(user);
    });

    socket.on("stop_typing", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, []);

  // ✅ HANDLE TYPING
  const handleTyping = () => {
    socketRef.current.emit("typing", { username, room });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socketRef.current.emit("stop_typing", { room });
    }, 1200);
  };

  return (
    <Flex h="100vh">

      {/* ✅ SIDEBAR */}
      {showSidebar && (
        <Box
          w={{ base: "200px", md: "280px" }}
          p={4}
          bg="rgba(255,255,255,0.05)"
          borderRight="1px solid rgba(255,255,255,0.1)"
        >
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold">💬 ChatHippo</Text>
            <Text>👤 {username}</Text>
            <Text>📍 {room}</Text>
            <Text color="green.400">● Online</Text>
          </VStack>
        </Box>
      )}

      {/* ✅ CHAT AREA */}
      <Flex
  flex={1}
  direction="column"
  bgGradient="linear(to-br, #0f172a, #1e293b)"
  backgroundImage={`
    radial-gradient(circle at 20% 20%, rgba(34,211,238,0.08), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(167,139,250,0.08), transparent 40%),
    url('https://www.transparenttextures.com/patterns/cubes.png')
  `}
>

        {/* HEADER */}
        <HStack
          p={4}
          justify="space-between"
          borderBottom="1px solid rgba(255,255,255,0.1)"
        >
          <Text>Room: {room}</Text>

          <IconButton
  aria-label="toggle sidebar"
  size="sm"
  icon={<span>☰</span>}
  {...neonButton}
  onClick={() => setShowSidebar(!showSidebar)}
/>
        </HStack>

        {/* MESSAGES */}
        <Flex flex={1} p={4} direction="column" gap={3} overflowY="auto">
          {chat.map((msg: any, i: number) => (
            <ChatBubble key={i} msg={msg} isOwn={msg.user === username} />
          ))}
        </Flex>

        {/* ✅ TYPING INDICATOR */}
        {typingUser && typingUser !== username && (
          <Text px={4} fontSize="sm" color="gray.400">
            {typingUser} is typing
            <span className="dots"></span>
          </Text>
        )}

        {/* INPUT */}
        <Box position="relative">
          {showEmoji && (
            <Box position="absolute" bottom="60px" zIndex={10}>
              <EmojiPicker
                onEmojiClick={(e) =>
                  setMessage((prev) => prev + e.emoji)
                }
              />
            </Box>
          )}

          <HStack p={4}>
            <Button {...neonButton} onClick={() => setShowEmoji(!showEmoji)}>
  😊
</Button>

            <Input
              value={message}
              placeholder="Type message..."
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(message);
                  setMessage("");
                }
              }}
            />

<Button
  {...neonButton}
  onClick={() => {
    sendMessage(message);
    setMessage("");
  }}
>
  Send
</Button>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ChatWindow;
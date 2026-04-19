import { Box, Text, Flex } from "@chakra-ui/react";
import { gradientMsg, otherMsgGradient } from "../styles";

function ChatBubble({ msg, isOwn }: any) {
  return (
    <Flex
      justify={isOwn ? "flex-end" : "flex-start"}
      animation="fadeIn 0.3s ease"
    >
      <Box
        px={4}
        py={2}
        borderRadius="xl"
        maxW="250px"
        bg={isOwn ? gradientMsg : otherMsgGradient}
        color={isOwn ? "black" : "white"}   // ✅ IMPORTANT FIX
        border={!isOwn ? "1px solid rgba(0,0,0,0.1)" : "none"}
      >
        <Text fontSize="xs" opacity={0.7}>
          {msg.user}
        </Text>

        <Text>{msg.message}</Text>

        <Text fontSize="10px" textAlign="right" opacity={0.6}>
          {msg.time}
        </Text>
      </Box>
    </Flex>
  );
}

export default ChatBubble;
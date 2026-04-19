import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { glass, glowCyan } from "../styles";

function Login({ joinRoom }: any) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleJoin = () => {
    if (!name || !room) return;
    joinRoom(name, room);
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, #0f172a, #1e293b)"
      backgroundImage="url('https://www.transparenttextures.com/patterns/cubes.png')"
    >
      <Box p={8} w="320px" {...glass}>
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            💬 NeonTalk
          </Text>

          <Input
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            _focus={{ borderColor: "neon.cyan", ...glowCyan }}
          />

          <Input
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          />

          <Button
            w="full"
            bgGradient="linear(to-r, cyan.400, purple.400)"
            onClick={handleJoin}
          >
            Enter
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Login;
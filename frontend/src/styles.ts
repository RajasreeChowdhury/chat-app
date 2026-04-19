export const glass = {
  bg: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
};

export const glowCyan = {
  boxShadow: "0 0 10px rgba(34,211,238,0.4)",
};

export const glowPurple = {
  boxShadow: "0 0 10px rgba(167,139,250,0.4)",
};

export const gradientMsg =
  "linear-gradient(135deg, #22d3ee, #a78bfa)";

export const otherMsgGradient =
  "linear-gradient(135deg, #1e293b, #334155)";

export const neonButton = {
  bgGradient: "linear(to-r, cyan.400, purple.400)",
  color: "white",

  // ✅ ADD HERE (always visible glow)
  boxShadow: "0 0 8px rgba(167,139,250,0.4)",

  _hover: {
    opacity: 0.9,
    boxShadow: "0 0 12px rgba(34,211,238,0.8)",
  },

  _active: {
    transform: "scale(0.97)",
  },
};
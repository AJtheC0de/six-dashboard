// src/styles/animations.js
import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 113, 227, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 113, 227, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 113, 227, 0);
  }
`;

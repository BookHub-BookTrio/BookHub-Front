import styled, { keyframes } from "styled-components";

const fuschia = "#748C70";

const topBubbles = keyframes`
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`;

const bottomBubbles = keyframes`
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`;

export const BubblyButton = styled.button`
  background-color: transparent;
  color: white; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.25rem; 
  padding: 0; 
  margin: 0; 
  outline: none;
  position: relative;
  appearance: none;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.9);
    box-shadow: 0 2px 25px rgba(170, 239, 165, 0.47);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 140%;
    height: 150%;
    left: -20%;
    top: -40%;
    z-index: -1;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
  }

  &::before {
    background-image: radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, ${fuschia} 20%, transparent 30%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, ${fuschia} 15%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
    display: none;
  }

  &::after {
    background-image: radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, ${fuschia} 15%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%),
      radial-gradient(circle, ${fuschia} 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
    display: none;
  }

  &.animate {
    &::before {
      display: block;
      animation: ${topBubbles} 0.75s ease-in-out forwards;
    }
    &::after {
      display: block;
      animation: ${bottomBubbles} 0.75s ease-in-out forwards;
    }
  }
`;

import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, type Transition } from "framer-motion";

interface PinPadProps {
  springConfig: Transition;
  isSpinning: boolean;
  setIsSpinning: (val: boolean) => void;
}

const PinCodeButton: React.FC = () => {
  const [isPinPad, setIsPinPad] = React.useState(false);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const fluidWidth = isSpinning || isSuccess ? 80 : isPinPad ? 320 : 150;
  const fluidHeight = isSpinning || isSuccess ? 80 : isPinPad ? 80 : 50;
  const springConfig: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  };

  React.useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsSuccess(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsPinPad(false);
        setIsSpinning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <Button
      layout
      onClick={() => !isPinPad && setIsPinPad(true)}
      $isPinPad={isPinPad}
      initial={false}
      animate={{ width: fluidWidth, height: fluidHeight }}
      transition={springConfig}
    >
      <AnimatePresence initial={false} mode="sync">
        {!isPinPad ? (
          <Content
            key="initial-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ContentText
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              Enter Pin
            </ContentText>
          </Content>
        ) : isSuccess ? (
          <SuccessContent key="success-content" />
        ) : isSpinning ? (
          <LoadingContent key="loading-content" springConfig={springConfig} />
        ) : (
          <PinPadContainer
            key="pin-pad-content"
            springConfig={springConfig}
            isSpinning={isSpinning}
            setIsSpinning={setIsSpinning}
          />
        )}
      </AnimatePresence>
    </Button>
  );
};

const PinPadContainer: React.FC<PinPadProps> = ({
  springConfig,
  isSpinning,
  setIsSpinning,
}) => {
  const [vals, setVals] = React.useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const inputs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (v: string, i: number) => {
    const digit = v.slice(-1);
    const newVals = [...vals];
    newVals[i] = digit;
    setVals(newVals);
    if (digit && i < 3) {
      inputs.current[i + 1]?.focus();
      setFocusedIndex(i + 1);
    } else if (digit && i === 3) {
      setIsSpinning(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Backspace" && !vals[i] && i > 0) {
      inputs.current[i - 1]?.focus();
      setFocusedIndex(i - 1);
    }
  };

  return (
    <StyledPinPadContainer
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <StyledPinPadInputContainer>
        <FocusRing
          initial={false}
          animate={{ x: focusedIndex * 55 }}
          transition={springConfig}
        />
        {vals.map((v, i) => (
          <StyledPinPadInputItem
            key={i}
            //@ts-ignore
            ref={(el) => (inputs.current[i] = el)}
            value={v}
            onFocus={() => setFocusedIndex(i)}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            type="text"
            inputMode="numeric"
            autoFocus={i === 0}
            initial={{ scale: 0.9, y: -2, opacity: 0, rotateX: -50 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, y: 2, opacity: 0 }}
            transition={
              {
                ...springConfig,
                delay: isSpinning ? 0 : i * 0.04,
              } as Transition
            }
            placeholder="0"
          />
        ))}
      </StyledPinPadInputContainer>
    </StyledPinPadContainer>
  );
};

const LoadingContent: React.FC<{ springConfig: Transition }> = ({
  springConfig,
}) => {
  return (
    <Content
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <SpinnerSvg
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            strokeDasharray="50 12.5"
            initial={{ strokeDasharray: "50 12.5" }}
            exit={{
              strokeDasharray: "0 0",
              pathLength: 1,
            }}
            transition={{
              //@ts-ignore
              exit: {
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
          />
        </svg>
      </SpinnerSvg>
    </Content>
  );
};

const SuccessContent: React.FC = () => {
  return (
    <Content
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <SuccessSvg>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            fill="var(--blue)"
            stroke="var(--blue)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 22,
            }}
          />
          <motion.path
            d="M8 12.5l3 3 5-5.5"
            stroke="var(--white)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: 0.12,
              },
              opacity: {
                duration: 0.01,
                delay: 0.12,
              },
            }}
          />
        </svg>
      </SuccessSvg>
    </Content>
  );
};

const Button = styled(motion.button)<{ $isPinPad: boolean }>`
  background: var(--white);
  border-radius: 20px;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.08);
  border: 0px;
  color: var(--dark);
  cursor: ${(props) => (props.$isPinPad ? "default" : "pointer")};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  &:hover {
    background: ${(props) =>
      props.$isPinPad ? "var(--white)" : "var(--surface)"};
  }
  font-family: "Inter", sans-serif;
  &:active {
    scale: ${(props) => (props.$isPinPad ? 1 : 0.95)};
  }
`;

const Content = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const ContentText = styled(motion.span)`
  font-size: 17px;
  font-weight: 500;
`;

const SpinnerSvg = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessSvg = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPinPadContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledPinPadInputContainer = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
  perspective: 600px;
`;

const FocusRing = styled(motion.div)`
  position: absolute;
  width: 45px;
  height: 55px;
  border: 2px solid var(--blue);
  border-radius: 12px;
  pointer-events: none;
  z-index: 3;
  box-sizing: border-box;
  left: 0;
  top: 0;
`;

const StyledPinPadInputItem = styled(motion.input)`
  width: 45px;
  height: 55px;
  border: 1.5px solid var(--surface);
  background: var(--surface);
  color: var(--dark);
  font-size: 25px;
  text-align: center;
  border-radius: 12px;
  outline: none;
  z-index: 2;
  box-sizing: border-box;
  &:focus {
    border-color: transparent;
  }
  font-family: "Inter", sans-serif;
  font-weight: 550;
`;

export default PinCodeButton;

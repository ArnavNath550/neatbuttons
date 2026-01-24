import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

const LoadingStateButton: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const scheduleRef = React.useRef<HTMLSpanElement>(null);
  const processingRef = React.useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = React.useState({
    scheduleWidth: 0,
    processingWidth: 0,
  });

  React.useEffect(() => {
    if (scheduleRef.current && processingRef.current) {
      setDimensions({
        scheduleWidth: scheduleRef.current.offsetWidth,
        processingWidth: processingRef.current.offsetWidth,
      });
    }
  }, []);

  const iconWidth = 20;
  const gap = 8;
  const padding = 24;

  const scheduleButtonWidth =
    iconWidth + gap + dimensions.scheduleWidth + padding * 2 + 60;
  const processingButtonWidth =
    iconWidth + gap + dimensions.processingWidth + padding * 2 + 60;

  const trackOffset = -(dimensions.scheduleWidth + 2);

  return (
    <Center>
      <Button
        layout
        onClick={() => setIsLoading(!isLoading)}
        animate={{
          width: isLoading ? processingButtonWidth : scheduleButtonWidth,
        }}
        transition={{
          layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <motion.div
          layout
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <IconContainer>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              animate={{
                rotate: isLoading ? 360 : 0,
              }}
              transition={{
                rotate: isLoading
                  ? { duration: 1, repeat: Infinity, ease: "linear" }
                  : { duration: 0 },
              }}
            >
              <motion.path
                d={isLoading ? "M12 3 A9 9 0 0 1 21 12" : "M12 5 L12 19"}
                stroke="var(--offPrimary, #ccc)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={false}
                animate={{
                  d: isLoading ? "M12 3 A9 9 0 0 1 21 12" : "M12 5 L12 19",
                }}
                transition={{
                  d: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }}
              />
              <motion.path
                d="M5 12 L19 12"
                stroke="var(--offPrimary, #ccc)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={false}
                animate={{
                  opacity: isLoading ? 0 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.svg>
          </IconContainer>
          <Canvas>
            <Track
              animate={{ x: isLoading ? trackOffset : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Word
                ref={scheduleRef}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Schedule
              </Word>
              <Word>Meeting</Word>
              <Word
                ref={processingRef}
                className="processing-word"
                animate={{ opacity: isLoading ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Processing
              </Word>
            </Track>
          </Canvas>
        </motion.div>
      </Button>
    </Center>
  );
};

export default LoadingStateButton;

const Button = styled(motion.button)`
  background: var(--primary, #000);
  height: 48px;
  border-radius: 999px;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  padding: 0 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: background 0.3s ease;
  &:hover {
    background: var(--primaryHover, #333);
  }
`;

const IconContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Canvas = styled(motion.div)`
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
`;

const Track = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
  .processing-word {
    margin-left: 4px;
  }
`;

const Word = styled(motion.span)`
  font-size: 16px;
  font-weight: 450;
  line-height: 20px;
  display: inline-block;
  white-space: nowrap;
`;

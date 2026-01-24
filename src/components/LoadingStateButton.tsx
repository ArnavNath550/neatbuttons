import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

const LoadingStateButton = () => {
  const [state, setState] = React.useState("idle");
  const [shouldFail, setShouldFail] = React.useState(true);
  const scheduleRef = React.useRef(null);
  const meetingRef = React.useRef(null);
  const processingRef = React.useRef(null);
  const resultRef = React.useRef(null);
  const [dimensions, setDimensions] = React.useState({
    scheduleWidth: 0,
    meetingWidth: 0,
    processingWidth: 0,
    resultWidth: 0,
  });

  React.useEffect(() => {
    if (
      scheduleRef.current &&
      meetingRef.current &&
      processingRef.current &&
      resultRef.current
    ) {
      setDimensions({
        scheduleWidth: scheduleRef.current.offsetWidth,
        meetingWidth: meetingRef.current.offsetWidth,
        processingWidth: processingRef.current.offsetWidth,
        resultWidth: resultRef.current.offsetWidth,
      });
    }
  }, [state]);

  const handleClick = () => {
    if (state === "idle") {
      setState("loading");
      setTimeout(() => {
        if (shouldFail) {
          setState("error");
          setShouldFail(false);
        } else {
          setState("success");
          setShouldFail(true);
        }
      }, 2000);
    } else if (state === "error" || state === "success") {
      setState("idle");
    }
  };

  const iconWidth = 20;
  const gap = 8;
  const padding = 24;
  const wordGap = 6;

  const scheduleButtonWidth =
    iconWidth +
    gap +
    dimensions.scheduleWidth +
    wordGap +
    dimensions.meetingWidth +
    padding * 2;
  const processingButtonWidth =
    iconWidth +
    gap +
    dimensions.processingWidth +
    wordGap +
    dimensions.meetingWidth +
    padding * 2;
  const resultButtonWidth =
    iconWidth +
    gap +
    dimensions.processingWidth +
    wordGap +
    dimensions.resultWidth +
    padding * 2;

  const trackOffsetLoading = -(dimensions.scheduleWidth + wordGap);
  const trackOffsetResult = -(
    dimensions.scheduleWidth +
    wordGap +
    dimensions.meetingWidth +
    wordGap
  );

  const getButtonWidth = () => {
    if (state === "success" || state === "error") return resultButtonWidth;
    if (state === "loading") return processingButtonWidth;
    return scheduleButtonWidth;
  };

  const getTrackOffset = () => {
    if (state === "success" || state === "error") return trackOffsetResult;
    if (state === "loading") return trackOffsetLoading;
    return 0;
  };

  const getBackground = () => {
    if (state === "error") return "var(--error, #dc2626)";
    if (state === "success") return "var(--success, #16a34a)";
    return "var(--primary, #000)";
  };

  const getIconPaths = () => {
    if (state === "idle") {
      return {
        path1: "M12 5 L12 19",
        path2: "M5 12 L19 12",
        path3: "M12 12 L12 12",
        opacity1: 1,
        opacity2: 1,
        opacity3: 0,
      };
    } else if (state === "loading") {
      return {
        path1: "M12 3 A9 9 0 0 1 21 12",
        path2: "M12 12 L12 12",
        path3: "M12 12 L12 12",
        opacity1: 1,
        opacity2: 0,
        opacity3: 0,
      };
    } else if (state === "error") {
      return {
        path1: "M12 2 A10 10 0 1 0 12 22 A10 10 0 1 0 12 2",
        path2: "M12 7 L12 13",
        path3: "M12 16 L12 17",
        opacity1: 1,
        opacity2: 1,
        opacity3: 1,
      };
    } else {
      return {
        path1: "M12 12 L12 12",
        path2: "M7 12 L10.5 16",
        path3: "M10.5 16 L17 8",
        opacity1: 0,
        opacity2: 1,
        opacity3: 1,
      };
    }
  };

  const iconPaths = getIconPaths();

  return (
    <Center>
      <Button
        layout
        onClick={handleClick}
        animate={{
          width: getButtonWidth(),
          background: getBackground(),
        }}
        transition={{
          layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          background: { duration: 0.3 },
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
                rotate: state === "loading" ? 360 : 0,
              }}
              transition={{
                rotate:
                  state === "loading"
                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                    : { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
              }}
            >
              <motion.path
                d={iconPaths.path1}
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: iconPaths.path1,
                  opacity: iconPaths.opacity1,
                }}
                transition={{
                  d: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                  opacity: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                }}
                style={{
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }}
              />
              <motion.path
                d={iconPaths.path2}
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: iconPaths.path2,
                  opacity: iconPaths.opacity2,
                }}
                transition={{
                  d: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                  opacity: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                }}
              />
              <motion.path
                d={iconPaths.path3}
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: iconPaths.path3,
                  opacity: iconPaths.opacity3,
                }}
                transition={{
                  d: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                  opacity: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                }}
              />
            </motion.svg>
          </IconContainer>
          <Canvas>
            <Track
              animate={{
                x: getTrackOffset(),
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Word
                ref={scheduleRef}
                animate={{ opacity: state === "idle" ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Schedule
              </Word>
              <Word
                ref={meetingRef}
                animate={{
                  opacity: state === "idle" || state === "loading" ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Meeting
              </Word>
              <Word
                ref={processingRef}
                animate={{ opacity: state !== "idle" ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Processing
              </Word>
              <Word
                ref={resultRef}
                animate={{
                  opacity: state === "error" || state === "success" ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {state === "success" ? "Successful" : "Failed"}
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
  gap: 6px;
  white-space: nowrap;
`;

const Word = styled(motion.span)`
  font-size: 16px;
  font-weight: 450;
  line-height: 20px;
  display: inline-block;
  white-space: nowrap;
`;

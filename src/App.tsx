import "./App.css";
import LoadingStateButton from "./components/LoadingStateButton";
import PinCodeButton from "./components/PinCodeButton";
import styled from "styled-components";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      delayChildren: 0.1,
      type: "spring",
      damping: 14,
      stiffness: 150,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
    // scale: 0.97,
    // filter: "blur(4px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 150,
    },
  },
};

function App() {
  return (
    <StyledContent>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StyledHeaderContent>
          <StyledLogo src="/brandmark.svg" variants={itemVariants} />
          <StyledHeader>
            <StyledHeaderText variants={itemVariants}>
              Neat Buttons
            </StyledHeaderText>
            <StyledHeaderMeta variants={itemVariants}>
              A small little collection of very neat buttons, to give you some
              inspiration for your own buttons.
            </StyledHeaderMeta>
          </StyledHeader>
        </StyledHeaderContent>

        <StyledBodyContent>
          <StyledBodyPreviewItem variants={itemVariants}>
            <LoadingStateButton />
          </StyledBodyPreviewItem>
          <StyledBodyPreviewItem variants={itemVariants}>
            <PinCodeButton />
          </StyledBodyPreviewItem>
        </StyledBodyContent>
      </motion.div>
    </StyledContent>
  );
}

export default App;

const StyledContent = styled.div`
  padding: 5.5rem 20px 20px;
`;

const StyledHeaderContent = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const StyledHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledHeaderText = styled(motion.div)`
  font-size: var(--fs-md);
  font-weight: var(--fw-medium);
  color: var(--dark);
  font-feature-settings: "kern", "frac", "kern", "ss02";
  margin: 0;
`;

const StyledHeaderMeta = styled(motion.div)`
  font-size: var(--fs-base);
  font-weight: var(--fw-normal);
  color: var(--info);
  line-height: var(--lh-base);
  font-feature-settings: "kern", "frac", "kern", "ss02";
  margin: 0;
`;

const StyledBodyContent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1024px;
  width: 100%;
  margin: 50px auto 0;
  gap: 10px;
  align-items: center;
  justify-content: center;

  @media (max-width: 920px) {
    flex-direction: column;
  }
`;

const StyledBodyPreviewItem = styled(motion.div)`
  background: var(--overSurface);
  width: 450px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;

  @media (max-width: 500px) {
    width: 100%;
    height: 350px;
  }
`;

const StyledLogo = styled(motion.img)`
  width: 30px;
  height: 30px;
  margin-bottom: 20px;
`;

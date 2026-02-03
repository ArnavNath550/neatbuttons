import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

import { ArrowLeft } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.015,
      staggerDirection: -1,
      duration: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.88, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.6, 1],
    },
  },
};

interface Album {
  albumImage: string;
  artistImage: string;
  artistName: string;
  albumName: string;
}

const ALBUMS_DATA: Album[] = [
  {
    albumImage: "https://arnavshome.vercel.app/images/artwork/artwork-one.jpg",
    artistImage: "",
    artistName: "Rabindranath Tagore",
    albumName: "The House Within",
  },
  {
    albumImage: "https://arnavshome.vercel.app/images/artwork/artwork-two.jpg",
    artistImage: "",
    artistName: "Raja Ravi Varma",
    albumName: "Goddess Saraswati",
  },
  {
    albumImage:
      "https://www.artzolo.com/cdn/shop/articles/kadambari-artzolo-com.webp?v=1769332392&width=550",
    artistImage: "",
    artistName: "Raja Ravi Varma",
    albumName: "Lady Playing the Veena",
  },

  {
    albumImage: "https://arnavshome.vercel.app/images/artwork/artwork-five.jpg",
    artistImage: "",
    artistName: "Gaganedranath Tagore",
    albumName: "Pratima Visarjan",
  },
];

const ViewArtworkButton: React.FC = () => {
  const [isViewing, setIsViewing] = React.useState(false);
  const [albumPreviewIndex, setAlbumPreviewIndex] = React.useState(-1);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollPositionRef = React.useRef(0);

  const FLUID_WIDTH = isViewing ? 400 : 300;
  const FLUID_HEIGHT = isViewing ? (albumPreviewIndex == -1 ? 380 : 300) : 50;

  const randomRotations = React.useMemo(
    () => [0, 1, 2].map(() => Math.random() * 20 - 10),
    [],
  );

  React.useEffect(() => {
    if (albumPreviewIndex === -1 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [albumPreviewIndex]);

  const handleAlbumClick = (index: number) => {
    if (scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollTop;
    }
    setAlbumPreviewIndex(index);
  };

  return (
    <Button
      animate={{ width: FLUID_WIDTH, height: FLUID_HEIGHT }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => {
        if (isViewing === false) {
          setIsViewing(true);
        } else if (albumPreviewIndex > -1) {
          setAlbumPreviewIndex(-1);
        }
      }}
      $isViewing={isViewing}
    >
      <AnimatePresence mode="sync">
        {!isViewing ? (
          <Content
            key="content"
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <SmallAlbumsPreview>
              {[0, 1, 2].map((i) => (
                <AlbumPreview
                  key={i}
                  layoutId={`album-${i}`}
                  rotation={randomRotations[i]}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  $hasImage={!!ALBUMS_DATA[i].albumImage}
                  $imageUrl={ALBUMS_DATA[i].albumImage}
                />
              ))}
            </SmallAlbumsPreview>
            <ContentText>View All Artworks</ContentText>
          </Content>
        ) : (
          <>
            <AnimatePresence mode="sync">
              {albumPreviewIndex > -1 ? (
                <>
                  <Controls
                    key="preview-controls"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ControlButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setAlbumPreviewIndex(-1);
                      }}
                    >
                      <ArrowLeft />
                    </ControlButton>
                  </Controls>
                  <StyledPreviewContent
                    key="preview"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <StyledPreviewContainer>
                      <StyledGridItem
                        layoutId={
                          albumPreviewIndex < 3
                            ? `album-${albumPreviewIndex}`
                            : `preview-album-${albumPreviewIndex}`
                        }
                        transition={{
                          duration: 0.55,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        $hasImage={!!ALBUMS_DATA[albumPreviewIndex].albumImage}
                        $imageUrl={ALBUMS_DATA[albumPreviewIndex].albumImage}
                      />
                    </StyledPreviewContainer>
                    <StyledHeadingText
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{
                        delay: 0.08,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {ALBUMS_DATA[albumPreviewIndex].albumName}
                    </StyledHeadingText>
                    <StyledCreator
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{
                        delay: 0.12,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <StyledCreatorPic
                        $hasImage={!!ALBUMS_DATA[albumPreviewIndex].artistImage}
                        $imageUrl={ALBUMS_DATA[albumPreviewIndex].artistImage}
                      />
                      <StyledCreatorName>
                        {ALBUMS_DATA[albumPreviewIndex].artistName}
                      </StyledCreatorName>
                    </StyledCreator>
                  </StyledPreviewContent>
                </>
              ) : (
                <>
                  <Controls
                    key="grid-controls"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ControlButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsViewing(false);
                      }}
                    >
                      <ArrowLeft />
                    </ControlButton>
                  </Controls>
                  <ScrollContainer
                    key="grid-scroll"
                    ref={scrollContainerRef}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <StyledGrid
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {ALBUMS_DATA.map((album, index) => (
                        <StyledGridItem
                          key={index}
                          layoutId={
                            index < 3
                              ? `album-${index}`
                              : `preview-album-${index}`
                          }
                          //@ts-ignore
                          variants={index >= 3 ? itemVariants : undefined}
                          transition={{
                            duration: 0.55,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAlbumClick(index);
                          }}
                          exit={{ opacity: 0, scale: 0.94 }}
                          $hasImage={!!album.albumImage}
                          $imageUrl={album.albumImage}
                        />
                      ))}
                    </StyledGrid>
                  </ScrollContainer>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default ViewArtworkButton;

const Button = styled(motion.button)<{ $isViewing: boolean }>`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.08);
  border: 0px;
  color: var(--dark);
  outline: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  will-change: width, height;
  transform: translate3d(0, 0, 0);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // transition: ease 0.1s all;
  &:active {
    scale: ${(props) => (props.$isViewing == false ? 0.97 : 1)};
  }
`;

const Content = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  inset: 0;
  justify-content: center;
  will-change: opacity, transform;
  transform: translate3d(0, 0, 0);
`;

const ContentText = styled(motion.span)`
  font-size: 17px;
  font-weight: 500;
`;

const SmallAlbumsPreview = styled(motion.div)`
  display: flex;
  align-items: center;
  padding-left: 8px;
`;

const AlbumPreview = styled(motion.div)<{
  rotation: number;
  $hasImage: boolean;
  $imageUrl: string;
}>`
  width: 24px;
  height: 24px;
  background: ${(props) =>
    props.$hasImage ? `url(${props.$imageUrl})` : "var(--surface)"};
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  margin-left: -10px;
  border: 2px solid #fff;
  rotate: ${(props) => props.rotation}deg;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  inset: 0;
  cursor: default;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

const StyledGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  padding: 30px;
  padding-top: 70px;
  gap: 16px;
  box-sizing: border-box;
  will-change: opacity;
  transform: translate3d(0, 0, 0);
`;

const StyledGridItem = styled(motion.div)<{
  $hasImage: boolean;
  $imageUrl: string;
}>`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: ${(props) =>
    props.$hasImage ? `url(${props.$imageUrl})` : "var(--surface)"};
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  cursor: pointer;
`;

const StyledPreviewContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
  will-change: opacity;
  transform: translate3d(0, 0, 0);
  position: absolute;
  inset: 0;
`;

const StyledPreviewContainer = styled.div`
  width: 150px;
  height: 150px;
`;

const StyledHeadingText = styled(motion.div)`
  font-size: 1.2rem;
  color: var(--text);
  font-weight: 550;
  will-change: opacity, transform;
  transform: translate3d(0, 0, 0);
`;

const StyledCreator = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledCreatorPic = styled.div<{ $hasImage: boolean; $imageUrl: string }>`
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.$hasImage ? `url(${props.$imageUrl})` : "var(--surface)"};
  background-size: cover;
  background-position: center;
  border-radius: 999px;
`;

const StyledCreatorName = styled.div`
  font-weight: 450;
  font-size: 15px;
`;

const Controls = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 30px;
  z-index: 10000;
`;

const ControlButton = styled.div`
  background: var(--surface);
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

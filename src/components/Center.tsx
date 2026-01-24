import * as React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Center: React.FC<Props> = (props: Props) => {
  return <StyledCenter>{props.children}</StyledCenter>;
};

export default Center;

const StyledCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

import React from "react";
import { StyledText } from "./Text.styled";

export interface ITextProps {
  text: string | React.ReactNode;

  /**
   * html tag (h1, h2, etc..)
   * @default div
   */
  tag?: keyof JSX.IntrinsicElements;

  /**
   * font size of element
   * @default 16px
   */
  size?: string;
}

const Text = (props: ITextProps) => {
  const { text, size = "16px", tag = "div" } = props;
  return (
    <StyledText $fontSize={size} as={tag}>
      {text}
    </StyledText>
  );
};

export default React.memo(Text);

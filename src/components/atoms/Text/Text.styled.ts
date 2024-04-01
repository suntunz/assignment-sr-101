import styled from "styled-components";

export const StyledText = styled.div<{ $fontSize: string; $color?: string }>`
  font-size: ${({ $fontSize }) => $fontSize};
  color: ${({ $color }) => $color || "#000000"};
`;

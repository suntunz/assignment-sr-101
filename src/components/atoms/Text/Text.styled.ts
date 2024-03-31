import styled from "styled-components";

export const StyledText = styled.div<{ $fontSize: string }>`
  font-size: ${({ $fontSize }) => $fontSize};
`;

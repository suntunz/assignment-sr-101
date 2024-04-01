import styled from "styled-components";

export const DataListStyled = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

import styled from "styled-components";

export const TokenPriceListTemplateWrapper = styled.div`
  .flex {
    display: flex;
    gap: 16px;

    @media screen and (max-width: 640px) {
      flex-flow: column-reverse;
    }

    .flex-column {
      flex-flow: column;
      min-width: 320px;
    }
    .flex-1 {
      flex: 1 1 auto;
      overflow-wrap: anywhere;
    }
  }
`;

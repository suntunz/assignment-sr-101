import React from "react";

import Text, { ITextProps } from "components/atoms/Text";
import { TokenPriceListTemplateWrapper } from "./TokenPriceListTemplateStyled";

interface ITokenPriceListTemplateProps {
  headerText: ITextProps;
}

const TokenPriceListTemplate = (props: ITokenPriceListTemplateProps) => {
  const { headerText } = props;
  return (
    <TokenPriceListTemplateWrapper>
      <Text {...headerText} />
    </TokenPriceListTemplateWrapper>
  );
};

export default React.memo(TokenPriceListTemplate);

import React from "react";

import Text, { ITextProps } from "components/atoms/Text";
import { TokenPriceListTemplateWrapper } from "./TokenPriceListTemplate.styled";
import LikedTokenReport, {
  ILikedTokenReportProps,
} from "components/molecules/LikedTokenReport";
import LikedList, { ILikedListProps } from "components/molecules/LikedList";
import TokenTable, { ITokenTableProps } from "components/organisms/TokenTable";

interface ITokenPriceListTemplateProps {
  headerTextProps: ITextProps;
  likedTokenReportProps: ILikedTokenReportProps;
  likedListProps: ILikedListProps;
  tokenTableProps: ITokenTableProps;
}

const TokenPriceListTemplate = (props: ITokenPriceListTemplateProps) => {
  const {
    headerTextProps,
    likedTokenReportProps,
    likedListProps,
    tokenTableProps,
  } = props;
  return (
    <TokenPriceListTemplateWrapper>
      <Text {...headerTextProps} />
      <LikedTokenReport {...likedTokenReportProps} />
      <div style={{ display: "flex" }}>
        <TokenTable {...tokenTableProps} />
        <LikedList {...likedListProps} />
      </div>
    </TokenPriceListTemplateWrapper>
  );
};

export default React.memo(TokenPriceListTemplate);

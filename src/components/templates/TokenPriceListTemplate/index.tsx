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
      {/* Header title */}
      <Text {...headerTextProps} />

      {/* Liked token report */}
      <LikedTokenReport {...likedTokenReportProps} />

      {/* Token table */}
      <TokenTable {...tokenTableProps} />

      {/* Liked list */}
      <LikedList {...likedListProps} />
    </TokenPriceListTemplateWrapper>
  );
};

export default React.memo(TokenPriceListTemplate);

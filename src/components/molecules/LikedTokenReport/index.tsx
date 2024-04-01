import React from "react";
import { LikedTokenReportWrapper } from "./LikedTokenReport.styled";
import { BigNumber } from "ethers";
import Card from "components/atoms/Card";
import Text from "components/atoms/Text";

export interface ILikedTokenReportProps {
  likedTokens: string[];
  tokenPrices: Record<string, BigNumber>;
}

const LikedTokenReport = (props: ILikedTokenReportProps) => {
  const { likedTokens, tokenPrices } = props;

  const findExtremeToken = (
    tokens: string[],
    comparator: (a: BigNumber, b: BigNumber) => boolean
  ): string => {
    return tokens.reduce((extremeToken, token) => {
      if (extremeToken === "X") return token;
      const price0 = tokenPrices[extremeToken];
      const price1 = tokenPrices[token];

      if (!price0 || !price1) return extremeToken;
      return comparator(price0, price1) ? extremeToken : token;
    }, "X");
  };

  const highestPriceToken = findExtremeToken(likedTokens, (a, b) => a.gt(b));
  const lowestPriceToken = findExtremeToken(likedTokens, (a, b) => a.lt(b));

  return (
    <LikedTokenReportWrapper>
      <Card>
        <div className="text-wrapper">
          <Text text="HIGHEST Price liked TOKEN: " color="green" />
          <Text text={highestPriceToken} color="#074707" />
        </div>
        <br />
        <div className="text-wrapper">
          <Text text="LOWEST Price liked TOKEN: " color="red" />
          <Text text={lowestPriceToken} color="#c50000" />
        </div>
      </Card>
    </LikedTokenReportWrapper>
  );
};

export default React.memo(LikedTokenReport);

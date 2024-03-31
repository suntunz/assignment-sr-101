import React from "react";
import { LikedTokenReportWrapper } from "./LikedTokenReport.styled";
import { BigNumber } from "ethers";

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
      <div style={{ display: "flex" }}>
        <div style={{ fontWeight: "bold" }}>
          HIGHEST Price liked TOKEN: {highestPriceToken}
        </div>
        <div style={{ margin: "0 4rem" }}>||||||||</div>
        <div style={{ fontWeight: "bold" }}>
          LOWEST Price liked TOKEN: {lowestPriceToken}
        </div>
      </div>
    </LikedTokenReportWrapper>
  );
};

export default React.memo(LikedTokenReport);

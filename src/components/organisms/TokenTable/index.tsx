import { BigNumber } from "ethers";
import React, { useMemo, useState } from "react";
import { TokenTableWrapper } from "./TokenTable.styled";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import DataList from "components/molecules/DataList";

interface IToken {
  name: string;
  priceId: string;
}

interface ITokenPriceList extends IToken {
  currentPrice: string;
  priceChanges: string;
  changeColor: string;
}

export interface ITokenTableProps {
  tokenPrices: Record<string, BigNumber>;
  previousPrices: Record<string, BigNumber>;
  tokens: Array<IToken>;
  onChange: (likedTokens: Array<string>) => void;
}

const TokenTable: React.FC<ITokenTableProps> = ({
  tokenPrices,
  previousPrices,
  tokens,
  onChange,
}) => {
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());

  const handleLikedToken = (tokenName: string) => {
    const newLikedSet = new Set(likedSet);
    newLikedSet.has(tokenName)
      ? newLikedSet.delete(tokenName)
      : newLikedSet.add(tokenName);
    setLikedSet(newLikedSet);
    onChange(Array.from(newLikedSet));
  };

  const tokenPriceList: ITokenPriceList[] = useMemo(() => {
    return tokens.map((token) => {
      const currentPrice = tokenPrices[token.name] || BigNumber.from(0);
      const last24Price = previousPrices[token.name] || BigNumber.from(0);

      const percentChanged = last24Price.isZero()
        ? BigNumber.from(0)
        : currentPrice
            .sub(last24Price)
            .mul(parseUnits("1", 30))
            .div(last24Price);

      const priceChanges = formatUnits(percentChanged, 28);
      const changeColor = percentChanged.gte(0) ? "green" : "red";

      return {
        ...token,
        currentPrice: formatUnits(currentPrice, 30),
        priceChanges,
        changeColor,
      };
    });
  }, [tokens, tokenPrices, previousPrices]);

  return (
    <TokenTableWrapper>
      <div style={{ padding: 8, width: "70%" }}>
        <table>
          <thead>
            <tr>
              <th>ACTION</th>
              <th>TOKEN</th>
              <th>PRICE</th>
              <th>%CHANGE</th>
            </tr>
          </thead>
          <tbody>
            {tokenPriceList.map((token) => (
              <tr key={token.name}>
                <td>
                  <button onClick={() => handleLikedToken(token.name)}>
                    {likedSet.has(token.name) ? "Liked" : "Like"}
                  </button>
                </td>
                <td>{token.name}</td>
                <DataList value={token.currentPrice} />
                <DataList
                  value={token.priceChanges}
                  textColor={token.changeColor}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TokenTableWrapper>
  );
};

export default React.memo(TokenTable);

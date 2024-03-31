import { BigNumber } from "ethers";
import React, { useState } from "react";
import { TokenTableWrapper } from "./TokenTable.styled";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export interface ITokenTableProps {
  tokenPrices: Record<string, BigNumber>;
  previousPrices: Record<string, BigNumber>;
  tokens: Array<{
    name: string;
    priceId: string;
  }>;
  onChange: (likedList: string[]) => void;
}

const TokenTable = (props: ITokenTableProps) => {
  const { tokenPrices, previousPrices, tokens, onChange } = props;
  const [likedList, setLikedList] = useState<string[]>([]);

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
            {tokens.map((t) => (
              <tr>
                <td>
                  <button
                    onClick={() => {
                      if (likedList.find((l) => l === t.name)) {
                        setLikedList(likedList.filter((l) => l !== t.name));
                        onChange(likedList);
                      } else {
                        likedList.push(t.name);
                        setLikedList(likedList);
                        onChange(likedList);
                      }
                    }}
                  >
                    {likedList.includes(t.name) ? "Liked" : "Like"}
                  </button>
                </td>
                <td>{t.name}</td>
                <td style={{ textAlign: "right" }}>
                  {(() => {
                    const price =
                      Object.entries(tokenPrices).find(
                        ([key]) => key === t.name
                      )?.[1] ?? BigNumber.from(0);

                    return formatUnits(price, 30);
                  })()}
                </td>
                {/* todo: show red number when change is negative */}
                {/*       show green number when change is positive */}
                <td style={{ textAlign: "right" }}>
                  {(() => {
                    const currentPrice =
                      Object.entries(tokenPrices).find(
                        ([key]) => key === t.name
                      )?.[1] ?? BigNumber.from(0);

                    const last24Price =
                      Object.entries(previousPrices).find(
                        ([key]) => key === t.name
                      )?.[1] ?? BigNumber.from(0);

                    const percentChanged = last24Price.isZero()
                      ? BigNumber.from(0)
                      : currentPrice
                          .sub(last24Price)
                          .mul(parseUnits("1", 30))
                          .div(last24Price);

                    return formatUnits(percentChanged, 28) + "%";
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TokenTableWrapper>
  );
};

export default React.memo(TokenTable);

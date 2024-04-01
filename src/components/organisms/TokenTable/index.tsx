import { BigNumber } from "ethers";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const LIMIT = 20;
  const TOTAL_PAGES = 10;

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const handleLikedToken = (tokenName: string) => {
    const newLikedSet = new Set(likedSet);
    newLikedSet.has(tokenName)
      ? newLikedSet.delete(tokenName)
      : newLikedSet.add(tokenName);
    setLikedSet(newLikedSet);
    onChange(Array.from(newLikedSet));
  };

  const tokenPriceList: ITokenPriceList[] = useMemo(() => {
    const data = tokens.map((token) => {
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

    if (pageNum > TOTAL_PAGES) {
      return data;
    }

    return data.slice(0, pageNum * LIMIT);
  }, [tokens, pageNum, tokenPrices, previousPrices]);

  return (
    <TokenTableWrapper>
      <div className="table">
        <div className="row header">
          <div className="cell">ACTION</div>
          <div className="cell">TOKEN</div>
          <div className="cell text-right">PRICE</div>
          <div className="cell text-right">%CHANGE</div>
        </div>

        {tokenPriceList.map((token, index) => (
          <div
            className="row"
            key={token.priceId}
            ref={
              index === tokenPriceList.length - 1 && pageNum <= TOTAL_PAGES
                ? setLastElement
                : (null as any)
            }
          >
            <div className="cell" data-title="Action">
              <button onClick={() => handleLikedToken(token.name)}>
                {likedSet.has(token.name) ? "Liked" : "Like"}
              </button>
            </div>
            <div className="cell" data-title="Token">
              {token.name}
            </div>
            <div className="cell text-right" data-title="Price">
              {token.currentPrice}
            </div>
            <div className="cell text-right" data-title="Change">
              <DataList
                value={token.priceChanges}
                textColor={token.changeColor}
              />
            </div>
          </div>
        ))}
      </div>
    </TokenTableWrapper>
  );
};

export default React.memo(TokenTable);

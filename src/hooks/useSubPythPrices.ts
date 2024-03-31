import { BigNumber } from "@ethersproject/bignumber";
import { EvmPriceServiceConnection, PriceFeed } from "@pythnetwork/pyth-evm-js";
import { tokens } from "../constants";
import { useEffect, useMemo, useState } from "react";

// Helper function to parse price feed to iPyth price
const parsePriceToIPythPrice = (priceFeed: PriceFeed): BigNumber => {
  const _price = priceFeed.getPriceUnchecked();
  const price = BigNumber.from(_price.price);
  const expoToE30 = BigNumber.from(10).pow(30 + _price.expo);
  return price.mul(expoToE30);
};

// Custom hook to subscribe to Pyth price feeds
export const useSubPythPrices = (): [
  Record<string, BigNumber>,
  Record<string, BigNumber>
] => {
  const [priceState, setPriceState] = useState<{
    priceFeed: Record<string, BigNumber>;
    previousPriceFeed: Record<string, BigNumber>;
  }>({
    priceFeed: {},
    previousPriceFeed: {},
  });

  const mapToken = useMemo(() => tokens.map((t) => t.priceId), []);

  useEffect(() => {
    const connection = new EvmPriceServiceConnection(
      "https://hermes.pyth.network"
    );

    const handlePriceUpdate = (feed: PriceFeed) => {
      const tokenName = tokens.find(
        (t) => t.priceId.toLowerCase() === "0x".concat(feed.id)
      )!.name;
      const _price = parsePriceToIPythPrice(feed);

      setPriceState((prevState) => {
        const previousValue =
          prevState.previousPriceFeed[tokenName] ?? BigNumber.from(0);
        if (previousValue.eq(_price)) {
          return prevState; // If previous and current values are equal, do not update state
        }
        return {
          previousPriceFeed: {
            ...prevState.previousPriceFeed,
            [tokenName]: previousValue.gt(BigNumber.from(0))
              ? previousValue
              : _price,
          },
          priceFeed: {
            ...prevState.priceFeed,
            [tokenName]: _price,
          },
        };
      });
    };

    connection.subscribePriceFeedUpdates(mapToken, handlePriceUpdate);

    return () => {
      connection.closeWebSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [priceState.priceFeed, priceState.previousPriceFeed];
};

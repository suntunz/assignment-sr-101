import { useState } from "react";
import "./App.css";
import { useSubPythPrices } from "./hooks/useSubPythPrices";
import { tokens } from "./constants";
import TokenPriceListTemplate from "components/templates/TokenPriceListTemplate";

function App() {
  const [likedList, setLikedList] = useState<string[]>([]);
  const [tokenPrices, previousTokenPrices] = useSubPythPrices();

  return (
    <div className="App">
      <TokenPriceListTemplate
        headerTextProps={{
          text: `Token prices from ${tokens.length} tokens`,
          size: "4rem",
          tag: "header",
        }}
        likedTokenReportProps={{
          likedTokens: likedList,
          tokenPrices,
        }}
        likedListProps={{ tokens: likedList }}
        tokenTableProps={{
          tokenPrices,
          previousPrices: previousTokenPrices,
          tokens,
          onChange: setLikedList,
        }}
      />
    </div>
  );
}

export default App;

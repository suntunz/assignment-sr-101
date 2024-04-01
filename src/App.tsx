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
      <div className="container">
        <TokenPriceListTemplate
          headerTextProps={{
            text: `Token prices from ${tokens.length} tokens`,
            size: "2.75rem",
            tag: "h1",
            color: "#414342",
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
    </div>
  );
}

export default App;

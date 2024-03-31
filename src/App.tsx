// import { useState } from "react";
import "./App.css";
// import { useSubPythPrices } from "./hooks/useSubPythPrices";
// import { TokenTable } from "components/TokenTable";
// import { LikedList } from "components/LikedList";
// import { LikedTokenReport } from "components/LikedTokenReport";
import { tokens } from "./constants";
import TokenPriceListTemplate from "components/templates/TokenPriceListTemplate";

function App() {
  // const [likedList, setLikedList] = useState<string[]>([]);
  // const [tokenPrices, previousTokenPrices] = useSubPythPrices();

  return (
    <TokenPriceListTemplate
      headerText={{
        text: `Token prices from ${tokens.length} tokens`,
        size: "4rem",
        tag: "header",
      }}
    />
  );
}

export default App;

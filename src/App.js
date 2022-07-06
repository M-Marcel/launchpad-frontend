import Home from "./Home";

import "./index.css";
import "./App.css";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

function App() {
  const connectorId = window.localStorage.getItem("connectorId");
  const chainId = process.env.REACT_APP_NET_ID;
  const { isWeb3Enabled, isAuthenticated, isWeb3EnableLoading, isInitialized, enableWeb3 } = useMoralis();
  useEffect(() => {
    async function bootWeb3() {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
        await enableWeb3({ provider: connectorId, chainId: chainId });
      }
    }
    bootWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isAuthenticated]);
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

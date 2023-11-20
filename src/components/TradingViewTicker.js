import React, { useEffect } from "react";

const TradingViewTicker = () => {
  useEffect(() => {
    const scriptId = "tradingview-ticker-widget-script";

    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { description: "Link", proName: "BINANCE:LINKUSDT" },
        { description: "Total Market Cap", proName: "CRYPTOCAP:TOTAL" },
        { description: "Solana", proName: "BINANCE:SOLUSD" },
        { description: "Aave", proName: "BINANCE:AAVEUSDT" },
      ],
      colorTheme: "dark",
      isTransparent: true,
      showSymbolLogo: true,
      locale: "en",
    });

    const containerId = "tradingview-ticker-widget";
    const widgetContainer = document.getElementById(containerId);
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      id="tradingview-ticker-widget"
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewTicker;

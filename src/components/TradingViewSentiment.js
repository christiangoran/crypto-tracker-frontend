import React, { useEffect } from "react";

const TradingViewSentiment = () => {
  useEffect(() => {
    const scriptId = "tradingview-technical-analysis-widget-script";

    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      interval: "1m",
      width: 450,
      isTransparent: true,
      height: 500,
      symbol: "BITSTAMP:BTCUSD",
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: "dark",
    });

    const containerId = "tradingview-technical-analysis-widget";
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
      id="tradingview-technical-analysis-widget"
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewSentiment;

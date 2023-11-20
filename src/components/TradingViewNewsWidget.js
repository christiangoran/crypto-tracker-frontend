import React, { useEffect } from "react";
import styles from "../styles/TradingViewWidget.module.css";

const TradingViewNewsWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "all_symbols",
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "regular",
      width: "450",
      height: "500",
      locale: "en",
    });

    document.getElementById("tradingview-widget").appendChild(script);

    return () => {
      const widgetEl = document.getElementById("tradingview-widget");
      if (widgetEl) widgetEl.removeChild(script);
    };
  }, []);

  return (
    <div id="tradingview-widget">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewNewsWidget;

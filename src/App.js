import React from "react";
import { SpectrumMonitor, SpectrumStatus } from "./screens";

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <div style={{ flex: 1 }}>
        <SpectrumStatus />
      </div>
      <div style={{ flex: 1 }}>
        <SpectrumMonitor />
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import Counter from "./graphical-representations/counter";
import { BarGraphs, LineGraphs } from "./graphical-representations/graphs";

function Dashboard() {
  return (
    <div className="Main-Container">
      <div className="container top-section">
        <Counter />
      </div>

      <div className="container graph-section">
        <div className="row">
          <div className="col-sm">
            <BarGraphs />
          </div>
          <div className="col-sm">
            <LineGraphs />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

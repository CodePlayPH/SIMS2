import React, { useState } from "react";
import Counter from "./graphical-representations/counter";

function Dashboard() {
  

  return (
    <div className="Main-Container">
      <div className="container top-section">
        <Counter />
      </div>

      <div className="container graph-section">
        <div className="col">2 of 3</div>
        <div className="col">3 of 3</div>
      </div>
    </div>
  );
}

export default Dashboard;

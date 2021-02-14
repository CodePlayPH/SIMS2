import React, { useContext, useEffect, useState } from "react";

import { CircularProgress, LinearProgress } from "@material-ui/core";
import Counter from "./graphical-representations/counter";
// import { BarGraphs, LineGraphs } from "./graphical-representations/graphs";
import { DashboardContext } from "../../contexts/DashboardContext";


function Dashboard() {
  const { dataLoading, fetchTopEntries, dashboardData } = useContext(DashboardContext);


  if (dataLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
         <CircularProgress/>
      </div>
    )


  return (
    <div className="Main-Container">
      <div className="container top-section">
        <Counter />
      </div>

      <div>
        
      </div>
    </div>
  );
}

export default Dashboard;

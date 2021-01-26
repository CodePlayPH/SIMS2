import React, { createContext, useState } from "react";
import { FetchTopEntries } from "../api/dashboard";

export const DashboardContext = createContext();

  const DashboardContextProvider = (props) => {
    const [dashboardData, setDashboardData] = useState([])
    const [dataLoading, setDataLoading] = useState(true)

    const fetchTopEntries = async () => {
        setDataLoading(true)
        let data = await FetchTopEntries();
        setDataLoading(false)
        if (data != null) {
            setDashboardData(data)
        }
    }

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        dataLoading,
        fetchTopEntries,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}

export default DashboardContextProvider;

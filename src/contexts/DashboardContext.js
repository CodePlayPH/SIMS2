import React, { createContext, useState } from "react";
import { FetchTopEntries } from "../api/dashboard";

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [dashboardData, setDashboardData] = useState([])
  const [dataLoading, setDataLoading] = useState(true)

  // const fetchTopEntries = async (interval) => {
  //   setDataLoading(true)
  //   let data = await FetchTopEntries(interval);
  //   setDataLoading(false)
  //   if (data != null) {
  //     setDashboardData(data)
  //   }else{
  //     setDashboardData([])
  //   }
  //   console.log("Gikan kay DashboardContext ", data)
  // }

  const fetchTopEntries = async () => {
    setDataLoading(true)
    let data = await FetchTopEntries();
    setDataLoading(false)
    if (data != null) {
      setDashboardData(data)
    }else{
      setDashboardData([])
    }
    console.log("Gikan kay DashboardContext ", data)
  }

  return (
    <DashboardContext.Provider
      value={{
        dataLoading,
        dashboardData,
        fetchTopEntries,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}

export default DashboardContextProvider;

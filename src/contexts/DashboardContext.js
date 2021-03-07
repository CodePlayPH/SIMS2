import React, { createContext, useState } from "react";
import { FetchSales, FetchTopEntries } from "../api/dashboard";

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [dashboardData, setDashboardData] = useState([])
  const [dataLoading, setDataLoading] = useState(true)

  const [salesLoading, setSalesLoading] = useState([])
  const [salesLabel, setSalesLabel] = useState([])
  const [salesData, setSalesData] = useState([])

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

  const fetchTopEntries = async (interval) => {
    setDataLoading(true)
    let data = await FetchTopEntries(interval);
    setDataLoading(false)
    if (data != null) {
      setDashboardData(data)
    } else {
      setDashboardData([])
    }
    console.log("Gikan kay DashboardContext ", data)
  }

  const fetchSales = async () => {
    setSalesLoading(true)
    let data = await FetchSales();
    if (data != null) {
      var label = []
      var dat = []
      data.map((val, i) => {
        label.push(val.date);
        dat.push(parseInt(val.total_sales))
      })
      console.log('label', label);
      console.log('data', dat)
      setSalesLabel(label);
      setSalesData(dat);
    }
    setSalesLoading(false)

  }

  return (
    <DashboardContext.Provider
      value={{
        dataLoading,
        dashboardData,
        fetchTopEntries,

        salesLoading,
        salesData,
        salesLabel,
        fetchSales,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}

export default DashboardContextProvider;

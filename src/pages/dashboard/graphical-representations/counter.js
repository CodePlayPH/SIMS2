import React, { useState, useEffect, useContext } from "react";

import CountUp from "react-countup";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { DashboardContext } from "../../../contexts/DashboardContext";
import "../Dashboard.scss";

function Counter(props) {
  const [interval, setInterval] = useState("");
  const { dashboardData } = useContext(DashboardContext);
  const categoryCount = {};
  const sizeLookup = {};

  // async function handleInterval(event) {
  //   // interval
  //   event.preventDefault();
  //   // setLoginStat(false);
  //   // setLoading(true);
  //   var stat = await fetchTopEntries(interval);
  //   // setLoginStat(!stat);
  //   // setLoading(false);

  //   if(stat) {
  //     window.location.reload(false);
  //   }
  // }

  const [cardsValues, setCardValues] = useState([]);
    

  return (
    <>
      <div className="row">
        {dashboardData.map((data) => (
          <div className="col">
            <div className="card text-center">
              <div className="card-header">{data.Category_name}</div>
              <div className="card-body">
                <div className="card-logo">{data.card_logo}</div>
                <h5 className="card-title">
                  <CountUp start={0} end={data.Total_quantity} delay={0}>
                    {console.log("Data in counter ",data.name)}
                    {({ countUpRef }) => (
                      
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </h5>
                <p className="card-text">{data.card_text}</p>
              </div>
              <div className="card-footer text-muted">{data.card_footer}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Counter;

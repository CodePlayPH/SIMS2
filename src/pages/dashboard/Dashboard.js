import React, { useState } from "react";
import CountUp from "react-countup";

import LocalDiningIcon from "@material-ui/icons/LocalDining";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import AcUnitIcon from "@material-ui/icons/AcUnit";

import "./Dashboard.scss";

function Dashboard() {
  const [cardsValues, setCardValues] = useState([
    {
      header_title: "Featured",
      card_title: 28,
      card_text:
        "With supporting text below as a natural lead-in to additional content.",
      card_footer: "Updated about a minute ago",
      card_logo: <LocalDiningIcon />,
    },
    {
      header_title: "Featured",
      card_title: 32,
      card_text:
        "With supporting text below as a natural lead-in to additional content.",
      card_footer: "Updated about a minute ago",
      card_logo: <DirectionsWalkIcon />,
    },
    {
      header_title: "Featured",
      card_title: 12,
      card_text:
        "With supporting text below as a natural lead-in to additional content.",
      card_footer: "Updated about a minute ago",
      card_logo: <AcUnitIcon />,
    },
  ]);

  const [barData, setBarData] = [
    { prod: "1950", sales: 2.525 },
    { prod: "1960", sales: 3.018 },
    { prod: "1970", sales: 3.682 },
    { prod: "1980", sales: 4.44 },
    { prod: "1990", sales: 5.31 },
    { prod: "2000", sales: 6.127 },
    { prod: "2010", sales: 6.93 },
  ];

  return (
    <div className="Main-Container">
      <div className="container top-section">
        <div className="row">
          {cardsValues.map((cards) => (
            <div className="col">
              <div className="card text-center">
                <div className="card-header">{cards.header_title}</div>
                <div className="card-body">
                  <div className="card-logo">{cards.card_logo}</div>
                  <h5 className="card-title">
                    <CountUp start={0} end={cards.card_title} delay={0}>
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </h5>
                  <p className="card-text">{cards.card_text}</p>
                </div>
                <div className="card-footer text-muted">
                  {cards.card_footer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container graph-section">
        <div className="col">2 of 3</div>
        <div className="col">3 of 3</div>
      </div>
    </div>
  );
}

export default Dashboard;

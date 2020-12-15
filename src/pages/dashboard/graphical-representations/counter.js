import React, { useState } from "react";

import CountUp from "react-countup";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import AcUnitIcon from "@material-ui/icons/AcUnit";

import "../Dashboard.scss";

function Counter() {
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

  return (
    <>
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
              <div className="card-footer text-muted">{cards.card_footer}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Counter;

import React from "react";
import "./cards.scss";

export default function Cards({ title, details }) {
  return (
    <div className="cardStyle">
      <div className="cardStyle-info">
        <p className="text-title">{title}</p>
        <p className="text-body">{details}</p>
      </div>
      {/* <div className="card-footer">
        <span className="text-title">$499.49</span>
      </div> */}
    </div>
  );
}

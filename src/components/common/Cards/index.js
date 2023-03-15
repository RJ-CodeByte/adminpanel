import React from "react";
import "./cards.scss";

export default function Cards({ title, details }) {
  return (
    <div className="card">
      <div className="card-info">
        <p className="text-title">{title}</p>
        <p className="text-body">{details}</p>
      </div>
      {/* <div className="card-footer">
        <span className="text-title">$499.49</span>
      </div> */}
    </div>
  );
}

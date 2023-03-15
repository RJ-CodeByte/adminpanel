import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../components/common/loader/CustomLoader";
import Cards from "../../components/common/Cards";
import { dashboardAction } from "../../Redux/DashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.dashboardData);

  useEffect(() => {
    dispatch(dashboardAction());
  }, []);

  // console.log(data);
  return (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFF",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Dashboard</h2>
        <br />
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            width: "80%",
            justifyContent: "space-evenly",
          }}
        >
          {[data].map((obj) => (
            <>
              <Cards title={obj.activeUsers} details="Total Active users" />
              <Cards title={obj.allUsers} details="Total All-time Users" />
              <Cards
                title={obj.activeSessions}
                details="Total Active Sessions"
              />
              <Cards title={obj.allPatients} details="Total Patient" />
              <Cards title={obj.activePatients} details="Active Patient" />
            </>
          ))}
        </div>

        <h4>
          <Link to="/article-management">Article Management</Link>
        </h4>
        <h4>
          <Link to="/add-shipment">Add Shipment</Link>
        </h4>
      </div>
    </>
  );
};

export default Dashboard;

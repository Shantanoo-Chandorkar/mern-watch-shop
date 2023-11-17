import React from "react";
import { NavLink } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <div className="d-flex justify-content-between">
            <h4>Dashboard</h4>
            <NavLink to="/dashboard/user" style={{ borderBottom: "none" }}>
              <IoArrowBack
                style={{
                  textDecoration: "none",
                  color: "#232323",
                  fontSize: "1.5rem",
                  borderBottom: "none",
                }}
              />
            </NavLink>
          </div>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;

import React from "react";
import { NavLink } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <div className="d-flex justify-content-between">
            <h4>Admin Panel</h4>
            <NavLink to="/dashboard/admin" style={{ borderBottom: "none" }}>
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
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-brand"
            className="list-group-item list-group-item-action"
          >
            Create Brand
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;

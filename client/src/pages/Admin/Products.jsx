import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/all-products");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-3">
            <h1 className="text-center">All Products List</h1>
            {/* Display products */}
            <div
              className="card-group mb-3"
              style={{
                gap: "1rem",
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
                flexWrap: "wrap",
              }}
            >
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  key={p._id}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "14rem",
                    height: "350px",
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                >
                  <div className="card" key={p._id} style={{ border: "none" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "10rem", objectFit: "fill" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  // params
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const navigate = useNavigate();

  // initial details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Prduct Details - WatchMania"}>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product?.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product?.name}</h6>
          <h6>Description: {product?.description}</h6>
          <h6>Price: {product?.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <h6>Brand: {product?.brand?.name}</h6>
          <button className="btn btn-outline-secondary ms-2">
            Add to cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row container mt-2">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && <p>No Similar Products Found.</p>}
        <div className="d-flex flex-wrap">
          {/* Display products */}
          <div
            className="mb-3"
            style={{
              gap: "0.5rem",
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              flexWrap: "wrap",
            }}
          >
            {relatedProducts?.map((p) => (
              <div
                className="card"
                key={p._id}
                style={{
                  width: "18rem",
                }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p?._id}`}
                  className="card-img-top"
                  alt={p?.name}
                  style={{ height: "10rem", objectFit: "fill" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p?.name}</h5>
                  <p className="card-text">
                    {p?.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p?.price}</p>
                  <button
                    className="btn btn-outline-info ms-2"
                    onClick={() => navigate(`/product/${p?.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-outline-secondary ms-2">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [checkedCat, setCheckedCat] = useState([]);
  const [checkedBrand, setCheckedBrand] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all brands
  const getAllBrands = async () => {
    try {
      const { data } = await axios.get("/api/v1/brand/all-brands");
      if (data?.success) {
        setBrands(data?.brand);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by category
  const handleCatFilter = (value, id) => {
    let allCat = [...checkedCat];
    if (value) {
      allCat.push(id);
    } else {
      allCat = allCat.filter((c) => c !== id);
    }
    setCheckedCat(allCat);
  };

  // filter by brand
  const handleBrandFilter = (value, id) => {
    let allBrand = [...checkedBrand];
    if (value) {
      allBrand.push(id);
    } else {
      allBrand = allBrand.filter((b) => b !== id);
    }
    setCheckedBrand(allBrand);
  };

  // lifecycle
  useEffect(() => {
    if (!checkedCat.length || !checkedBrand.length || !radio) {
      getAllProducts();
    }
  }, [checkedBrand.length, checkedCat.length, radio]);

  useEffect(() => {
    if (checkedCat.length || checkedBrand.length || radio.length)
      filterProduct();
  }, [checkedCat, checkedBrand, radio]);

  // get filterred products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checkedCat,
        checkedBrand,
        radio,
      });

      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products | Best Offers - WatchMania"}>
      <div className="row m-3">
        <div className="col-md-2">
          {/* Category Filter */}
          <div className="col mb-3">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => {
                    handleCatFilter(e.target.checked, c._id);
                  }}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="col mb-3">
            <h4 className="text-center">Filter By Brand</h4>
            <div className="d-flex flex-column">
              {brands?.map((b) => (
                <Checkbox
                  key={b._id}
                  onChange={(e) => {
                    handleBrandFilter(e.target.checked, b._id);
                  }}
                >
                  {b.name}
                </Checkbox>
              ))}
            </div>
          </div>
          {/* Price Filter */}
          <div className="col mb-3">
            <h4 className="text-center">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="col mb-3">
            <button
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
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
              {products?.map((p) => (
                <div
                  className="card"
                  key={p._id}
                  style={{
                    width: "18rem",
                  }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "10rem", objectFit: "fill" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> $ {p.price}</p>
                    <button
                      className="btn btn-outline-info ms-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-outline-secondary ms-2"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item added to the cart");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

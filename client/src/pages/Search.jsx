import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [search, setSearch] = useSearch();
  return (
    <Layout title={"Search Input - WatchMania"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {search?.results.length < 1
              ? "No Product Found"
              : `Found ${search?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
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
              {search?.results.map((p) => (
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
                    <button className="btn btn-outline-info ms-2">
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
      </div>
    </Layout>
  );
};

export default Search;

import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="h-75 d-flex align-items-center flex-column justify-content-center">
        <h1
          style={{ fontWeight: "700", fontSize: "10rem", marginBottom: "5px" }}
        >
          404
        </h1>
        <h3 style={{ color: "#121212ad", marginBottom: "2rem" }}>
          Oops! Page Not Found
        </h3>
        <Link to="/">
          <button className="btn btn-outline-secondary">Go Back</button>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;

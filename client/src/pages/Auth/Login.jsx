import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title={"Sign up - WatchMania"}>
      <div className="form-container">
        <div className="register">
          <form onSubmit={handleSubmit}>
            <h1 className="title">Login</h1>
            <div className="auth-components mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="auth-components mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>

            <div className="mb-3">
              {/* <button
                type="button"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot password?
              </button> */}
              <Link
                to="/forgot-password"
                style={{
                  textDecoration: "none",
                  color: "#515151ff",
                }}
              >
                <p style={{ textDecorationLine: "underline" }}>
                  Forgot Password?
                </p>
              </Link>
            </div>

            <button type="submit">Login</button>
          </form>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <p style={{ color: "#232323" }}>Don&apos;t have an account? </p>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span
                style={{
                  color: "#bc3433",
                  fontWeight: "500",
                }}
              >
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout title={"Forgot Password - WatchMania"}>
      <div className="form-container">
        <div className="register">
          <form onSubmit={handleSubmit}>
            <h1 className="title">Reset Password</h1>
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
              <label htmlFor="exampleInputAddress" className="form-label">
                Security Question:
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                placeholder="In what city does your nearest sibling live?"
                required
              />
            </div>
            <div className="auth-components mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password:
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>

            <button type="submit">Reset</button>
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

export default ForgotPassword;

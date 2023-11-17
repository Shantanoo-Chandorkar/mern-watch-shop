import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
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
    <Layout title={"Sign up - WatchMania"}>
      <div className="form-container">
        <div className="register">
          <form onSubmit={handleSubmit}>
            <h1 className="title">Register</h1>
            <div className="auth-components mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                placeholder="Enter Name"
                required
              />
            </div>
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
                placeholder="Enter Email"
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
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="auth-components mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
                placeholder="Enter Phone"
                required
              />
            </div>
            <div className="auth-components mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address:
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                placeholder="Enter Address"
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
            <button type="submit">Register</button>
          </form>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <p style={{ color: "#232323" }}>Already have an account? </p>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span
                style={{
                  color: "#bc3433",
                  fontWeight: "500",
                }}
              >
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

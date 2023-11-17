import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    console.log(auth.user);
    const { email, name, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (!data?.success) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register w-75">
              <form onSubmit={handleSubmit}>
                <h1 className="title">User Profile</h1>
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
                  />
                </div>
                <div className="auth-components mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Email"
                    disabled
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
                  />
                </div>

                <button type="submit" className="btn btn-outline-secondary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;

import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUser } from "../redux/reducers/UserThunks";
import { useDispatch, useSelector } from "react-redux";

const Redirect = () => {
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      Cookies.set("token", token, { expires: 7, secure: true, sameSite: "Strict" });

      dispatch(getUser(token));
    } else {
      console.log("Token nahi mila 🤡");
      navigate("/login");
    }
  }, []); 

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`); // Change to the appropriate route
    }
  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <p>Redirecting...</p>;
};

export default Redirect;

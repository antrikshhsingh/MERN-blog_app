import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { lightBlue } from "@mui/material/colors";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const color = lightBlue[100];
  const [isSignup, setisSignup] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:3000/api/user/${type}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadius={5}
        maxWidth={400}
      >
        <Typography
          padding={3}
          textAlign="center"
          variant="h4"
          fontWeight={600}
        >
          {isSignup ? "Register" : "Login"}
        </Typography>

        {isSignup && (
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            type={"text"}
            variant="outlined"
            label="Name"
            margin="normal"
          />
        )}
        <TextField
          name="email"
          value={formData.email}
          onChange={handleChange}
          type={"email"}
          variant="outlined"
          label="Email"
          margin="normal"
        />
        <TextField
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={"password"}
          variant="outlined"
          label="Password"
          margin="normal"
        />
        <Button
          type="submit"
          sx={{ borderRadius: 3, marginTop: 2 }}
          color="warning"
          variant="contained"
        >
          Sumbit
        </Button>
        <Button
          onClick={() => setisSignup(!isSignup)}
          sx={{ borderRadius: 3, marginTop: 2, color: color }}
          variant="contained"
          textcolor="white"
        >
          Change to {isSignup ? "Login" : "Signup"}
        </Button>
      </Box>
    </form>
  );
};

export default Auth;

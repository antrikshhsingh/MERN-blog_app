import React, { useState, useEffect } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const labelStyle = { mb: 1, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setformData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:3000/api/blog/add", {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data)).then(()=>navigate('/myblogs'));
    // console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection="column"
          width={"80%"}
          border={3}
          borderColor="#ccc"
          borderRadius={8}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={4}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            fontStyle={"italic"}
            fontWeight={"bold"}
            marginBottom={2}
          >
            Post your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            label="Add title"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            label="Add Description"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            name="image"
            value={formData.image}
            onChange={handleChange}
            margin="normal"
            label="Add ImageURL"
            variant="outlined"
          />
          <Button
            sx={{
              borderRadius: 3,
              marginTop: 2,
              width: "20%",
              margin: "auto",
            }}
            color="success"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;

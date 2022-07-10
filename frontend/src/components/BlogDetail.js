import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
const labelStyle = { mb: 1, fontSize: "24px", fontWeight: "bold" };
const BlogDetail = () => {
  const [blog, setblog] = useState([]);
  const [formData, setformData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  const id = useParams().id;
  console.log(id);

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setblog(data.blog);
      setformData({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:3000/api/blog/update/${id}`, {
        title: formData.title,
        description: formData.description,
        // image: formData.image,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myblogs/"));
  };

  return (
    <div>
      {formData && (
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
              placeholder="Add title"
              variant="outlined"
            />
            <InputLabel sx={labelStyle}>Description</InputLabel>
            <TextField
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              placeholder="Add Description"
              variant="outlined"
            />
            {/* <InputLabel sx={labelStyle}>ImageURL</InputLabel>
            <TextField
              name="image"
              value={formData.image}
              onChange={handleChange}
              margin="normal"
              placeholder="Add ImageURL"
              variant="outlined"
            /> */}
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
      )}
    </div>
  );
};

export default BlogDetail;

import express from "express";
import mongoose from "mongoose";
import blogrouter from "./routes/blog-routes";
import router from "./routes/user-routes";

const app = express();
app.use(express.json());
app.use("/api/user", router);

app.use("/api/blog", blogrouter);

mongoose
  .connect(
    "mongodb+srv://admin:4uRqv5CvT38ANqyb@cluster0.wr0lmtz.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(3000))
  .then(() => console.log("connected to db"))
  .catch((err) => {
    console.log(err);
  });

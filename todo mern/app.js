import "./db.js";
import express from "express";
import router from "./routes/todoRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
  })
);

app.use("/todos", router);

app.listen(4000, () => {
  console.log("running todo App");
});

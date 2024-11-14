const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/auth.js");
const hauntRouter = require("./routes/haunt.js");
const cors = require("cors");
dotenv.config();
const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/api/user", userRoutes);
app.use("/api/haunts", hauntRouter);

app.listen(8000, () => console.log("Server running on port 8000"));

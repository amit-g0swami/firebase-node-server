const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const connectToDB = require("./config/database");
require("dotenv").config();

const productRoutes = require("./routes/product");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined"));

app.use("/api", productRoutes);
app.use("/api", adminRoutes);
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;
connectToDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));

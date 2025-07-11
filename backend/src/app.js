const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const productRouter = require("./routes/product-router");
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/user", userRouter)

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Couldn't connect to the Database !!");
  });

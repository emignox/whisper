const express = require("express"); // Import express
const userRoutes = require("./routes/userRoutes"); // Import userRoutes
require("dotenv").config(); // Import dotenv
const app = express(); // Initialize the app with express
const connect = require("./db"); // Import the connect function from db.js
const postRoutes = require("./routes/postRoutes");
const cookiePaerser = require("cookie-parser");
const { checkUser } = require("./middleware/auth.middleware");
const { requireAuth } = require("./middleware/auth.middleware");

app.use(express.json()); // Use express.json middleware
//routes
app.use("/api/user", userRoutes); // Use userRoutes
app.use(cookiePaerser());

app.use("/api/post", postRoutes);

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
//server.js
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

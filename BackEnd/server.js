const express = require("express");
const cors = require("cors");
require("./db");

const app = express();
const PORT = 3010;

// Import routes
const authRoute = require("./routes/auth");
const weatherRoute = require("./routes/weather");

app.use(cors());
app.use(express.json());

// Route setup
app.use("/api/auth", authRoute);
app.use("/api/weather", weatherRoute);

// Start server
app.listen(PORT, (err) => {
  if (err) console.log(`Server failed to start on port ${PORT}.`);
  else console.log(`Server started on port ${PORT}`);
});

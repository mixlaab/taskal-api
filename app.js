const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const tasks = require("./routes/api/tasks");

dotenv.config();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working...");
});

app.use("/api/tasks", tasks);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

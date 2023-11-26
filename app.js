const express = require("express");
const app = express();
const port = 3000;

const adminrouter = require("./routes/adminroutes");
app.use(express.json());
app.use("/", adminrouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

import express from "express";
import "./infra/providers/kafka/consumers";

const PORT = process.env.PORT ?? 3002;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server order running on port ${PORT}`);
});

import express from "express";
import { router } from "./infra/routes";

const PORT = process.env.PORT ?? 3003;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server product running on port ${PORT}`);
});

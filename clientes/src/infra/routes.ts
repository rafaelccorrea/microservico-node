import { Router } from "express";

import { CreateCustomerController } from "../modules/create-client/create-client.controller";

const router = Router();

router.post("/customers", (request, response) => {
  new CreateCustomerController().headle(request, response);
});

export { router };

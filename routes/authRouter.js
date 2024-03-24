import authControllers from "../controllers/authControllers.js";

import express from "express";

import validateBody from "../helpers/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

import {
  userSignupSchema,
  userSignInSchema,
  userUpdateSubscriptionSchema,
} from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authControllers.register
);

authRouter.post(
  "/login",
  validateBody(userSignInSchema),
  authControllers.login
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(userUpdateSubscriptionSchema),
  authControllers.updateSubscription
);

export default authRouter;

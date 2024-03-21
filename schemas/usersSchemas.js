import Joi from "joi";
import { emailRegexp, subscriptionList } from "../constants/users-constans.js";

export const userSignupSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

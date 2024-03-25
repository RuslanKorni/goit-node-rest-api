import jwt from "jsonwebtoken";
import "dotenv/config";

import {
  registerServis,
  findUser,
  validatePassword,
  updateUser,
} from "../services/auth.Services.js";

import HttpError from "../helpers/HttpError.js";

import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await registerServis(req.body);

  res.status(201).json({
    user: {
      email: "example@example.com",
      subscription: "starter",
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await validatePassword(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  const result = await updateUser({ _id: id }, { token });

  res.json({
    token,
    user: { email: result.email, subscription: result.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await updateUser({ _id }, { token: null });

  res.status(204).send();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const { email, subscription } = await updateUser({ _id }, req.body);

  res.json({ user: { email, subscription } });
}

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};

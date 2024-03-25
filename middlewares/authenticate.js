import jwt from "jsonwebtoken";
import "dotenv/config";

import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/auth.Services.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }
  try {
    const { id: _id } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ _id });
    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }
    if (!user.token || user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;

import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import { IsValidId } from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", IsValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", IsValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  IsValidId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  IsValidId,
  validateBody(updateStatusContactSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;

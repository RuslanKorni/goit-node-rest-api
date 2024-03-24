import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact as updateContactsCarr,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

const filter = {
  owner,
  ...(favorite !== undefined ? { favorite } : {}),
};

  const result = await listContacts(filter, { skip, limit });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await addContact({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactsCarr(id, req.body);

  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactsCarr(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

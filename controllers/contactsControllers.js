import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact as updateContactsCarr,
} from "../services/contactsServices.js";

import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (_, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
      next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
      if (!result) {
          throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
   next(error)
  }
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};

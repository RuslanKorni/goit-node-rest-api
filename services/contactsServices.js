import { ContactDb } from "../models/Contact.js";

export const listContacts = (filter = {}, query = {}) =>
  ContactDb.find(filter, null, query).populate("owner", "email");

export const getContactById = (id) => ContactDb.findById(id);

export const addContact = (data) => ContactDb.create(data);

export const removeContact = (id) => ContactDb.findByIdAndDelete(id);

export const updateContact = (id, data) =>
  ContactDb.findByIdAndUpdate(id, data);

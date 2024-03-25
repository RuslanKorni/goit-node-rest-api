import { ContactDb } from "../models/Contact.js";

export const listContacts = (filter = {}, query = {}) =>
  ContactDb.find(filter, null, query).populate("owner", "email");

export const getContactById = (id) => ContactDb.findById(id); //?

export const getOneContactByOwner = (filter) =>
  ContactDb.findOne(filter).populate("owner", "email");

export const addContact = (data) => ContactDb.create(data);

export const removeContact = (id) => ContactDb.findByIdAndDelete(id); //?

export const removeOneContactByOwner = (filter) => ContactDb.findOneAndDelete(filter);

export const updateContact = (id, data) =>
  ContactDb.findByIdAndUpdate(id, data); //?

  export const updateOneContactByOwner = (filter, data) => ContactDb.findOneAndUpdate(filter, data);

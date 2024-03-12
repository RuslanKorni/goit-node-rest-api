import { ContactDb } from "../models/Contact.js";

export const listContacts = () => ContactDb.find({});

export const getContactById = (id) => ContactDb.findById(id);

export const addContact = (data) => ContactDb.create(data);

export const removeContact = (id) => ContactDb.findByIdAndDelete(id);

export const updateContact = (id, data) => ContactDb.findByIdAndUpdate(id, data, {new: true});
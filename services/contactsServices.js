import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const relPath = ["db", "contacts.json"];
const contactsPath = path.resolve(...relPath);

export const listContacts = async () => {
  // Повертає масив контактів
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
};

export const removeContact = async (id) => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

export const addContact = async (data) => {
  // Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const updateContact = async (id, newData) => {
  // Оновлює контакт за ідентифікатором та повертає оновлений контакт.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null; // Повертаємо null, якщо контакт з таким id не знайдений.
  }

  const updatedContact = { ...contacts[index], ...newData }; // Об'єднуємо існуючий контакт з новими даними для оновлення.
  contacts[index] = updatedContact; // Оновлюємо контакт в масиві.

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // Записуємо оновлений масив контактів у файл.

  return updatedContact; // Повертаємо оновлений контакт.
};



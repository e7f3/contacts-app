const ApiError = require("../Error/ApiError");
const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");
const { jwt_decode } = require("jwt-decode");

async function setDB(data, callback) {
  await fs.writeFile(
    path.resolve(__dirname, "../DB/users.json"),
    JSON.stringify(data),
    callback
  );
}

class ContactsController {
  async getAllContacts(req, res, next) {
    const { userId } = req.body;
    if (!userId) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    const userDB = JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, "../DB/users.json"), "utf-8")
        .toString()
    );
    if (!userDB.contacts.hasOwnProperty(userId)) {
      return next(ApiError.notFound("Контакты не найдены!"));
    }
    const contacts = userDB.contacts[userId];
    return res.json({ contacts });
  }
  async addContact(req, res, next) {
    const { userId, contactData } = req.body;
    if (!userId) {
      return next(ApiError.badRequest("Пользователь не найден!"));
    }
    if (!contactData) {
      return next(ApiError.badRequest("Пустой контакт!"));
    }
    const userDB = JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, "../DB/users.json"), "utf-8")
        .toString()
    );
    if (!userDB.contacts.hasOwnProperty(userId)) {
      return next(ApiError.notFound("Контакты пользователя не найдены!"));
    }
    const contacts = userDB.contacts[userId];
    const contact = { id: nanoid(), ...contactData }
    contacts.push(contact);
    setDB(userDB, (err) => {
      if (err) {
        return res.status(404).json({ message: err.message });
      }
    });
    return res.json({ contact });
  }
  async removeContact(req, res, next) {
    const { userId, contactId } = req.body;
    if (!userId) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    if (!contactId) {
      return next(ApiError.badRequest("Контакт не найден!"));
    }
    const userDB = JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, "../DB/users.json"), "utf-8")
        .toString()
    );
    if (!userDB.contacts.hasOwnProperty(userId)) {
      return next(ApiError.notFound("Контакты пользователя не найдены!"));
    }
    const filtered = userDB.contacts[userId].filter(
      (contact) => contact.id !== contactId
    );
    userDB.contacts[userId] = filtered;
    setDB(userDB, (err) => {
      if (err) {
        return res.status(404).json({ message: err.message });
      }
    });
    return res.json({ filtered });
  }
  async changeContact(req, res, next) {
    const { userId, contactId, contactData } = req.body;
    if (!userId) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    if (!contactId) {
      return next(ApiError.badRequest("Контакт не найден!"));
    }
    const userDB = JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, "../DB/users.json"), "utf-8")
        .toString()
    );
    if (!userDB.contacts.hasOwnProperty(userId)) {
      return next(ApiError.notFound("Контакты пользователя не найдены!"));
    }
    const contacts = userDB.contacts[userId];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return next(ApiError.notFound("Контакт не найден!"));
    } else {
      contacts[index] = { id: contactId, ...contactData };
      setDB(userDB, (err) => {
        if (err) {
          return res.status(404).json({ message: err.message });
        }
      });
    }
    return res.json({ contacts });
  }
}

module.exports = new ContactsController();

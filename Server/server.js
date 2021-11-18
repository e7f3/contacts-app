require("dotenv").config();
const jsonServer = require("json-server");
const ContactsController = require("./Controller/ContactsController");
const UserController = require("./Controller/UserController");
const authMiddleware = require("./Middleware/authMiddleware");
const errorMiddleware = require("./Middleware/errorMiddleware");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/api/user/login", UserController.login);
server.post("/api/user/registration", UserController.registration);
server.get("/api/user/auth", authMiddleware, UserController.check);

server.post("/api/contacts", ContactsController.getAllContacts);
server.post("/api/contacts/add", ContactsController.addContact);
server.post("/api/contacts/remove", ContactsController.removeContact);
server.post("/api/contacts/change", ContactsController.changeContact);

server.use(errorMiddleware);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const ApiError = require("../Error/ApiError");

function createJwt(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_TERM,
  });
}
function getIndex(db, email) {
  return db.users.findIndex((user) => user.email === email);
}

async function setDB(data, callback) {
  await fs.writeFile(
    path.resolve(__dirname, "../DB/users.json"),
    JSON.stringify(data),
    callback
  );
}

class UserController {
  async registration(req, res, next) {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return next(ApiError.unauthorized("Некорректный email или пароль!"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = { id: nanoid(), email: email };
    const userDB = JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, "../DB/users.json"), "utf-8")
        .toString()
    );

    if (getIndex(userDB, email) !== -1) {
      return next(
        ApiError.unauthorized("Пользователь с таким email уже существует!")
      );
    }
    userDB.users.push({ ...user, password: hashPassword, name: name });
    userDB.contacts[user.id] = [];
    setDB(userDB, (err) => {
      if (err) {
        return res.status(404).json({ message: err.message });
      }
    });

    const token = createJwt(user);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const userDB = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../DB/users.json"), "utf-8")
    );
    const index = getIndex(userDB, email);

    if (index === -1) {
      return next(ApiError.unauthorized("Пользователь не существует!"));
    }

    const user = userDB.users[index];
    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.unauthorized("Указан неверный пароль!"));
    }

    const token = createJwt({ id: user.id, email: user.email });
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = createJwt({ id: req.user.id, email: req.user.email });
    return res.json({ token });
  }
}

module.exports = new UserController();

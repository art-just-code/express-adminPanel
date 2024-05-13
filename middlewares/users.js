const users = require("../models/user");
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
    console.log("GET /api/users");
    req.usersArray = await users.find({}, { password: 0 });
    next();
};

const createUser = async (req, res, next) => {
    console.log("POST /users");
    try {
        //console.log(req.body);
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send("Error creating user");
    }
};

const deleteUser = async (req, res, next) => {
    console.log("DELETE /users/:id");
    try {
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).send({ message: "Error deleting user" });
    }
};

const findUserById = async (req, res, next) => {
    console.log("GET api/users/:id");
    try {
        req.user = await users.findById(req.params.id, { password: 0 });
        next();
    } catch (error) {
        res.status(404).send({ message: "User not found" });
    }
};

const updateUser = async (req, res, next) => {
    try {
        console.log("PUT /users/:id");
        // В метод передаём id из параметров запроса и объект с новыми свойствами
        req.user = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка обновления user" });
    }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
        // а ответим кодом 400 — данные неверны.
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
    } else {
        // Если всё в порядке, то передадим управление следующим миддлварам
        next();
    }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.username || !req.body.email) {
        // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
        // а ответим кодом 400 — данные неверны.
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
    } else {
        // Если всё в порядке, то передадим управление следующим миддлварам
        next();
    }
};

const hashPassword = async (req, res, next) => {
    try {
        // Создаём случайную строку длиной в десять символов
        const salt = await bcrypt.genSalt(10);
        // Хешируем пароль

        const hash = await bcrypt.hash(req.body.password, salt);
        // Полученный в запросе пароль подменяем на хеш
        req.body.password = hash;

        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка хеширования пароля" });
    }
};

// Экспортируем функцию поиска всех пользователей
module.exports = {
    findAllUsers,
    createUser,
    findUserById,
    updateUser,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    hashPassword,
    deleteUser,
};

const usersRouter = require("express").Router();

const { checkAuth } = require("../middlewares/auth.js");

// Импортируем вспомогательные функции
const {
    findAllUsers,
    createUser,
    findUserById,
    updateUser,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    hashPassword,
    deleteUser,
} = require("../middlewares/users");
const {
    sendAllUsers,
    sendUserCreated,
    sendUserById,
    sendUserUpdated,
    sendUserDeleted,
    sendMe,
} = require("../controllers/users");

// Обрабатываем GET-запрос с роутом '/categories'
usersRouter.get("/users", findAllUsers, sendAllUsers);

usersRouter.get("/me", checkAuth, sendMe);

usersRouter.get("/users/:id", findUserById, sendUserById);

usersRouter.put("/users/:id", checkEmptyNameAndEmail, checkAuth, updateUser, sendUserUpdated);

usersRouter.post(
    "/users",
    findAllUsers,
    checkEmptyNameAndEmailAndPassword,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated
);

usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;

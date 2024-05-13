// Файл middlewares/categories.js

// Импортируем модель
const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
    // По GET-запросу на эндпоинт /categories найдём все документы категорий
    req.categoriesArray = await categories.find({});
    //console.log(req.categoriesArray);
    next();
};

const createCategory = async (req, res, next) => {
    console.log("POST /categories");
    try {
        //console.log(req.body);
        req.category = await categories.create(req.body);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send("Error creating category");
    }
};

const findCategoryById = async (req, res, next) => {
    console.log("GET /categories/:id");
    try {
        req.category = await categories.findById(req.params.id);
        next();
    } catch (error) {
        res.status(404).send({ message: "Category not found" });
    }
};

const updateCategory = async (req, res, next) => {
    try {
        console.log("PUT /categories/:id");
        // В метод передаём id из параметров запроса и объект с новыми свойствами
        req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка обновления categories" });
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
        req.category = await categories.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).send({ message: "Error deleting category" });
    }
};

const checkIsCategoryExists = async (req, res, next) => {
    // Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
    // с которым хотим создать новую категорию
    const isInArray = req.categoriesArray.find((category) => {
        return req.body.name === category.name;
    });
    // Если нашли совпадение, то отвечаем кодом 400 и сообщением
    if (isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
    } else {
        // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
        next();
    }
};

const checkEmptyName = async (req, res, next) => {
    if (!req.body.name) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни название категории" }));
    } else {
        next();
    }
};

// Экспортируем функцию поиска всех категорий
module.exports = {
    findAllCategories,
    createCategory,
    findCategoryById,
    updateCategory,
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName,
};

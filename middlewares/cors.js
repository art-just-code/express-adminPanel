const allowedCors = [
    "https://practicum.yandex.ru",
    "https://students-projects.ru",
    "https://localhost:3000",
    "https://localhost:3001",
];

function cors(req, res, next) {
    const { origin } = req.headers;

    if (allowedCors.includes(origin)) {
        // Если это наш друг
        res.header("Access-Control-Allow-Origin:", origin);
    }

    next();
}
module.exports = cors;

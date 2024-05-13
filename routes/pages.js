const pagesRouter = require("express").Router();

const { checkAuth, checkCookiesJWT } = require("../middlewares/auth");
const { sendIndex, sendDashboard } = require("../controllers/auth.js");

pagesRouter.get("/", sendIndex);
pagesRouter.get("/admin/**", checkCookiesJWT, checkAuth, sendDashboard);

module.exports = pagesRouter;

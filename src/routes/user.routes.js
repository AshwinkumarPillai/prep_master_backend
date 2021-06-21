const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/login", userController.Login);
router.post("/register", userController.Register);

module.exports = router;

const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/login", userController.Login);
router.post("/register", userController.Register);
router.post("/fetchUserHistroy", userController.fetchUserHistory);
router.post("/saveUserTestHistory", userController.saveUserTestHistory);
router.post("/fetchUserTestHistroy", userController.fetchUserTestHistory);
router.post("/fetchAllUserTestHistory", userController.fetchAllUserTestHistory);

module.exports = router;

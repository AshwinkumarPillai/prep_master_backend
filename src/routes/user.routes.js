const router = require("express").Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/login", userController.Login);
router.post("/register", userController.Register);
router.get("/fetchUserHistroy", auth.checkUser, userController.fetchUserHistory);
router.post("/saveUserTestHistory", userController.saveUserTestHistory);
router.post("/fetchUserTestHistroy", userController.fetchUserTestHistory);
router.get("/fetchAllUserTestHistory", auth.checkUser, userController.fetchAllUserTestHistory);

module.exports = router;

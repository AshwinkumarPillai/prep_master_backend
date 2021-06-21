const router = require("express").Router();
const adminController = require("../controllers/admin");
// const auth = require("../middleware/auth");

router.post("/login", adminController.Login);
router.post("/auth", adminController.checkAdmin);

module.exports = router;

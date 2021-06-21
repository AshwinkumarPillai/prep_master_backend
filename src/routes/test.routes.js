const router = require("express").Router();
const testController = require("../controllers/test");
const auth = require("../middleware/auth");

router.get("/fetchAllTests", testController.getAllTest);
router.post("/fetchTest", testController.getTestDetails);
router.post("/add", auth.checkAdmin, testController.addTest);
router.post("/update", auth.checkAdmin, testController.updateTest);
router.post("/delete", auth.checkAdmin, testController.deleteTest);
module.exports = router;

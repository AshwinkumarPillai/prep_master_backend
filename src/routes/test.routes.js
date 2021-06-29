const router = require("express").Router();
const testController = require("../controllers/test");
const auth = require("../middleware/auth");

router.get("/fetchAllTests", testController.getAllTest);
router.get("/fetchAllAdminTests", auth.checkUser.checkAdmin, testController.getAllAdminTests);
router.get("/fetchTest", testController.getTestDetails);
router.get("/fetchFullTest", testController.getFullTestDetails);
router.post("/add", auth.checkAdmin, testController.addTest);
router.post("/update", auth.checkAdmin, testController.updateTest);
router.post("/delete", auth.checkAdmin, testController.deleteTest);
router.post("/restore", auth.checkAdmin, testController.restoreTest);
router.get("/getArchivedTests", auth.checkAdmin, testController.getArchivedTests);
router.get("/fetchArchivedTest", auth.checkAdmin, testController.getArchivedTestDetails);

module.exports = router;

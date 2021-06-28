const router = require("express").Router();
const questionController = require("../controllers/question");
const auth = require("../middleware/auth");
const { imageUpload } = require("../middleware/multer");

router.post("/add", [auth.checkAdmin, imageUpload.single("image")], questionController.addQuestion);
router.post("/update", [auth.checkAdmin, imageUpload.single("image")], questionController.updateQuestion);
router.post("/delete", auth.checkAdmin, questionController.deleteQuestion);
router.get("/search", auth.checkAdmin, questionController.searchQuestion);

module.exports = router;

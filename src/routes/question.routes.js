const router = require("express").Router();
const questionController = require("../controllers/question");
const auth = require("../middleware/auth");

router.post("/add", auth.checkAdmin, questionController.addQuestion);
router.post("/update", auth.checkAdmin, questionController.updateQuestion);
router.post("/delete", auth.checkAdmin, questionController.deleteQuestion);
router.get("/search", auth.checkAdmin, questionController.searchQuestion);

module.exports = router;

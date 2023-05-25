const express = require("express");
const router = express.Router();
const PostController = require("../app/controllers/PostController");
const verifyToken = require("../middleware/auth");
//@route POST /api/posts
//@desc Create / Edit / Delete
//@access Private
router.get("/", verifyToken, PostController.store);
router.post("/", verifyToken, PostController.create);
router.put("/:id", verifyToken, PostController.update);
router.delete("/:id", verifyToken, PostController.delete);

module.exports = router;

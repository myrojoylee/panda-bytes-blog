const router = require("express").Router();
const bloggerRoutes = require("./bloggerRoutes");
const postRoutes = require("./postRoutes");

// const commentRoutes = require("./commentRoutes");

router.use("/bloggers", bloggerRoutes);
router.use("/posts", postRoutes);
// router.use("/comments", commentRoutes);

module.exports = router;

const router = require("express").Router();
const sequelize = require("../config/connection");
const Post = require("../models/Post");

// GET all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

    const plainPostData = postData.map((dbData) => dbData.get({ plain: true }));
    res.render("all", { posts: plainPostData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: "Sorry, no post found with this id!" });
      return;
    }
    const post = postData.get({ plain: true });
    res.render("post", post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

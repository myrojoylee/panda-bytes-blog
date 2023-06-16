const router = require("express").Router();

const posts = [
  {
    id: 1,
    post_title: "Awesome first post",
    post_author: "Mickey Mouse",
    post_description: "Test description",
  },
  {
    id: 2,
    post_title: "Amazing second post",
    post_author: "Minnie Mouse",
    post_description: "Test description again",
  },
  {
    id: 3,
    post_title: "Great third post",
    post_author: "Mickey Mouse",
    post_description: "Test description",
  },
  {
    id: 4,
    post_title: "Awful fourth post",
    post_author: "Minnie Mouse",
    post_description: "Test description again",
  },
];

// GET all posts
router.get("/", async (req, res) => {
  res.render("all", { posts });
});

// GET one post

router.get("/post/:num", async (req, res) => {
  return res.render("post", posts[req.params.num - 1]);
});

module.exports = router;

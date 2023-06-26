const router = require("express").Router();
const { Post, Blogger, Comment } = require("../models");
const withAuth = require("../utils/auth");

// rendering homepage with recent posts from all users
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: Blogger,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// rendering dashboard if logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in blogger based on the session ID
    const bloggerData = await Blogger.findByPk(req.session.blogger_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
        },
      ],
    });

    const blogger = bloggerData.get({ plain: true });

    console.log(blogger);
    res.render("dashboard", {
      ...blogger,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// rendering form for new post
router.get("/new-post", withAuth, async (req, res) => {
  try {
    // Find the logged in blogger based on the session ID
    const bloggerData = await Blogger.findByPk(req.session.blogger_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const blogger = bloggerData.get({ plain: true });

    res.render("new-post", {
      ...blogger,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// rendering individual post route with comments
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["detail", "blogger_id", "post_id"],
        },
        {
          model: Blogger,
          attributes: ["username", "id"],
        },
      ],
    });

    const post = postData.get({ plain: true });
    // const comment = commentData.get({ plain: true });

    console.log(post);
    // console.log(comment);
    if (post.blogger_id === req.session.blogger_id) {
      res.render("post", {
        ...post,
        blogger_id: req.session.blogger_id,
        blogger_name: req.session.blogger_name,
        commenter: req.session.commenter,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render("comment", {
        ...post,
        blogger_id: req.session.blogger_id,
        blogger_name: req.session.blogger_name,
        commenter: req.session.commenter,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// rendering login route
router.get("/login", (req, res) => {
  // If the blogger is already logged in, redirect the request to another route
  try {
    if (req.session.logged_in) {
      res.redirect("./dashboard");
      return;
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// rendering signup route
router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

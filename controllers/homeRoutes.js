const router = require("express").Router();
const { Post, Blogger, Comment } = require("../models");
const withAuth = require("../utils/auth");

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

// go to dashboard if logged in
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

router.get("/dashboard/post/:id", withAuth, async (req, res) => {
  try {
    // Find the logged in blogger based on the session ID
    const bloggerData = await Blogger.findByPk(req.session.blogger_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const blogger = bloggerData.get({ plain: true });

    // Get all posts and JOIN with user data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Blogger,
          attributes: ["username"],
        },
      ],
    });
    const post = postData.get({ plain: true });

    res.render("dashboard-post", {
      ...blogger,
      ...post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// form for new post
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

// get all
// router.get("/post", withAuth, async (req, res) => {
//   try {
//     // Find the logged in blogger based on the session ID
//     const bloggerData = await Blogger.findByPk(req.session.blogger_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Post }],
//     });

//     const blogger = bloggerData.get({ plain: true });

//     res.render("post", {
//       ...blogger,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// getting one post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Blogger,
          attributes: ["username", "id"],
        },
        {
          model: Comment,
          attributes: ["detail", "blogger_id", "post_id"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    console.log(post);
    console.log(post.blogger_id);
    console.log(req.session.blogger_id);
    if (post.blogger_id === req.session.blogger_id) {
      res.render("post", {
        ...post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render("comment", {
        ...post,
        logged_in: req.session.logged_in,
      });
    }
    // res.render("post", {
    //   ...post,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

//one comment
// router.get("post/:id/comment", withAuth, async (req, res) => {
//   try {
//     const postCommentData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: Comment,
//           attributes: ["username"],
//         },
//       ],
//     });

//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: Blogger,
//           attributes: ["username"],
//           where: {
//             id: req.params.id,
//           },
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });
//     const postComment = postCommentData.get({ plain: true });
//     console.log(post);
//     console.log(postComment);
//     res.render("comment", {
//       post,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/post/:id/comment", withAuth, async (req, res) => {
//   try {
//     res.render("comment");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// updating a post
// router.get("/post/:id/update", withAuth, async (req, res) => {
//   try {
//     res.render("update-post");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

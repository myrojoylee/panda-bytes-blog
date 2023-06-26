const router = require("express").Router();
const { Blogger } = require("../../models");

// creating a new blogger account
router.post("/", async (req, res) => {
  try {
    const bloggerData = await Blogger.create(req.body);

    // saves session info
    req.session.save(() => {
      req.session.blogger_id = bloggerData.id;
      req.session.blogger_name = bloggerData.username;
      req.session.commenter = bloggerData.username;
      req.session.logged_in = true;
      req.session.is_author = true;
      res.status(200).json(bloggerData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// finding blogger by login info
router.post("/login", async (req, res) => {
  try {
    const bloggerData = await Blogger.findOne(
      {
        where: { email: req.body.email },
      },
      {
        include: [{ attributes: ["username"] }],
      }
    );

    if (!bloggerData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again." });
      return;
    }

    const validPassword = await bloggerData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.blogger_id = bloggerData.id;
      req.session.blogger_name = bloggerData.username;
      req.session.commenter = bloggerData.username;
      req.session.logged_in = true;
      res.json({ blogger: bloggerData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// processing logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

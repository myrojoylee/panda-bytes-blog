const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Post } = require("../../models");

// finding a new post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Blogger,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creating a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      blogger_id: req.session.blogger_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// updating a post by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPostData = await Post.update(
      {
        title: req.body.title,
        detail: req.body.detail,
      },
      {
        where: {
          id: req.params.id,
          blogger_id: req.session.blogger_id,
        },
      }
    );

    if (!updatedPostData) {
      res.status(400).json({ message: "No post found with that id!" });
      return;
    }

    res.status(200).json(updatedPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        blogger_id: req.session.blogger_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

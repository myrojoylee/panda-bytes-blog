const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  res.send("can we comment on this post ?");
  //   try {
  //     const newComment = await Comment.create({
  //       ...req.body,
  //       blogger_id: req.session.blogger_id,
  //     });

  //     res.status(200).json(newComment);
  //   } catch (err) {
  //     res.status(400).json(err);
  //   }
});

module.exports = router;

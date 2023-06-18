const Blogger = require("./Blogger");
const Post = require("./Post");
const Comment = require("./Comment");

Blogger.hasMany(Post, {
  foreignKey: "blogger_id",
  onDelete: "CASCADE",
});

Post.belongsTo(Blogger, {
  foreignKey: "blogger_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(Blogger, {
  foreignKey: "blogger_id",
});

module.exports = { Blogger, Post, Comment };

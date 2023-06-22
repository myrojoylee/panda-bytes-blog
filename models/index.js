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

Blogger.hasMany(Comment, {
  foreignKey: "blogger_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blogger, {
  foreignKey: "blogger_id",
});

Post.hasMany(Comment, {
  as: "comments",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreign_key: "post_id",
});

module.exports = { Blogger, Post, Comment };

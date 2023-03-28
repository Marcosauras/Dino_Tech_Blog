const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

// A user can make many posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A user can make many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A post belongs to a user
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

// A comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

// A post can have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
});

// A comment belongs to a post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
});

// Include both User and Post when querying for comments
Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = { User, Post, Comment };

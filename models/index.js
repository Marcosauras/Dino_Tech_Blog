const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
// Users can have many Posts, and Comments.
User.hasMany(Post, {
  foreignKey: "user_id",
});
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// Every Post belongs a one User
Post.belongsTo(User, {
  foreignKey: "user_id",
});
// Every Post can have many Comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
});
// Every Comment belongs to a Post that it is commenting on
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});
// Every Comment belongs to a User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment };

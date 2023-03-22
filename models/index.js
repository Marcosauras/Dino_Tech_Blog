const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");


// Every post belongs to a user
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

// Every comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

// Every post can have many comments
Post.hasMany(Comment, {
  foreignKey : "post_id",
  onDelete: "CASCADE"
});



module.exports = { User, Post, Comment };

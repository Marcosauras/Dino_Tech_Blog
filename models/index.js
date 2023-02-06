const User = require("./user");
const Post = require("./posts");

User.hasMany(Post, {});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post };

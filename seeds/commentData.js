const { Comment } = require("../models");

const commentData = [
    {
      "comment": "Nice to meet you Sam, I am Tommy",
      "user_id": 2,
      "post_id": 1
    },
    {
      "comment": "I don't like Tailwind, but I'm glad you found something that works for you",
      "user_id": 1,
      "post_id": 2
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
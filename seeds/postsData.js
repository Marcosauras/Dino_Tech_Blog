const { Post } = require("../models");

const postingData = [
    {
      "title": "Introduction",
      "description": "Hi, there my name is Sam, I can't wait to meet you all!",
      "user_id": 1
    },
    {
      "title": "Web Page Styling",
      "description": "You know Tailwind is actually pretty fun to use",
      "user_id": 2
    }
]

const seedPost = () => Post.bulkCreate(postingData);

module.exports = seedPost;
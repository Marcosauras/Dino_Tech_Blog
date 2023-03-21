const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedPost = require("./postsData");
const seedComment = require("./commentData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  seedUser();
  seedPost();
  seedComment();

  process.exit(0);
};

seedDatabase();

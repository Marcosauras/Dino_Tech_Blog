const { User } = require("../models");

const userData = [
  {
    "name": "Sam",
    "password": "password1234?"
  },
  {
    "name": "Tommy",
    "password": "password1234?"
  }
]

// Bulk create was messing up the password seeding
const seedUser = async () => {
  for(let i=0; i < userData.length; i++)
  {
    await User.create(userData[i]);
  }
}

module.exports = seedUser;
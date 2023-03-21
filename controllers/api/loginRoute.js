const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
      console.log("hi")
      // Find user by their username
      const checkForUser = await User.findOne({ where: {name:  req.body.userName}});

      if (!checkForUser) {
        res.status(400).json({ message: "Login credentials are incorrect, please try again or go away" });
        return;
      }
      console.log("user found")
      // Validation
      const validPassword = await checkForUser.checkPw(req.body.password);
      
      if (!validPassword) {
        res.status(401).json({ message: "Your password is incorrect, please try again" });
        return;
      }
      console.log("valid password")
      req.session.save(() => {
        req.session.user_id = checkForUser.id;
        req.session.logged_in = true;
        
        res.json({ user: checkForUser, message: `successfully logged in`})
      });

    } catch (error) {
      res.status(500).json({error: error, message: `There is an error and it needs to be fixed, you should probably do something about that.`});
      console.log(error)
    }
  });


module.exports = router;
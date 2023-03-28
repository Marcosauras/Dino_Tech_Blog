const router = require("express").Router();
const { User } = require("../../models");


router.post('/', async (req, res) => {
try {
      const newUser = await User.create({
          name: req.body.userName,
          password: req.body.password
      });

      req.session.save(() => {
          req.session.user_id = newUser.id;
          req.session.logged_in = true;
          res.status(200).json(newUser);
      });
       
      } catch (error) {
              res.status(500).json(error)
          }
});
router.post("/login", async (req, res) => {
  try {
    // looking for user by name and checking if user exist.
    const userSigningIn = await User.findOne({
      where: { name: req.body.name },
    });

    if (!userSigningIn) {
      res
        .status(400)
        .json({
          message:
            "Login credentials are incorrect, please try again or go away",
        });
      return;
    }
    // makes sure password matches
    const validPassword = await userSigningIn.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(401)
        .json({
          message:
            "Login credentials are incorrect, please try again or go away",
        });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userSigningIn.id;
      req.session.logged_in = true;

      res.json({ userSigningIn, message: "successfully logged in" });
    });
  } catch (error) {
    res.status(500).json({error: error, message: "Something went wrong, I know it is all my fault and I hope you will wait for me to fix it."});
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Removes all session data on logout
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;

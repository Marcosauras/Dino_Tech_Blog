const router = require("express").Router();
const { User } = require("../../models")

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
      // Destroys everything that has to do with the users login information
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
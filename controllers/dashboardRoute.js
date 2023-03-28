const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const userLoggedIn = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{
        model: Comment,
        include: [{
          model: User
        }]
      }, {
        model: User
      }]
    });

    // Convert the retrieved Post objects to plain JavaScript objects
    const plainUserPosts = userLoggedIn.map((post) =>
      post.get({ plain: true })
    );

    res.render("dashboard", {
      plainUserPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // logs error
    console.error(err);
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const editPost = post.get({ plain: true });
    res.render("editPost", {
      editPost,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;

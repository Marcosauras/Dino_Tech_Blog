const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all post
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const post = postsData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

// users dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  } else {
    // Find the user based on the session ID
    const userData = await Post.findAll({
      where: {user_id: req.session.user_id},
      include: [{
          model: Comment,
          include: {
              module: User,
              attributes: ["name"]
          } 
      }]
    });
  }
  try {


const userPosts = user.map((post) => post.get({plain: true}));
res.render("dashboard", {
  userPosts,
  logged_in: req.session.logged_in,
});
} catch(err) {
  console.log(err);
  res.status(400).json(err);
  }
});

router.get("dashboard/:id", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  } else {
  try{
      const onePost = Post.findByPk(req.params.id,
          {include: [{
              model: Comment,
              include: {
                  model: User,
                  attributes: ["name"]
              }
          }
      ]});
      const editPost = (await onePost).get({ plain: true});
          res.render("editOrDeletePost", {
              editPost,
          });
  } catch (err) {
      console.error(err);
      res.status(400).json(err);
  }
}})

module.exports = router;

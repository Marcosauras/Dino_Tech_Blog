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

router.get('/post/:id', async (req, res) => {
  try {      
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'] // exclude the password attribute
            },
          },
          {
            model: Comment,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
      });
      const post = postData.get({ plain: true });
        res.render('post', {
          post,
          logged_in: req.session.logged_in, 
        })
      } catch (err) {
          console.error(err);
          res.status(400).json({error : err, message : "Something went wrong."});
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

// signup page
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

router.get('/newPost', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const userData = await User.findByPk(req.session.user_id);
      const plainUserData = userData.get({ plain: true });
      
      res.render('newPost', {
        plainUserData,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err, message: "Something went wrong." });
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/post/edit/:id', async (req, res) => {
  try {      
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
      });
      const postEdit = postData.get({ plain: true });
        res.render('editPost', {
          postEdit,
          user_id: req.session.user_id,
          logged_in: req.session.logged_in, 
        })
      } catch (err) {
          console.error(err);
          res.status(400).json({error : err, message : "Something went wrong."});
      } 
});

module.exports = router;

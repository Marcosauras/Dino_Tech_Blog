const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// grabs all posts
router.get("/", async (req, res) => {
    try{
        const post = await Post.findAll({
            include: [{
                model: Comment,
                include: [{
                    model: User,
                    attributes: {exclude:  ["password"] },
                }]
            }]
        })
        const posts = postedData.map((post) => post.get({ plain: true }));
        res.status(200).json({ posts });

        } catch (err) {
         res.status(500).json(err);
        }   
        });

router.post("/", async (req, res) => {
    try{
        const newPost = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        });
        res.status(200).json({post, message : `You have created a New Post!`})
    } catch (err) {
        res.status(500).json(err);
    }
});

// Updates a Post
router.put("/:id", async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {            
            where : {
                id: req.params.id
            }
        }); 
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Deletes a Post
router.delete("/:id", async (req, res) => {
    try { 
        const deletePost = await Post.destroy({ where: {id : req.params.id}});
        res.status(200).json(deletePost)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
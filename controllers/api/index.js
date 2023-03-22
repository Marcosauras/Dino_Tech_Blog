const router = require('express').Router();

const postRoute = require('./postRoute');
const commentRoute = require('./commentRoute')
const userRoutes = require('./userRoutes');


router.use('/post', postRoute);
router.use('/comment', commentRoute);
router.use('/user', userRoutes);


module.exports = router;
const router = require('express').Router();
const postRoute = require('./postRoute');
const commentRoute = require('./commentRoute')
const signupRoute = require('./signupRoute');
const loginRoute = require('./loginRoute');
const logoutRoute = require('./logoutRoute');


router.use('/post', postRoute);
router.use('/comment', commentRoute);
router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);


module.exports = router;
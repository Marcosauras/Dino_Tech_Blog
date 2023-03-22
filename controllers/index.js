const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api")
const dashboardRoute = require('./dashboardRoute.js');

router.use("/api", apiRoutes)
router.use("/", homeRoutes);
router.use('/dashboard', dashboardRoute);

module.exports = router;

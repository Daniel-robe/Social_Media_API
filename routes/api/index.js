const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
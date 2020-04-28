const router = require('express').Router();

const auth = require('./auth');
const guestBook = require('./guestBook');

router.use('/auth', auth);
router.use('/posts', guestBook);

module.exports = router;

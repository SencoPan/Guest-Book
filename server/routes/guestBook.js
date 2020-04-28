const router = require('express').Router();
const guestBook = require('../controllers/post');

const authenticateJWT = require('../methods/jwtMiddleware');

router.get('/count', guestBook.count);
router.get('/page', guestBook.page);
router.get('/page/:pageNumber', guestBook.page);

router.get('/getAll', guestBook.select);

router.use(authenticateJWT);

router.get('/personal', guestBook.page);
router.get('/personal/:pageNumber', guestBook.page);

router.get('/countPersonal', guestBook.count);

router.post('/new', guestBook.create);
router.delete('/delete', guestBook.delete);


module.exports = router;
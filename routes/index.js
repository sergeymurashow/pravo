const Router = require('koa-router');
const router = new Router();

//API ROUTES
// router.get('/api/penalties', require('./api/penalties').get);
router.post('/parser', require('./api/parser').post);

module.exports = router;
const moment = require('moment');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const multer = require('koa-multer')
const path = require('path');
const json = require('koa-json');
const logger = require('koa-logger');
const serve = require('koa-static');
const cors = require('koa2-cors');
// const config = require('config');
// const passport = require('./libs/passport');
const session = require('koa-session');
const redisStore = require('koa-redis');

const {createReadStream} = require('fs');
const {resolve} = require('path');

const app = new Koa();
const port = 3000;
const router = require('./routes/index');

// app.keys = [config.get('secret')];
app.use(logger());
app.use(serve('public'));

app.use(async (ctx, next) => {
    // if (ctx.path === '/test2') ctx.disableBodyParser = true
    await next();
  });
  // app.use(multer());
app.use(bodyParser()); 
app.use(json());

app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}\nstart time: ${moment().format('DD.YY.YYYY HH:mm')}`);
});
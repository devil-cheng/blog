const router = require('koa-router')();
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const userService = require('../controllers/mysqlConfig');

router.prefix('/users');

router.get('/', async function(ctx, next) {
  ctx.body = await userService.findAllUser();
});

router.get('/findUser', async function(ctx, next) {
  const userInfo = await userService.findAllUser();
  ctx.body = userInfo;
});

router.get('/findUser', async function(ctx, next) {
  console.log(ctx);
  const { name } = ctx.request.body;
  const _sql = `select * from user where name="${name}";`;
  const userInfo = await userService.query(_sql);
  ctx.body = userInfo;
});

router.get('/addUserData', async function(ctx, next) {
  console.log(ctx);
  const { name, password, phone } = ctx.request.body;
  const id = uuidv4();
  const pwd = md5(password);
  let _sql = `insert int user set id=?,name=?,password=?,phone=?;`;
  const userInfo = await userService.query(_sql, [id, name, pwd, phone]);
  ctx.body = userInfo;
});

module.exports = router;

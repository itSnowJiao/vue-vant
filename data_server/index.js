const Koa = require('koa');
const app = new Koa();

// 接收前端post请求
const bodyParser = require('koa-body-parser');
app.use(bodyParser());
// 解决跨域问题
const cors = require('koa2-cors');
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));

// 加载路由
const Router = require('koa-router');
let user = require('./controller/user');
let product = require('./controller/product');
let type = require('./controller/type');
let cart = require('./controller/cart');

let router = new Router();
router.use('/user', user.routes());
router.use('/product', product.routes());
router.use('/type', type.routes());
router.use('/cart', cart.routes());
app.use(router.routes());
// 允许特定方法进行请求
app.use(router.allowedMethods());


app.use(async ctx => {
    ctx.body = '运行成功'
})
// 连接init.js
const { connect, initSchemas } = require('./init.js');
// 先连接，再初始化模型，用立即执行函数来执行
(async () => {
    await connect();
    initSchemas();
})();


// 接口
app.listen(3000, () => {
    console.log('koa服务运行正常')
})
const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');

router.post('/addCart', async (ctx) => {
    const Cart = mongoose.model('Cart');
    const cart = new Cart(ctx.request.body);
    await cart.save().then(() => {
        ctx.body = {
            code: 200,
            message: '添加成功'
        }
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code: 500,
            message: '添加失败'
        }
    })
});

// 获取数据
router.get('/getCartDatas', async (ctx) => {
    const Cart = mongoose.model('Cart');
    await Cart.find({ userId: ctx.query.userId }).populate('productId').exec().then(res => {
        ctx.body = res;
    });
})

// 删除某条数据
router.delete('/delCartDatas', async (ctx) => {
    const Cart = mongoose.model('Cart');
    await Cart.deleteOne({ productId: ctx.query.productId }).populate('productId').then(() => {
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 500,
            message: '删除失败'
        }
    })
})

module.exports = router;
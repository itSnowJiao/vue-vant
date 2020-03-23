// 读取data文件夹下的文件
const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');  // 读写操作文件

// 读取数据
router.get('/insertProductInfo', async (ctx) => {
    fs.readFile('./data/product.json', 'utf8', (err, data) => {
        if (err) return err
        data = JSON.parse(data);
        console.log(data);
        let count = 0; //计算读取数据的条数
        // 引入模型
        const Product = mongoose.model('Product');
        data.map((value, index) => {
            console.log(value, index);
            let product = new Product(value);
            // 随机生成type 范围是1~8
            product.type = Math.floor(Math.random() * 8) + 1;
            // 保存数据
            product.save().then(() => {
                count++;
                console.log('成功' + count);
            }).catch(err => {
                console.log('失败啦' + err)
            })
        })
    });
    ctx.body = '导入数据';
})
// 获取商品数据
router.get('/getProductList', async (ctx) => {
    const Product = mongoose.model('Product');
    await Product.find({ type: ctx.query.typeId }).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res => {
        ctx.body = res
    })
})

// 读取商品的详情信息
router.get('/getProductDetail',async(ctx) => {
    const Product = mongoose.model('Product');
    await Product.findOne({_id: ctx.query.id}).exec().then(res => {
        ctx.body = res
    })
})

module.exports = router;
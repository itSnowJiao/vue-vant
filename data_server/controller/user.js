const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

// 注册
router.post('/register', async (ctx) => {
    // 获取model
    const User = mongoose.model('User');
    // 接收post请求，值是经过bodyParser解析的数据
    let newUser = new User(ctx.request.body);
    // 使用save存储对应的数据
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
});
// 登录
router.post('/login', async (ctx) => {
    // 接收前端发送的数据
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    // 获取model
    const User = mongoose.model('User');
    // 查询用户名是否存在  存在再去比对密码
    await User.findOne({ userName: userName }).exec().then(async res => {
        if (res) { // 用户名存在，比对密码
            let newUser = new User(); // 实例化一个新的对象
            await newUser.comparePassword(password, res.password).then(isMatch => {
                if (isMatch) { // 密码匹配成功
                    ctx.body = {
                        code: 200,
                        message: '登录成功',
                        userInfo: res
                    }
                } else { // 密码匹配失败
                    ctx.body = {
                        code: 201,
                        message: '登录失败'
                    }
                }
            })
        } else { // 用户名不存在
            ctx.body = {
                code: 201,
                message: '用户名不存在'
            }
        }
    })
})

module.exports = router;
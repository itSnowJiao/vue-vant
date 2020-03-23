const MOCKURL = '/api/data/'; // 模拟接口
const SERVICEURL = 'http://localhost:3000/'; // 真实接口

const URL = {
    getTJData: MOCKURL + 'tjData', // 推荐商品的接口

    // 注册接口
    registerDatas: SERVICEURL + 'user/register',
    // 登录接口
    loginDatas: SERVICEURL + 'user/login',
    // 分类
    getTypes: SERVICEURL + 'type/getTypes',
    // 分类对应的数据
    getProductList: SERVICEURL + 'product/getProductList',
    // 获取详情数据
    getProductDetail: SERVICEURL + 'product/getProductDetail',
    // 加入购物车
    addCart: SERVICEURL + 'cart/addCart',
    // 获取购物车信息
    getCartDatas: SERVICEURL + 'cart/getCartDatas',
    // 删除某个购物车数据信息
    delCartDatas: SERVICEURL + 'cart/delCartDatas'
}

// 导出
export default URL;
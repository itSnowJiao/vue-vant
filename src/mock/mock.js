import Mock from 'mockjs';
import data from './data.json';

Mock.mock('/api/data',{data:data});

Mock.mock('/api/data/random',{
    'name|2': '名字',
    'age|19-34': 20
});

Mock.mock('/api/data/regexp',{
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\d{5,10}/
})

// 模拟推荐商品的数据信息
let Random = Mock.Random;
let productData = () => {
    // console.log(req);
    let productList = [];
    for(let i = 0; i < 100; i++) {
        let product = {
            name: Random.ctitle(5,10),
            img: Random.dataImage('125x125','商品'+Random.integer(1,100)),
            price: Random.integer(10000,99999),
            owner: Random.cname()
        };
        productList.push(product);
    }
    return productList;
}
Mock.mock('/api/data/tjData',productData);


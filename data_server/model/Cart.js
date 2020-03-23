const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    ID: Schema.Types.ObjectId,
    // productId: Schema.Types.ObjectId,
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product' // 指向联合查询的model
    },
    userId: Schema.Types.ObjectId,
    count: Number,
    createDate: {
        type: Date,
        default: Date.now()
    }
})

// 发布模型
mongoose.model('Cart',cartSchema);
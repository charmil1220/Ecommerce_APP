const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{type: String},
    slug:{type: String,unique:true},
    desc:{type: String},
    img:{type: String},
    category:{type: String},
    size:{type: String},
    color:{type: String},
    price:{type: Number},
    availabelQty:{type: Number},
    products:[
        {
            productId:{type:String},
            quantity:{type:Number,default:1}
        }
    ],
    address:{type:String},
    amount:{type:Number},
    status:{type:String,default:'Pending'}

},{timestamps:true});

mongoose.models={}
export default mongoose.model("Product",ProductSchema)
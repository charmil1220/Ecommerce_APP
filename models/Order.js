const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email:{type: String, required:true},
    orderId:{type: String, required:true},
    paymentinfo:{type: String, default: ""},
    products:[
        {
            productId:{type:String},
            quantity:{type:Number,default:1}
        }
    ],
    address:{type:String,required:true},
    amount:{type:Number,required:true},
    status:{type:String,required:true,default:'Pending'}

},{timestamps:true});

mongoose.models={}

export default mongoose.model("Order",OrderSchema)
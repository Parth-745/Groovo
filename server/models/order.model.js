import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },

    orderId : {
        type : String,
        required : [true,"Provide order ID"],
        unique : true
    },

    productID : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },

    products_details : {
        name : String,
        image : Array,
   },

   paymentId : {
        type : String,
        default : ""
   },

   payment_status : {
        type : String,
        default : ""
   },

   delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : "address"
   },

   subTotalAmt : {
    type : Number,
    default : 0
   },

   totalAmt : {
    type : Number,
    default : 0
   },

   invoice_receipt : {
    type : String,
    default : ""
   }
},{
    timestamps : true
})

const OrderModel = mongoose.model("order",orderSchema)

export default OrderModel;
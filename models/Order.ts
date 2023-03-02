import mongoose, { Schema, model, Model } from "mongoose";
import { IOrder } from '../interfaces';


const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    ses: { type: Schema.Types.ObjectId, ref: 'Session', require: true },
    sub: { type: Schema.Types.ObjectId, ref: 'Subscription', require: true }
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Order: Model<IOrder> = mongoose.models.Order || model('Order', OrderSchema);
export default Order;

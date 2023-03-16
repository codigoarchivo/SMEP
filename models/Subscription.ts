import mongoose, { Schema, model, Model } from "mongoose";
import { ISubscription } from '../interfaces';

const subscriptionSchema = new Schema({
    user: { type: String, require: true },
    name: { type: String, require: true },
    reference: { type: String, require: true },
    adicional: { type: String, require: true },
    datetime: { type: String, require: true },
    email: { type: String, require: true },
    images: [{ type: String, require: true }],
    monthT: { type: Number, require: true },
    priceU: { type: Number, require: true },
    repro: { type: Number, require: true },
    title: { type: String, require: true },
    desc: { type: String, require: true },
    select: { type: String, require: true },
    valid: { type: Boolean, require: true, default: false },
    state: { type: Boolean, require: true, default: true }
},
    {
        timestamps: true,
        versionKey: false
    }
)


const Subscription: Model<ISubscription> = mongoose.models.Subscription || model('Subscription', subscriptionSchema);
export default Subscription;
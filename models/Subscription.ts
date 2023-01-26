import mongoose, { Schema, model, Model } from "mongoose";
import { IMembership } from '../interfaces';

const subscriptionSchema = new Schema({
    adicional: { type: String, require: true },
    datetime: { type: String, require: true },
    email: { type: String, require: true },
    images: [{ type: String, require: true }],
    monthT: { type: Number, require: true },
    priceU: { type: Number, require: true },
    repro: { type: Number, require: true },
    title: { type: String, require: true },
    desc: { type: String, require: true }
},
    {
        timestamps: true,
        versionKey: false,
    }
)


const Subscription: Model<IMembership> = mongoose.models.Subscription || model('Subscription', subscriptionSchema);
export default Subscription;
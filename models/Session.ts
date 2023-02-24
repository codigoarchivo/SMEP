import mongoose, { Schema, model, Model } from "mongoose";
import { ISession } from "../interfaces";


const SessionSchema = new Schema({
    user: { type: String, require: true },
    name: { type: String, require: true },
    reference: { type: String, require: true },
    adicional: { type: String, require: true },
    datetime: { type: String, require: true },
    email: { type: String, require: true },
    images: [{ type: String, require: true }],
    priceU: { type: Number, require: true },
    title: { type: String, require: true },
    select: { type: String, require: true },
    valid: { type: Boolean, require: true, default: false },
    state: { type: Boolean, require: true, default: true }
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Session: Model<ISession> = mongoose.models.Session || model('Session', SessionSchema);
export default Session
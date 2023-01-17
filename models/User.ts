import mongoose, { Schema, model, Model } from "mongoose";
import { IUser } from "../interfaces";

/* Creating a schema for the User model. */
const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
        type: String,
        enum: {
            values: ['admin', 'client'],
            message: '{VALUE} not a valid role',
            default: 'client',
            require: true
        },
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
)

const User: Model<IUser> = mongoose.models.User || model('User', UserSchema);
export default User;
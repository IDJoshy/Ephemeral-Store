import cartModel from './cart.model.js';
import {model, Schema} from 'mongoose';

const userSchema = new Schema({

    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    password: {type: String, required: true},
    cartId: {type: Schema.Types.ObjectId, ref: "carts"},
    rol: {type: String, default: "user"}

});

userSchema.post("save", async function (doc) {
    try 
    {
        if (!doc.cartId)
        {
            const newCart = await cartModel.create({products: []});
            await model("users").findByIdAndUpdate(doc._id, {cartId: newCart._id});
        }
    }
    catch (error) 
    {
        console.log(error);
    }
});


const userModel = model("users", userSchema);

export default userModel;
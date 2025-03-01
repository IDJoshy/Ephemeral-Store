import { Schema , model} from "mongoose";
import { paginate } from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, index: true, required: true},
    status: {type: Boolean, required: true, default: true},
    code: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    thumbnail: {default: [{type: String}]}
});

productSchema.plugin(paginate);
const productModel = model("products", productSchema);

export default productModel
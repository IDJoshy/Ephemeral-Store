import { Schema , model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    status: {type: Boolean, required: true, default: true},
    stock: {type: Number, required: true},
    category: {type: String, index: true, required: true},
    thumbnail: { type: [String], default: [] }
});

productSchema.plugin(mongoosePaginate);
const productModel = model("products", productSchema);

export default productModel;
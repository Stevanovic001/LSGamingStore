import mongoose from "mongoose";

//Prihvata objekat kao parametar
const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true, unique: true},
        platform: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
        category: {type: String, required: true},
        countInStock: {type: Number, required: true},
        rating: {type: Number, required: true},
        numReviews: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
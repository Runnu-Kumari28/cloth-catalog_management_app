import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    style_code: { type: String, required: true },
    option_code: { type: String, required: true },
    EAN_code: {type: String, unique: true, required: true },
    MRP: { type: Number, required: true },
    Brick: {
        type: String,
        enum: ['Shirt', 'T-shirt', 'Jeans', 'Trouser'],
        required: true
    }, 
    Sleeve: {
        type: String,
        enum: ['Full Sleeve', 'Half sleeve', 'Sleeveless'],
        required: true
    }
}); 

export default mongoose.model('Product', productSchema);
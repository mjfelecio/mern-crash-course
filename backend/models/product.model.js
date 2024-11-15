import mongoose from "mongoose";

// creates a schema that determines what properties an Object can contain.
// In essence, this is just a Class in java.
// A studentSchema may contain a name, age, program, courses, etc.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    }
}, {
    timestamps: true //createdAt, updatedAt
});

// We create an Object model of that schema and put it in a variable that we can use in our code
const Product = mongoose.model('Product', productSchema);

// We export it so we can use it from other files
export default Product;
import mongoose from "mongoose";

const recipesSchema = mongoose.Schema({
    title: {type: String, required: true},
    likes: {type: Number, default: 0},
    liked: {type: Boolean, default: false},
    dislikes: Number,
    glass: String,
    instruction: String
}, {collection: 'recipes'})

export default recipesSchema
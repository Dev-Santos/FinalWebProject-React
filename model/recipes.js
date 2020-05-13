const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    name: String,
    recipe: String,
    calories: String,
    image_url: String,
    totalWeight: String,
    date: {
        type: String,
        default: Date.now()
    }
});

//Model
const recipe = mongoose.model('recipe', recipeSchema);

module.exports = recipe;
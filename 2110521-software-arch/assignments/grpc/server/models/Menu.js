const mongoose = require("mongoose");

// Define the schema for a menu item
const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Create and export the Menu model from the schema
// Mongoose will create a collection named 'menus' in the database
module.exports = mongoose.model("Menu", MenuSchema);

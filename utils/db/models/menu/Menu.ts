import mongoose from "mongoose";

const menuDetailSchema = new mongoose.Schema({
  name: {type: String, require: true},
  price: {type: Number, require: true},
})

const menuSchema = new mongoose.Schema({
  main: [menuDetailSchema],
  side: [menuDetailSchema],
  alcohol: [menuDetailSchema],
  nonAlcohol: [menuDetailSchema],
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema)

export { Menu, menuDetailSchema };
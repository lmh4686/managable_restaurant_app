import mongoose from "mongoose";
import { menuDetailSchema } from "../menu/Menu";

const Order = mongoose.models.Order || mongoose.model(
  "Order",
  new mongoose.Schema({
    table: { type: mongoose.Types.ObjectId, ref: "Table" },
    details: [menuDetailSchema],
  })
);

export default Order;

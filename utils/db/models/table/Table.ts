import mongoose, { Types } from "mongoose";

export interface TableType {
  _id: Types.ObjectId;
  tableNumber: String;
  capacity: Number;
  __v: Number;
}

const TableSchema = new mongoose.Schema({
  tableNumber: String,
  capacity: Number,
});

const Table = mongoose.models.Table || mongoose.model("Table", TableSchema);

export default Table;

import mongoose, { Types } from "mongoose";
import { TableType } from "../table/Table";

export interface GuestType {
  _id?: Types.ObjectId;
  firstName: String;
  lastName: String;
  mobile: String;
  date: Date;
  guestNumber: Number;
}

export interface ReservationType {
  _id: Types.ObjectId;
  table: TableType;
  guest: GuestType;
  isPrepared: boolean;
  __v: number;
}

const GuestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: Date, required: true },
  guestNumber: { type: Number, required: true },
});

const ReservationSchema = new mongoose.Schema({
  table: { type: mongoose.Types.ObjectId, ref: "Table", required: true },
  guest: GuestSchema,
  isPrepared: { type: Boolean, default: false },
});

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);

export default Reservation;


import { connectDB, disconnectDB } from "../../utils/db";
import Table from "../../utils/db/models/table/Table";
import Order from "../../utils/db/models/order/Order";
import { Menu } from "../../utils/db/models/menu/Menu";
import { NextApiRequest, NextApiResponse } from "next";
import seedTable from "@/utils/db/models/table/seed";
import seedMenu from "@/utils/db/models/menu/seed";
import seedReservation from "@/utils/db/models/reservation/seed";
import Reservation from "@/utils/db/models/reservation/Reservation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  await Table.deleteMany();
  await Order.deleteMany();
  await Menu.deleteMany();
  await Reservation.deleteMany();

  await seedTable();
  await seedMenu();
  await seedReservation();

  await disconnectDB();
  res.status(201).json({ message: "Models seeded" });
}

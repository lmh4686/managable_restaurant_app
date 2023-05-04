import { connectDB } from "@/utils/db";
import Reservation from "@/utils/db/models/reservation/Reservation";
import postHandler from "@/utils/db/models/reservation/middleware/post";
import Table from "@/utils/db/models/table/Table";
import { Document } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  switch (req.method) {
    case "POST":
      postHandler(req, res);
  }
}

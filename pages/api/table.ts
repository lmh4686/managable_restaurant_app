import { connectDB, disconnectDB } from "@/utils/db";
import Table from "@/utils/db/models/table/Table";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET")
    return res.status(200).json({ msg: "This is GET only route" });

  await connectDB();
  const table = await Table.find();
  res.status(200).json({ data: table });
  await disconnectDB();
}

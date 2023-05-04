import { connectDB, disconnectDB } from "@/utils/db";
import { Menu } from "@/utils/db/models/menu/Menu";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET")
    return res.status(200).json({ msg: "This is GET only route" });

  await connectDB();
  const menu = await Menu.find();
  res.status(200).json({ data: menu });
  await disconnectDB();
}

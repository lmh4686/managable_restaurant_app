import Table from "../table/Table";
import Reservation from "./Reservation";

export default async function seedReservation() {
  const tables = await Table.find();
  const twoSeaterTables = tables.filter((t) => t.capacity === 2);
  const fourSeaterTables = tables.filter((t) => t.capacity === 4);
  const sixSeaterTables = tables.filter((t) => t.capacity === 6);
  await Reservation.insertMany([
    {
      table: sixSeaterTables[0],
      guest: {
        firstName: "Jihyuk",
        lastName: "Lee",
        mobile: "0405555555",
        date: "2023-05-01T13:00:00Z",
        guestNumber: 6,
      },
    },
    {
      table: fourSeaterTables[0],
      guest: {
        firstName: "Chu",
        lastName: "Wu",
        mobile: "0401111111",
        date: "2023-05-01T13:00:00Z",
        guestNumber: 4,
      },
    },
    {
      table: twoSeaterTables[0],
      guest: {
        firstName: "Simba",
        lastName: "Lee",
        mobile: "0402222222",
        date: "2023-05-01T19:00:00Z",
        guestNumber: 2,
      },
    },
    {
      table: twoSeaterTables[1],
      guest: {
        firstName: "Rexy",
        lastName: "Lee",
        mobile: "0402225222",
        date: "2023-05-01T19:00:00Z",
        guestNumber: 2,
      },
    },
  ]);

  console.log("Reservation seeded");
}

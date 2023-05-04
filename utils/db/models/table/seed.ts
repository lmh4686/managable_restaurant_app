import Table from "./Table";

export default async function seedTable() {
  const tables: { tableNumber: number; capacity: number }[] = [];

  function addTables(seats: number, amount: number) {
    for (let i = 0; i < amount; i++) {
      tables.push({
        tableNumber: tables.length,
        capacity: seats,
      });
    }
  }

  addTables(2, 6);
  addTables(4, 8);
  addTables(6, 6);

  await Table.insertMany(tables);
  console.log("Table Seeded");
}

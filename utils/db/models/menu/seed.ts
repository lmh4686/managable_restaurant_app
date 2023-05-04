import { Menu } from "./Menu";

type menuCategory = "main" | "side" | "alcohol" | "nonAlcohol";
const menus: {
  [key in "main" | "side" | "alcohol" | "nonAlcohol"]?: {
    name: string;
    price: number;
  }[];
} = {};

function addMenus(category: menuCategory, menu: (string | number)[]) {
  menus[category] = [];
  for (let i = 0; i < menu.length; i += 2) {
    menus[category]?.push({
      name: menu[i] as string,
      price: menu[i + 1] as number,
    });
  }
}

export default async function seedMenu() {
  addMenus("main", [
    "Fried Chicken",
    26,
    "Pork Belly",
    27,
    "Beef Ribs",
    33,
    "Beef loin",
    35,
  ]);
  addMenus("side", [
    "Chips",
    12,
    "Spaghetti",
    20,
    "Chicken Wings",
    17,
    "Salad",
    13,
  ]);
  addMenus("alcohol", ["Soju", 15, "Beer", 10, "Wine", 22]);
  addMenus("nonAlcohol", ["Coke", 5, "Sunkist", 5, "Juice", 7]);

  await Menu.create(menus);
  console.log("Menu seeded");
}

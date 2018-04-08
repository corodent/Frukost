const bubbles = [
{
  name: "Grön",
  rooms: ["13", "14", "15", "16:1", "16:2", "17:1", "17:2", "17:3", "17 ÖB"],
  color: "green-bg",
},
{
  name: "Röd",
  rooms: ["26", "27", "28", "29:1", "29:2", "30:1", "30:2", "30:3", "30 ÖB"],
  color: "red-bg",
},
{
  name: "Blå",
  rooms: ["21:1", "21:2", "21:3", "22:1", "22:2", "23", "24", "25", "21 ÖB"],
  color: "blue-bg",
}];


const mackaOptions = [{
  name: "Hård Bröd",
  image: "hardbread.jpg",
},
{
  name: "Mjuk Bröd",
  image: "softbread.jpg",
},
{
  name: "Ost",
  image: "ost.jpg",
},
{
  name: "Skinka",
  image: "skinka.jpg",
},
{
  name: "Grönt",
  image: "veg.jpg",
}];

const yogiOptions = [
  {
    name: "Lingonsylt",
    image: "lingonjam.jpg",
  },
  {
    name: "Äppelmos",
    image: "appelmos.jpg",
  },
  {
    name: "Jordgubbsylt",
    image: "strawberryjam.jpg",
  },
  {
    name: "Socker",
    image: "socker.jpg",
  },
];

const coffeeOptions = [
  {
    name: "Socker",
    image: "socker.jpg",
  },
  {
    name: "Honung",
    image: "honey.jpg",
  },
  {
    name: "Mjölk",
    image: "milk.jpg",
  },
  {
    name: "Sukketter",
    image: "suketter.jpg",
  },
];

const drinkOptions = [
  {
    name: "Juice",
    image: "juice.jpg",
  },
  {
    name: "Näringsdryck",
    image: "fortimelenergy_choklad.jpg",
  },
  {
    name: "Saft",
    image: "saft.jpg"
  }
];

const menuItems = [
  {
    name: "Macka 1",
    image: "macka.jpg",
    options: mackaOptions,
    hidden: true,
  },
  {
    name: "Macka 2",
    image: "macka.jpg",
    options: mackaOptions,
    hidden: true,
  },
  {
    name: "Fil",
    image: "filmilk.jpg",
    options: yogiOptions,
  },
  {
    name: "Yogurt",
    image: "yoghurt.jpg",
    options: yogiOptions,
  },
  {
    name: "Gröt",
    image: "grot.jpg",
    options: yogiOptions,
  },
  {
    name: "Flingor",
    image: "flingor.jpg",
  },
  {
    name: "Müesli",
    image: "musli.jpg",
  },
  {
    name: "Ägg",
    image: "egg.jpg",
    options: [
      {
        name: "Kaviar",
        image: "kaviar.jpg",
      },
      {
        name: "Salt",
        image: "salt.jpg",
      }
    ],
  },
  {
    name: "Dryck",
    image: "juice.jpg",
    options: drinkOptions,
    hidden: true,
  },
  {
    name: "Kaffe",
    image: "kaffe.jpg",
    options: coffeeOptions,
  },
  {
    name: "Te",
    image: "te.jpg",
    options: coffeeOptions,
  },
];

export {
  bubbles,
  menuItems
}

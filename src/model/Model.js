const bubbles = [
{
  name: "Grön",
  rooms: ["13", "14", "15", "16:1", "16:2", "17:1", "17:2", "17:3", "17 ÖB"],
  color: "green-bg",
  orderColor: "green-order",
},
{
  name: "Blå",
  rooms: ["21:1", "21:2", "21:3", "22:1", "22:2", "23", "24", "25", "25 ÖB"],
  color: "blue-bg",
  orderColor: "blue-order",
},
{
  name: "Röd",
  rooms: ["26", "27", "28", "29:1", "29:2", "30:1", "30:2", "30:3", "30 ÖB"],
  color: "red-bg",
  orderColor: "red-order",
}
];


const mackaOptions = [{
  name: "Hårt Bröd",
  image: "hardbread.jpg",
  group: true,
},
{
  name: "Mjukt Bröd",
  image: "softbread.jpg",
  group: true,
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
    group: true,
  },
  {
    name: "Äppelmos",
    image: "appelmos.jpg",
    group: true,
  },
  {
    name: "Jordgubbsylt",
    image: "strawberryjam.jpg",
    group: true,
  },
  {
    name: "Socker",
    image: "socker.jpg",
    group: true,
  },
  {
    name: "Flingor",
    image: "flingor.jpg",
    group: true,
  },
  {
    name: "Müsli",
    image: "musli.jpg",
    group: true,
  },
];

const grotOptions = [
  {
    name: "Lingonsylt",
    image: "lingonjam.jpg",
    group: true,
  },
  {
    name: "Äppelmos",
    image: "appelmos.jpg",
    group: true,
  },
  {
    name: "Jordgubbsylt",
    image: "strawberryjam.jpg",
    group: true,
  },
  {
    name: "Socker",
    image: "socker.jpg",
    group: true,
  }
];

const coffeeOptions = [
  {
    name: "Socker",
    image: "socker.jpg",
    group: true,
  },
  {
    name: "Honung",
    image: "honey.jpg",
    group: true,
  },
  {
    name: "Suketter",
    image: "suketter.jpg",
    group: true,
  },
  {
    name: "Mjölk",
    image: "milk.jpg",
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
    name: "Yoghurt",
    image: "yoghurt.jpg",
    options: yogiOptions,
  },
  {
    name: "Gröt",
    image: "grot.jpg",
    options: grotOptions,
  },

  {
    name: "Ägg",
    image: "egg.jpg",
    options: [
      {
        name: "Kaviar",
        image: "kaviar.jpg",
        group: true,
      },
      {
        name: "Salt",
        image: "salt.jpg",
        group: true,
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

const COMMENTS_PROP = 'Kommentar';

export {
  bubbles,
  menuItems,
  COMMENTS_PROP,
}

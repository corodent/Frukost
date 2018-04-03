import React, { Component } from 'react';
import './Menu.css';

class MenuOption extends Component {
  render() {
    const { option, onItemChanged, id } = this.props;
    return(
      <div className="menu-option" id={id}>
        <img src={`images/${option.image}`} alt={option.name} height="100" width="100" />
        <p>{ option.name }</p>
        <input
          type="checkbox"
          onChange={onItemChanged}
        />
      </div>
    );
  }
}

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  onItemChanged( item, option, event ) {
    console.log( `MenuItem: ${item.name} ${option.name}`);
    this.props.onItemChanged( item, option, event );
  }

  render() {
    const { item, onItemChanged } = this.props;
    const options = item.options &&
      item.options.map(
        (option => {
          var i = 0;
          return option => {
            return <MenuOption optionid={i++} option={option} onItemChanged={this.onItemChanged.bind(this,item,option)} />;
          }
      })()
    );

    return(
      <div className="menu-item">
        <MenuOption option={item} onItemChanged={this.onItemChanged.bind(this,item,item)} />
        { options }
      </div>
    );
  }
}


export default class Menu extends Component {
  render() {
    const { currentBubble, onItemChanged } = this.props;
    console.log( "onItemChanged: " + onItemChanged );
    return (
      <div className="menu-container">
      {
        menuItems.map( (item) => {
          return(
            <MenuItem item={item} key={item.name} onItemChanged={onItemChanged}/>
          );
        })
      }
      </div>
    );
  }
}

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

const menuItems = [
  {
    name: "Macka 1",
    image: "macka.jpg",
    options: mackaOptions,
  },
  {
    name: "Macka 2",
    image: "macka.jpg",
    options: mackaOptions,
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
    name: "Juice",
    image: "juice.jpg",
  },
  {
    name: "Näringsdryck",
    image: "fortimelenergy_choklad.jpg",
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

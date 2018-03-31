import React, { Component } from 'react';
import './Menu.css';

export default class Menu extends Component {
  render() {
    const { currentBubble } = this.props;
    return (
      <div>
      {
        menuItems.map( (item) => {
          return(
            <div key={item.name}>
            <img src={`images/${item.image}`} alt={item.name} height="100" width="100" />
            <p>{ item.name }</p>
            </div>
          );
        })
      }
      </div>
    );
  }
}

const menuItems = [
  {
    name: "Macka 1",
    image: "macka.jpg",
  },
  {
    name: "Macka 2",
    image: "macka.jpg",
  },
  {
    name: "Fil",
    image: "filmilk.jpg",
  },
  {
    name: "Yogurt",
    image: "yoghurt.jpg",
  },
  {
    name: "Gröt",
    image: "grot.jpg",
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
  },
  {
    name: "Te",
    image: "te.jpg",
  },
];

import React, { Component } from 'react';
import './Menu.css';
import { menuItems } from '../model/Model';

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
            return <MenuOption key={i} optionid={i++} option={option} onItemChanged={this.onItemChanged.bind(this,item,option)} />;
          }
      })()
    );

    return(
      <div className="menu-item">
        {
          item.hidden || <MenuOption option={item} onItemChanged={this.onItemChanged.bind(this,item,item)} />
        }
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

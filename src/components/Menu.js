import React, { Component } from 'react';
import './Menu.css';
import { menuItems } from '../model/Model';

class MenuOption extends Component {
  render() {
    const { option, onItemChanged, id, enabled } = this.props;
    let clss = "menu-option";
    if( enabled ) {
      clss += " enabled";
    }
    return(
      <div className={clss} id={id} onClick={onItemChanged}>
        <img src={`images/${option.image}`} alt={option.name} height="100" width="100" />
        <p>{ option.name }</p>
      </div>
    );
  }
}

class MenuItem extends Component {
  onItemChanged( item, option, event ) {
    this.props.onItemChanged( item, option, event );
  }

  render() {
    const { item, onItemChanged, orderOptions } = this.props;
    const options = item.options &&
      item.options.map(
        (option => {
          var i = 0;
          return option => {
            const enabled = (typeof orderOptions!=='undefined') && orderOptions[option.name]==true;
            return <MenuOption
                key={i}
                optionid={i++}
                option={option}
                enabled={enabled}
                onItemChanged={this.onItemChanged.bind(this,item,option)}
              />;
          }
      })()
    );
    const enabled = (typeof orderOptions!=='undefined') && orderOptions[item.name]==true;

    return(
      <div className="menu-item">
        {
          item.hidden || <MenuOption option={item} onItemChanged={this.onItemChanged.bind(this,item,item)} enabled={enabled} />
        }
        { options }
      </div>
    );
  }
}

export default class Menu extends Component {
  render() {
    const { currentBubble, onItemChanged, currentOrder } = this.props;
    return (
      <div className="menu-container">
      {
        menuItems.map( (item) => {
          const options = currentOrder && currentOrder[item.name];
          return(
            <MenuItem item={item} key={item.name} orderOptions={options} onItemChanged={onItemChanged}/>
          );
        })
      }
      </div>
    );
  }
}

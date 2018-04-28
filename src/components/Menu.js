import React, { Component } from 'react';
import './Menu.css';
import { menuItems, COMMENTS_PROP } from '../model/Model';

class MenuOption extends Component {
  render() {
    const { option, onItemChanged, id, enabled } = this.props;
    let clss = "menu-option";
    if( enabled ) {
      clss += " enabled";
    }
    return(
      <div className={clss} id={id} onClick={onItemChanged}>
        <img
          src={`images/${option.image}`}
          alt={option.name}
          height="60"
          width="60" />
        <p>{ option.name }</p>
      </div>
    );
  }
}

class MenuItem extends Component {
  onItemChanged( item, option ) {
    this.props.onItemChanged( item, option );
  }

  render() {
    const { item, orderOptions } = this.props;
    const options = item.options &&
      item.options.map(
        (option => {
          var i = 0;
          return option => {
            const enabled = (typeof orderOptions!=='undefined') && orderOptions[option.name]===true;
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
    const enabled = (typeof orderOptions!=='undefined') && orderOptions[item.name]===true;
    return(
      <div className="menu-item">
        {
       item.hidden || <MenuOption
                        option={item}
                        enabled={enabled}
                        onItemChanged={this.onItemChanged.bind(this,item,item)}
                      />
        }
        { options }
      </div>
    );
  }
}

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.onKak = this.onKak.bind(this);
  }

  onKak(event) {
    console.log(`onKak(${event.target.value})`);
  }

  render() {
    const {
      onItemChanged,
      currentOrder,
      onCommentsChange } = this.props;

    let comments = "";
    if( currentOrder && currentOrder[COMMENTS_PROP] && currentOrder[COMMENTS_PROP][COMMENTS_PROP] ) {
      comments = currentOrder[COMMENTS_PROP][COMMENTS_PROP];
    }

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
        <div id="comments-container">
          <div id="comments-label">Kommentar</div>
          <input
            type="text"
            name="comments"
            onChange={onCommentsChange}
            value={comments}
          />
        </div>
      </div>
    );
  }
}

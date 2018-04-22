import React, { Component } from 'react';
import './BubbleHeader.css';
import { bubbles } from '../model/Model';
import { Order } from '../model/Order';

export default class BubbleHeader extends Component {
  constructor(props) {
    super(props);
    this.onUpdateBubble = this.onUpdateBubble.bind(this);
    this.onUpdateRoom = this.onUpdateRoom.bind(this);
  }

  onUpdateBubble(event) {
    this.props.onUpdateBubble(event.target.value);
  }

  onUpdateRoom(room, event) {
    console.log(`BubbleHeader.onUpdateRoom: ${room}`)
    this.props.onUpdateRoom(room)
  }

  render() {
    const { currentBubble, currentRoom, order } = this.props;

    const listItems = bubbles[currentBubble].rooms.map( ( bbl => {
      var i = 0;
      return (bbl) => {
        var className = i==currentRoom ? "active" : "";
        if( order.getOrdered( bbl ) ) {
          className += ` ${bubbles[currentBubble].orderColor}`;
        }
        var revVal = <li
          className={className}
          key={i}
          onClick={ this.onUpdateRoom.bind(this,i) }
        >{bbl}</li>;
        i++;
        return revVal;
      }
    })());

    return (
      <header className="bubble-header">
        <ul className={bubbles[currentBubble].color}>
          {listItems}
          <li id="bubble-selector">
            <select name="Bubla" onChange={this.onUpdateBubble}>
              <option value="0">Grön</option>
              <option value="1">Röd</option>
              <option value="2">Blå</option>
            </select>
          </li>
        </ul>
      </header>
    );
  }
}

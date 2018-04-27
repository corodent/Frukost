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
    this.props.onUpdateRoom(room)
  }

  render() {
    const { currentBubble, currentRoom, order, onCleanBubble } = this.props;

    const listItems = bubbles[currentBubble].rooms.map( ( bbl => {
      var i = 0;
      return (bbl) => {
        var className = 'room';

        if( order.getOrdered( bbl ) && i==currentRoom ) {
          className += ' room-active-ordered';
        } else {
          if( order.getOrdered( bbl ) ) {
            className += ' room-ordered';
          }
          if( i==currentRoom ) {
            className += ' room-active';
          }
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

    let className

    return (
      <header className="bubble-header">
        <div className="title-bar">
          <select name="Bubla" onChange={this.onUpdateBubble} className={bubbles[currentBubble].color}>
            <option value="0">Grön Bubbla</option>
            <option value="1">Röd Bubbla</option>
            <option value="2">Blå Bubbla</option>
          </select>
          <div className="title">Frukostbeställning till köksan</div>
        </div>
        <ul>
          {listItems}
        </ul>
      </header>
    );
  }
}

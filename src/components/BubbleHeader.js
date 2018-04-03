import React, { Component } from 'react';
import './BubbleHeader.css';

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
    const { currentBubble, currentRoom } = this.props;
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

    const listItems = bubbles[currentBubble].rooms.map( ( bbl => {
      var i = 0;
      return (bbl) => {
        var className = i==currentRoom ? "active" : "";
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
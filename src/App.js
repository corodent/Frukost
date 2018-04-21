import React, { Component } from 'react';
import './App.css';
import BubbleHeader from './components/BubbleHeader';
import {
  handleClientLoad,
  placeOrder
} from './model/Spreadsheet';
import {
  bubbles
} from './model/Model'
import Menu from './components/Menu';
import { Order } from './model/Order';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBubble: 0,
      currentRoom: 0,
      order: new Order()
    };
    this.onUpdateCurrentBubble = this.onUpdateCurrentBubble.bind(this);
    this.onUpdateCurrentRoom = this.onUpdateCurrentRoom.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    this.onOrder = this.onOrder.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = handleClientLoad;
    document.body.appendChild(script);
  }

  onUpdateCurrentBubble(bubble) {
    this.setState({
      currentBubble: bubble
    });
  }

  onUpdateCurrentRoom(room) {
    this.setState({ currentRoom: room });
  }

  onItemChanged(item, option) {
    this.setState( (prevState) => {
      let { order, currentRoom, currentBubble } = prevState;
      const roomName = bubbles[currentBubble].rooms[currentRoom];
      const checked = order.get( roomName, item.name, option.name );
      console.log( `onItemChanged: ${checked}`);
      order.set( roomName, item.name, option.name, !checked );

      // add logic to set / unset the hidden menu items here.
      // nuke this if we manage to show these hidden items again
      if( item.hidden ) {
        const anyOptionSet = item.options.reduce( ( prevVal, elem ) => {
            return prevVal || order.get( roomName, item.name, option.name );
        }, false );
        order.set( roomName, item.name, item.name, anyOptionSet );
      }
      return { order: order };
    });
  }

  onOrder() {
    const { currentBubble, currentRoom, order } = this.state;
    const bubble = bubbles[currentBubble].name;
    const room = bubbles[currentBubble].rooms[currentRoom];
    placeOrder( bubble, room, order );
  }

  render() {
    const { currentBubble, currentRoom, order } = this.state;
    const roomName = bubbles[currentBubble].rooms[currentRoom];

    return (
      <div className="App">
        <BubbleHeader
          currentBubble={currentBubble}
          currentRoom={currentRoom}
          onUpdateBubble={this.onUpdateCurrentBubble}
          onUpdateRoom={this.onUpdateCurrentRoom}
        />
        <Menu
          currentBubble={currentBubble}
          currentOrder={order[roomName]}
          onItemChanged={this.onItemChanged}
        />
        <button className="fbutton" onClick={this.onOrder}>Skicka Beställning</button>
      </div>
    );
  }
}

export default App;

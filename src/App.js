import React, { Component } from 'react';
import './App.css';
import BubbleHeader from './components/BubbleHeader';
import {
  handleClientLoad,
  updateValue
} from './model/Spreadsheet';
import {
  bubbles
} from './model/Model'
import Menu from './components/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBubble: 0,
      currentRoom: 0,
      order: {}
    };
    this.onUpdateCurrentBubble = this.onUpdateCurrentBubble.bind(this);
    this.onUpdateCurrentRoom = this.onUpdateCurrentRoom.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
  }

  componentDidMount() {
    /*
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = handleClientLoad;
    document.body.appendChild(script);
    */
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

      if( typeof order[roomName]==='undefined' ) {
        order[roomName]={};
      }
      if ( typeof order[roomName][item.name]==='undefined' ) {
        order[roomName][item.name] = {};
      }
      let checked = order[roomName][item.name][option.name];
      if( typeof checked==='undefined' ) {
        checked = false;
      }
      order[roomName][item.name][option.name]=!checked;
      return { order: order };
    });

    /*
    updateValue(
      this.state.currentBubble,
      this.state.currentRoom,
      item,
      option,
      event.target.checked
    );
    */
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
        <button className="fbutton">Skicka Beställning</button>
      </div>
    );
  }
}

export default App;

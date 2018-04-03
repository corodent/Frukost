import React, { Component } from 'react';
import './App.css';
import BubbleHeader from './components/BubbleHeader';
import {
  handleClientLoad,
  testSheet,
} from './model/Spreadsheet'
import Menu from './components/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBubble: 0,
      currentRoom: 1,
    };
    this.onUpdateCurrentBubble = this.onUpdateCurrentBubble.bind(this);
    this.onUpdateCurrentRoom = this.onUpdateCurrentRoom.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
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
    this.setState({
      currentRoom: room
    });
  }

  onItemChanged(item, option, event) {
    console.log(`onItemChanged: ${item.name} ${option.name} ${event.target.checked}`);
    //testSheet();
  }

  render() {
    return (
      <div className="App">
        <BubbleHeader
          currentBubble={this.state.currentBubble}
          currentRoom={this.state.currentRoom}
          onUpdateBubble={this.onUpdateCurrentBubble}
          onUpdateRoom={this.onUpdateCurrentRoom}
        />
        <Menu
          currentBubble={this.state.currentBubble}
          onItemChanged={this.onItemChanged}
        />
      </div>
    );
  }
}

export default App;

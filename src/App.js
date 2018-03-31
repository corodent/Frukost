import React, { Component } from 'react';
import './App.css';
import BubbleHeader from './components/BubbleHeader';
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
        />
      </div>
    );
  }
}

export default App;

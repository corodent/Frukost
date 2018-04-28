import React, { Component } from 'react';
import './BubbleHeader.css';
import { bubbles } from '../model/Model';

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
    const { currentBubble, currentRoom, order, isInfoVisible, onToggleInfo } = this.props;

    const listItems = bubbles[currentBubble].rooms.map( ( bbl => {
      var i = 0;
      return (bbl) => {
        var className = 'room';

        if( order.getOrderState( bbl )!==order.OrderState.START && i===currentRoom ) {
          className += ' room-active-ordered';
        } else {
          if( order.getOrderState( bbl )!==order.OrderState.START ) {
            className += ' room-ordered';
          }
          if( i===currentRoom ) {
            className += ' room-active';
          }
        }
        var revVal = <li
          className={className}
          key={i}
          onClick={ this.onUpdateRoom.bind(this,i) }
        >
        <div>{bbl}</div>
        {
          order.getOrderState( bbl )===order.OrderState.READY &&
          <div className="notification-dot">
          <i className="fas fa-circle"/>
          </div>
        }
        </li>;
        i++;
        return revVal;
      }
    })());

    return (
      <header className="bubble-header">
        <div className="title-bar">
          <select name="Bubla" onChange={this.onUpdateBubble} className={bubbles[currentBubble].color}>
            <option value="0">Grön Bubbla</option>
            <option value="1">Röd Bubbla</option>
            <option value="2">Blå Bubbla</option>
          </select>
            <div className="title-container">
            <span className="title">Frukostbeställning till köksan</span>
            <span className="info-bubble" onClick={onToggleInfo}>
              <i className="fas fa-info-circle"></i>
            </span>
            {
              isInfoVisible &&
                <span className="info-text">
                Börja med att välja bubbla och sängplats. Sedan kan du välja den
                frukost patienten önskar. Skicka beställningen till köksan genom
                att klicka på knappen “Skicka beställning säng …” längst ner till
                vänster på sidan. Om du råkat skicka iväg en felaktig beställning
                kan du klicka på "Rensa beställning säng..." för att nollställa och
                börja om. När beställningen är klar att hämtas från köksan markeras
                sängplatsen i menyn med en symbol.
                </span>
            }
            </div>
        </div>
        <ul>
          {listItems}
        </ul>
      </header>
    );
  }
}

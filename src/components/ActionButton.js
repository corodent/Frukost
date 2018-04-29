import React, { Component } from 'react';
import './ActionButton.css';

export default class ActionButton extends Component {
  render() {
    const { room, order, onClick, text, justify } = this.props;
    var txt1;
    let txt2 = `SÄNG ${room}`;
    let clss = 'fbutton';

    if( order ) {
      if( order.getOrderState(room)!==order.OrderState.START ) {
        txt1 = 'BESTÄLLNINGEN SKICKAD';
        clss += ' ordered';
      } else {
        txt1 = 'SKICKA BESTÄLLNING';
      }
    } else {
      txt1 = text;
    }

    if( justify && justify==='right' ) {
      clss += ' fbutton-right';
    }
    return <button className={clss} onClick={onClick}>{txt1}<br/>{txt2}</button>;
  }
}

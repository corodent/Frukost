import React, { Component } from 'react';
import { Order } from '../model/Order';
import './OrderButton.css';

export default class OrderButton extends Component {
  render() {
    const { room, order, onClick } = this.props;
    var txt1;
    let txt2 = `SÄNG ${room}`;
    let clss = 'fbutton';
    if( order.getOrdered(room) ) {
      txt1 = 'BESTÄLLNINGEN SKICKAD';
      clss += ' ordered';
    } else {
      txt1 = 'SKICKA BESTÄLLNING';
    }
    return <button className={clss} onClick={onClick}>{txt1}<br/>{txt2}</button>;
  }
}

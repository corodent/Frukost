import React, { Component } from 'react';
import { Order } from '../model/Order';

export default class OrderButton extends Component {
  render() {
    const { room, order, onClick } = this.props;
    const txt = order.getOrdered(room) ? `${room} beställt` : `Skicka Beställning ${room}`;
    return <button className="fbutton" onClick={onClick}>{txt}</button>;
  }
}

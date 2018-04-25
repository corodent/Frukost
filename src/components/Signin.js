import React, { Component } from 'react';

export default class Signin extends Component {
  render() {
    const { onClick } = this.props;
    return <button onClick={onClick}>Sign In</button>;
  }
}

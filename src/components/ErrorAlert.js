import React, { Component } from 'react';
import './ErrorAlert.css';

export default class ErrorAlert extends Component {
  render() {
    const { errorText, onCloseError } = this.props;
    if( errorText!=null ) {
      return(
        <div className="alert">
          <span className="closebtn" onClick={onCloseError}>&times;</span>
          {errorText}
        </div>
      );
    } else {
      return '';
    }
  }
}

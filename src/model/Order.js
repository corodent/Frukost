export function Order() {
  this.set = function ( room, item, option, value ) {
    this[room] = this[room] || {};
    this[room][item] = this[room][item] || {};
    this[room][item][option] = value;
  };

  this.get = function ( room, item, option ) {
    return this[room] && this[room][item] && this[room][item][option] ?
      this[room][item][option] : false;
  };

  this.setOrderState = function ( room, orderState ) {
    this[room] = this[room] || {};
    this[room].ordered = orderState;
  }

  this.getOrderState = function ( room ) {
    return this[room] && typeof this[room].ordered!=='undefined' ? this[room].ordered : this.OrderState.START;
  }

  this.cleanOrder = function ( room ) {
    this[room] = {};
  }

  this.toString = function () {
    return JSON.stringify( this );
  };

  this.OrderState = Object.freeze({
    START: 1,
    ORDERED: 2,
    READY: 3
  });
}

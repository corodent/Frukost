export function Order() {
  this.set = function ( room, item, option, value ) {
    this[room] = this[room] || {};
    this[room][item] = this[room][item] || {};
    this[room][item][option] = value;
  };

  this.get = function ( room, item, option ) {
    let ret = false;
    return this[room] && this[room][item] && this[room][item][option] || false;
  };

  this.toString = function () {
    return JSON.stringify( this );
  };
}
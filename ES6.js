// Unlike functions, arrows share the same lexical this as their surrounding code.

var bob = {
  _name: "Bob", 
  _friends: [],

  printFriends() {
  this._friends.forEach(f =>
    console.log(this._name + " knows " + f));
  }
}

// ES5 

var bob = {
  _name: "Bob",
  _friends: [],
  
  printFriends: function printFriends() {
    var _this = this;

    this._friends.forEach(function (f) {
      return console.log(_this._name + " knows " + f);
    });
  }
};
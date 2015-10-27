var EXPORTED_SYMBOLS = ["Utils"];

var Utils = {
  tsNow: function (seconds) {
    var t = +new Date();
    return seconds ? Math.floor(t / 1000) : t;
  }
}

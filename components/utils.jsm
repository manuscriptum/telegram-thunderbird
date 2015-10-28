var EXPORTED_SYMBOLS = ["tsNow"];


function tsNow (seconds) {
  var t = +new Date();
  return seconds ? Math.floor(t / 1000) : t;
}

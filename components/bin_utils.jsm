var EXPORTED_SYMBOLS = ["nextRandomInt", "intToUint", "bytesToHex", "longFromInts",
  "bigint", "bigStringInt", "bytesFromHex", "sha1BytesSync", "sha1HashSync"];

Components.utils.import("resource://components/jsbn_combined.jsm")
Components.utils.import("resource://components/rusha.jsm")


function nextRandomInt (maxValue) {
  return Math.floor(Math.random() * maxValue);
}

function bigint (num) {
  return new BigInteger(num.toString(16), 16);
}

function bigStringInt (strNum) {
  return new BigInteger(strNum, 10);
}

function sha1HashSync (bytes) {
  this.rushaInstance = this.rushaInstance || new Rusha(1024 * 1024);

  // console.log(dT(), 'SHA-1 hash start', bytes.byteLength || bytes.length);
  var hashBytes = rushaInstance.rawDigest(bytes).buffer;
  // console.log(dT(), 'SHA-1 hash finish');

  return hashBytes;
}

function sha1BytesSync (bytes) {
  return bytesFromArrayBuffer(sha1HashSync(bytes));
}

function bytesFromArrayBuffer (buffer) {
  var len = buffer.byteLength,
      byteView = new Uint8Array(buffer),
      bytes = [];

  for (var i = 0; i < len; ++i) {
    bytes[i] = byteView[i];
  }

  return bytes;
}

function bytesFromHex (hexString) {
  var len = hexString.length,
      i,
      start = 0,
      bytes = [];

  if (hexString.length % 2) {
    bytes.push(parseInt(hexString.charAt(0), 16));
    start++;
  }

  for (i = start; i < len; i += 2) {
    bytes.push(parseInt(hexString.substr(i, 2), 16));
  }

  return bytes;
}

function intToUint (val) {
  val = parseInt(val);
  if (val < 0) {
    val = val + 4294967296;
  }
  return val;
}

function bytesToHex (bytes) {
  bytes = bytes || [];
  var arr = [];
  for (var i = 0; i < bytes.length; i++) {
    arr.push((bytes[i] < 16 ? '0' : '') + (bytes[i] || 0).toString(16));
  }
  return arr.join('');
}

function longFromInts (high, low) {
  return bigint(high).shiftLeft(32).add(bigint(low)).toString(10);
}

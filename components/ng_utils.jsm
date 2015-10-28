var EXPORTED_SYMBOLS = ["Storage"];

Components.utils.import("resource://components/q.jsm")

/*####"dc"####"dcDUMMY_auth_key"*/
var Database = {
  dc: 1,
  dc1_auth_key: '',
  dc1_server_salt: ''
}

var _get = function () {
  var deferred = $q.defer();

  for (var i = 0; i < arguments.length; i++) {
    var result = Database[arguments[i]];
    dump("\nGot entry for "+arguments[i]+': '+result);
    deferred.resolve(result);
  }

  return deferred.promise;
};

var Storage = {
  get: _get
};

var EXPORTED_SYMBOLS = ["Storage"];

Components.utils.import("resource://components/q.jsm")

/*####"dc"####"dcDUMMY_auth_key"*/
var Database = {
  dc: 1,
  dc1_auth_key: '',//'4d49494243674b4341514541775641435069397732336d463374426b645a7a2b7a77727a4b4f616151647230317641625534453170766b666a34737144736d360d0a6c79444f4e5337383973566f442f784353395930686b6b433367744c31745366546c67434d4f4f756c396c6369786c454b7a774b454e6a31597a2f73376461530d0a616e3974717733626655562f6e7167626847583831762f2b3752464145642b5277466e4b37612b58596c39736c757a48527956566154547665423247617a54770d0a45667a6b324457676b426c756d6c384f52456d766672615833626b485a4a544b58344551536a426262644a325a5849735272594f586661412b7861794547422b0d0a3868646c4c6d416a624356666169677858304344715765523179464c396b77643950304e735a5250736d6f7156774d624d75376d53744661693661496863336e0d0a536c76386b67397176316d36584856515933506e45772b515174715349586b6c4877494441514142',
  dc1_server_salt: ''//'5705799870273963111'
}

var _get = function () {
  var deferred = $q.defer();
  var single = false;
  var result;
  if (arguments.length === 1) {
    single = true;
    result = Database[arguments[0]] || false;
    dump("\nGot single entry for "+arguments[0]+': '+result+'\n');
  } else {
    result = [];
    for (var i = 0; i < arguments.length; i++) {
      var r = Database[arguments[i]] || false;
      dump("\nGot multipart entry for "+arguments[i]+': '+r+'\n');
      result.push(r);
    }
  }
  deferred.resolve(single ? result[0] : result);

  return deferred.promise;
};

var Storage = {
  get: _get
};

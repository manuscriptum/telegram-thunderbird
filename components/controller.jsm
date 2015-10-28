var EXPORTED_SYMBOLS = ["sendCode", "init", "login"];

Components.utils.import("resource://components/config.jsm");
Components.utils.import("resource://components/utils.jsm");

Components.utils.import("resource://components/mtproto_wrapper.jsm");

var init = function () {
  MtpApiManager.getUserID().then(function (id) {
    if (id) {
      dump("Have ID!");
      return;
    }
  });
}

var login = function () {
  var options = {dcID: 2, createNetworker: true},
    countryChanged = false,
    selectedCountry = false;

  MtpApiManager.invokeApi('help.getNearestDc', {}, {dcID: 1, createNetworker: true}).then(function (nearestDcResult) {
    if (nearestDcResult.nearest_dc != nearestDcResult.this_dc) {
      MtpApiManager.getNetworker(nearestDcResult.nearest_dc, {createNetworker: true});
    }
  });
}

var sendCode = function () {
  var authKeyStarted = tsNow();
  MtpApiManager.invokeApi('auth.sendCode', {
    phone_number: '+4915773199745',
    // sms_type: 5,
    api_id: Config.id,
    api_hash: Config.hash,
    lang_code: Config.lang_code
  }, {}).then(function (sentCode) {
    dump(sentCode);
    //$scope.credentials.phone_code_hash = sentCode.phone_code_hash;
    //$scope.credentials.phone_occupied = sentCode.phone_registered;
    //$scope.credentials.viaApp = sentCode._ == 'auth.sentAppCode';
    //$scope.callPending.remaining = sentCode.send_call_timeout || 60;
    //$scope.error = {};
    //$scope.about = {};

    //callCheck();

  }, function (error) {
    dump('sendCode error', error);
    switch (error.type) {
      case 'PHONE_NUMBER_INVALID':
        dump(error.type);
        error.handled = true;
        break;
    }
  });
}

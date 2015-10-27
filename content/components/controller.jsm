var EXPORTED_SYMBOLS = ["sendCode"];

Components.utils.import("chrome://telegram/content/config.jsm");
Components.utils.import("chrome://telegram/content/components/utils.jsm");

Components.utils.import("chrome://telegram/content/components/mtproto_wrapper.jsm");


var sendCode = function () {
  var authKeyStarted = Utils.tsNow();
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

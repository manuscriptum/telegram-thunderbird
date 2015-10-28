var EXPORTED_SYMBOLS = ["Storage"];

var Storage = new function () {

  this.setPrefix = function (newPrefix) {
    ConfigStorage.prefix(newPrefix);
  };

  this.$get = ['$q', function ($q) {
    var methods = {};
    angular.forEach(['get', 'set', 'remove'], function (methodName) {
      methods[methodName] = function () {
        var deferred = $q.defer(),
            args = Array.prototype.slice.call(arguments);

        args.push(function (result) {
          deferred.resolve(result);
        });
        ConfigStorage[methodName].apply(ConfigStorage, args);

        return deferred.promise;
      };
    });
    return methods;
  }];
};

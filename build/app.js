(function() {
  var AppController, dependencies;

  angular.module('app', ['datePicker']);

  dependencies = [];

  AppController = function() {
    var vm;
    vm = this;
    vm.modelDate = moment().format('YYYY-MM-DD, HH:mm');
    return vm;
  };

  angular.module('app').controller('AppController', dependencies.concat(AppController));

}).call(this);

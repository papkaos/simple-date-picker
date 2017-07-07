(function() {
  var datePickerInput, dependencies;

  dependencies = [];

  datePickerInput = function() {
    return {
      templateUrl: 'date-picker/date-picker.html',
      scope: {
        modelDate: '='
      },
      replace: true,
      controller: 'DatePickerCtrl',
      controllerAs: 'datePickerCtrl'
    };
  };

  angular.module('datePicker').directive('datePickerInput', dependencies.concat(datePickerInput));

}).call(this);

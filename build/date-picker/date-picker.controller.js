(function() {
  var DatePickerCtrl, dependencies;

  dependencies = ['datePickerService', '$scope'];

  DatePickerCtrl = function(datePickerService, $scope) {
    var checkEmptyDate, vm;
    vm = this;
    vm.todayDateAndTime = datePickerService.getTodayDateAndTime();
    vm.currentMonth = datePickerService.getCurrentMonth();
    vm.checkUserDate = function(date) {
      var userDate;
      if (!date) {
        return;
      }
      userDate = moment(date);
      if (!userDate.isValid()) {
        return;
      }
      return userDate.format('YYYY-MM-DD, HH:mm');
    };
    vm.selectedDateAndTime = vm.checkUserDate($scope.modelDate) || vm.todayDateAndTime;
    vm.selectedMonth = moment(vm.selectedDateAndTime).clone();
    vm.temporarySelected = moment(vm.selectedDateAndTime).clone().format('YYYY-MM-DD, HH:mm');
    vm.daysOfWeek = datePickerService.getDaysOfWeek();
    vm.allDaysInMonth = datePickerService.getDaysInMonth(vm.selectedDateAndTime);
    vm.weeks = datePickerService.getFullMonth(vm.selectedDateAndTime);
    vm.shouldShowCalendar = false;
    vm.getMonth = function(dir) {
      var currentMonth, shift;
      shift = dir === 'prev' ? -1 : 1;
      currentMonth = moment(vm.selectedMonth);
      currentMonth.add(shift, 'months');
      vm.selectedMonth = currentMonth;
      return vm.weeks = datePickerService.getFullMonth(currentMonth);
    };
    vm.setDate = function(date) {
      if (checkEmptyDate(date)) {
        return;
      }
      return vm.temporarySelected = date.format('YYYY-MM-DD, HH:mm');
    };
    vm.changeTime = function(dir, measure) {
      vm.temporarySelected = moment(vm.temporarySelected).add(dir, measure).format('YYYY-MM-DD, HH:mm');
      return void 0;
    };
    vm.isToday = function(date) {
      if (checkEmptyDate(date)) {
        return;
      }
      return date.isSame(moment(), 'day');
    };
    vm.isSelected = function(date) {
      if (checkEmptyDate(date)) {
        return;
      }
      return date.isSame(moment(vm.temporarySelected), 'day');
    };
    vm.setAndApplyDate = function() {
      if (!moment(vm.temporarySelected).isValid()) {
        return;
      }
      vm.selectedDateAndTime = vm.temporarySelected;
      return $scope.modelDate = vm.temporarySelected;
    };
    vm.showCalendar = function() {
      return vm.shouldShowCalendar = true;
    };
    vm.hideCalendar = function() {
      vm.shouldShowCalendar = false;
      vm.temporarySelected = angular.copy(vm.selectedDateAndTime);
      return vm.selectedMonth = moment(vm.selectedDateAndTime).clone();
    };
    checkEmptyDate = function(date) {
      return Object.keys(date).length < 2;
    };
    return vm;
  };

  angular.module('datePicker').controller('DatePickerCtrl', dependencies.concat(DatePickerCtrl));

}).call(this);

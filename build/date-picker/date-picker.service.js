(function() {
  var datePickerService, dependencies;

  dependencies = [];

  datePickerService = function() {
    var currentMonth, daysOfWeek, getCurrentMonth, getDaysInMonth, getDaysOfWeek, getFullMonth, getNow, getTodayDateAndTime, now, svc, todayDateAndTime;
    svc = this;
    now = moment();
    todayDateAndTime = now.format('YYYY-MM-DD, HH:mm');
    currentMonth = now.format('MMMM YYYY');
    daysOfWeek = [
      {
        id: 1,
        fullName: 'Monday',
        name: 'Mo'
      }, {
        id: 2,
        fullName: 'Tuesday',
        name: 'Tu'
      }, {
        id: 3,
        fullName: 'Wednesday',
        name: 'We'
      }, {
        id: 4,
        fullName: 'Thursday',
        name: 'Th'
      }, {
        id: 5,
        fullName: 'Friday',
        name: 'Fr'
      }, {
        id: 6,
        fullName: 'Saturday',
        name: 'Sa'
      }, {
        id: 7,
        fullName: 'Sunday',
        name: 'Su'
      }
    ];
    getNow = function() {
      return now;
    };
    getTodayDateAndTime = function() {
      return todayDateAndTime;
    };
    getCurrentMonth = function() {
      return currentMonth;
    };
    getDaysOfWeek = function() {
      return daysOfWeek;
    };
    getDaysInMonth = function(date) {
      var copyDate, dayInMonth, daysInMonth, firstDayMonth, i, j, objTemp, ref, results;
      copyDate = moment(date);
      firstDayMonth = copyDate.clone().startOf('month').hour(12);
      daysInMonth = [];
      dayInMonth = angular.copy(firstDayMonth);
      results = [];
      for (i = j = 1, ref = copyDate.daysInMonth(); 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        daysInMonth.push(dayInMonth);
        objTemp = angular.copy(dayInMonth);
        dayInMonth = objTemp.add(1, 'day');
        results.push(daysInMonth);
      }
      return results;
    };
    return getFullMonth = function(date) {
      var daysInMonth, firstDay, week, weeksArray;
      daysInMonth = getDaysInMonth(date);
      firstDay = daysInMonth[0].isoWeekday();
      weeksArray = [];
      return week = [];
    };
  };

  angular.module('datePicker');

}).call(this);

(function() {
  var datePickerService, dependencies;

  dependencies = [];

  datePickerService = function() {
    var currentMonth, daysOfWeek, now, svc, todayDateAndTime;
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
    svc.getNow = function() {
      return now;
    };
    svc.getTodayDateAndTime = function() {
      return todayDateAndTime;
    };
    svc.getCurrentMonth = function() {
      return currentMonth;
    };
    svc.getDaysOfWeek = function() {
      return daysOfWeek;
    };
    svc.getDaysInMonth = function(date) {
      var copyDate, dayInMonth, daysInMonth, firstDayMonth, i, j, objTemp, ref;
      copyDate = moment(date);
      firstDayMonth = copyDate.clone().startOf('month').hour(12);
      daysInMonth = [];
      dayInMonth = angular.copy(firstDayMonth);
      for (i = j = 1, ref = copyDate.daysInMonth(); 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        daysInMonth.push(dayInMonth);
        objTemp = angular.copy(dayInMonth);
        dayInMonth = objTemp.add(1, 'day');
      }
      return daysInMonth;
    };
    svc.getFullMonth = function(date) {
      var daysInMonth, elem, firstDay, j, len, week, weeksArray;
      daysInMonth = svc.getDaysInMonth(date);
      firstDay = daysInMonth[0].isoWeekday();
      weeksArray = [];
      week = [];
      while (--firstDay) {
        week.push({});
      }
      for (j = 0, len = daysInMonth.length; j < len; j++) {
        elem = daysInMonth[j];
        if ((week.length + 1) % 7 !== 0) {
          week.push(elem);
        } else {
          week.push(elem);
          weeksArray.push(week);
          week = [];
        }
      }
      weeksArray.push(week);
      return weeksArray;
    };
    return svc;
  };

  angular.module('datePicker').service('datePickerService', dependencies.concat(datePickerService));

}).call(this);

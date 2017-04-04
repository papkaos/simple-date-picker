/**
 * Created by Александр on 04.04.2017.
 */
;(function () {
    'use strict';

    angular.module('datePicker')
        .service('datePickerService', datePickerService);

    function datePickerService() {

        var svc = this;

        var now = moment(),
            todayDateAndTime = now.format("YYYY-MM-DD, HH:mm"),
            currentMonth = now.format("MMMM YYYY");

        var daysOfWeek = [
            {id:1, fullName: 'Monday', name: 'Mo' },
            {id:2, fullName: 'Tuesday', name: 'Tu' },
            {id:3, fullName: 'Wednesday', name: 'We' },
            {id:4, fullName: 'Thursday', name: 'Th' },
            {id:5, fullName: 'Friday', name: 'Fr' },
            {id:6, fullName: 'Saturday', name: 'Sa' },
            {id:7, fullName: 'Sunday', name: 'Su' }
        ];

        svc.getNow = getNow;
        svc.getTodayDateAndTime = getTodayDateAndTime;
        svc.getCurrentMonth = getCurrentMonth;
        svc.getDaysOfWeek = getDaysOfWeek;
        svc.getDaysInMonth = getDaysInMonth;
        svc.getFullMonth = getFullMonth;

        function getNow() {
            return now;
        }

        function getTodayDateAndTime() {
            return todayDateAndTime;
        }

        function getCurrentMonth() {
            return currentMonth;
        }

        function getDaysOfWeek() {
            return daysOfWeek;
        }

        function getDaysInMonth(date) {
            var copyDate = moment(date);
            console.log(copyDate);
            var firstDayMonth = copyDate.clone().startOf('month').hour(12);

            var daysInMonth = [];

            var dayInMonth = angular.copy(firstDayMonth);

            for ( var i = 1; i <= copyDate.daysInMonth(); i++ ) {
                daysInMonth.push(dayInMonth);
                var objTemp = angular.copy(dayInMonth);

                dayInMonth = objTemp.add(1, 'day');
            }

            return daysInMonth;
        }

        function getFullMonth(date) {
            var daysInMonth = getDaysInMonth(date);

            var firstDay = daysInMonth[0].isoWeekday();

            var weeksArray = [];
            var week = [];

            while (--firstDay) {
                week.push({});
            }

            var dayNumber;

            daysInMonth.forEach(function (elem) {

                dayNumber = elem.clone().date();

                if ((week.length + 1) % 7 !== 0) {
                    week.push(elem);
                } else {
                    week.push(elem);
                    weeksArray.push(week);
                    week = [];
                }
            });

            weeksArray.push(week);

            return weeksArray;
        }

    }

})();
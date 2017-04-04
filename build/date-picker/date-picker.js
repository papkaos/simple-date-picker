/**
 * Created by Александр on 03.04.2017.
 */
;(function () {
    'use strict';

    angular.module('datePicker', [])
        .directive('datePickerInput', datePickerInput)
        .controller('DatePickerCtrl', DatePickerCtrl);

    function datePickerInput() {
        return {
            templateUrl: 'date-picker/date-picker.html',
            replace: true,
            controller: 'DatePickerCtrl',
            controllerAs: 'datePickerCtrl'
        }
    }

    DatePickerCtrl.$inject = ['datePickerService'];

    function DatePickerCtrl(datePickerService) {
        var vm = this;

        // vm.now = datePickerService.getNow();
        vm.todayDateAndTime = datePickerService.getTodayDateAndTime();
        vm.currentMonth = datePickerService.getCurrentMonth();

        vm.selectedDateAndTime = vm.todayDateAndTime;
        vm.selectedMonth = moment(vm.selectedDateAndTime).clone();

        vm.temporarySelected = moment(vm.selectedDateAndTime).clone().format("YYYY-MM-DD, HH:mm");

        vm.changeTime = function (dir, measure) {

            vm.temporarySelected = moment(vm.temporarySelected).add(dir, measure).format("YYYY-MM-DD, HH:mm");

            // vm.temporarySelectedTime = time;
        };

        vm.daysOfWeek = datePickerService.getDaysOfWeek();

        vm.allDaysInMonth = datePickerService.getDaysInMonth(vm.selectedDateAndTime);

        vm.weeks = datePickerService.getFullMonth(vm.selectedDateAndTime);

        vm.shouldShowCalendar = false;

        vm.showCalendar = showCalendar;
        vm.hideCalendar = hideCalendar;
        vm.setDate = setDate;
        vm.getMonth = getMonth;
        vm.isToday = isToday;
        vm.isSelected = isSelected;
        vm.setAndApplyDate = setAndApplyDate;

        function getMonth(dir) {

            var shift = dir === 'prev' ? -1 : 1;

            var currentMonth = moment(vm.selectedMonth);

            currentMonth.add(shift, 'months');

            vm.selectedMonth = currentMonth;

            vm.weeks = datePickerService.getFullMonth(currentMonth);
        }


        function setDate(date) {
            if (checkEmptyDate(date)) return;

            vm.temporarySelected = date.format("YYYY-MM-DD, HH:mm");
        }


        function isToday(date) {

            if (checkEmptyDate(date)) return;

            return date.isSame(moment(), 'day');
        }

        function isSelected(date) {
            if (checkEmptyDate(date)) return;

            return date.isSame(moment(vm.temporarySelected), 'day');
        }


        function setAndApplyDate() {

            if (!moment(vm.temporarySelected).isValid()) return;

            vm.selectedDateAndTime = vm.temporarySelected;
        }


        function showCalendar() {
            vm.shouldShowCalendar = true;
        }

        function hideCalendar() {
            vm.shouldShowCalendar = false;

            vm.temporarySelected = angular.copy(vm.selectedDateAndTime);

            vm.selectedMonth = moment(vm.selectedDateAndTime).clone();
        }

        function checkEmptyDate(date) {
            return Object.keys(date).length < 2;
        }

    }


})();
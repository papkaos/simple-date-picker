/**
 * Created by Александр on 03.04.2017.
 */
;(function () {
    'use strict';

    angular.module('app', ['datePicker'])
        .controller('AppController', AppController);

    function AppController() {
        var vm = this;

        vm.modelDate = moment().format("YYYY-MM-DD, HH:mm");
    }

})();
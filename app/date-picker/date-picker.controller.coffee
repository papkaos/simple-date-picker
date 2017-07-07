dependencies = ['datePickerService', '$scope']

DatePickerCtrl = (datePickerService, $scope) ->
  vm = this

  vm.todayDateAndTime = datePickerService.getTodayDateAndTime()
  vm.currentMonth = datePickerService.getCurrentMonth()

  vm.checkUserDate = (date) ->
    return unless date

    userDate = moment date

    return unless userDate.isValid()

    userDate.format 'YYYY-MM-DD, HH:mm'

  vm.selectedDateAndTime = vm.checkUserDate($scope.modelDate) or vm.todayDateAndTime
  vm.selectedMonth = moment(vm.selectedDateAndTime).clone()

  vm.temporarySelected = moment(vm.selectedDateAndTime).clone().format 'YYYY-MM-DD, HH:mm'

  vm.daysOfWeek = datePickerService.getDaysOfWeek()

  vm.allDaysInMonth = datePickerService.getDaysInMonth vm.selectedDateAndTime

  vm.weeks = datePickerService.getFullMonth vm.selectedDateAndTime

  vm.shouldShowCalendar = false

  vm.getMonth = (dir) ->
    shift = if dir is 'prev' then -1 else 1
    currentMonth = moment vm.selectedMonth

    currentMonth.add shift, 'months'

    vm.selectedMonth = currentMonth
    vm.weeks = datePickerService.getFullMonth currentMonth

  vm.setDate = (date) ->
    return if checkEmptyDate date

    vm.temporarySelected = date.format 'YYYY-MM-DD, HH:mm'

  vm.changeTime = (dir, measure) ->
    vm.temporarySelected = moment(vm.temporarySelected).add(dir, measure).format 'YYYY-MM-DD, HH:mm'

    undefined

  vm.isToday = (date) ->
    return if checkEmptyDate date

    date.isSame moment(), 'day'

  vm.isSelected = (date) ->
    return if checkEmptyDate date

    date.isSame moment(vm.temporarySelected), 'day'

  vm.setAndApplyDate = ->
    return unless moment(vm.temporarySelected).isValid()

    vm.selectedDateAndTime = vm.temporarySelected
    $scope.modelDate = vm.temporarySelected

  vm.showCalendar = ->
    vm.shouldShowCalendar = true

  vm.hideCalendar = ->
    vm.shouldShowCalendar = false
    vm.temporarySelected = angular.copy vm.selectedDateAndTime
    vm.selectedMonth = moment(vm.selectedDateAndTime).clone()

  checkEmptyDate = (date) ->
    Object.keys(date).length < 2

  return vm

angular.module('datePicker').controller 'DatePickerCtrl', dependencies.concat DatePickerCtrl

dependencies = []

datePickerService = () ->
  svc = this

  now = moment()
  todayDateAndTime = now.format 'YYYY-MM-DD, HH:mm'
  currentMonth = now.format 'MMMM YYYY'

  daysOfWeek = [
    id: 1
    fullName: 'Monday'
    name: 'Mo'
  ,
    id: 2
    fullName: 'Tuesday'
    name: 'Tu'
  ,
    id: 3
    fullName: 'Wednesday'
    name: 'We'
  ,
    id: 4
    fullName: 'Thursday'
    name: 'Th'
  ,
    id: 5
    fullName: 'Friday'
    name: 'Fr'
  ,
    id: 6
    fullName: 'Saturday'
    name: 'Sa'
  ,
    id: 7
    fullName: 'Sunday'
    name: 'Su'
  ]

  svc.getNow = ->
    now

  svc.getTodayDateAndTime = ->
    todayDateAndTime

  svc.getCurrentMonth = ->
    currentMonth

  svc.getDaysOfWeek = ->
    daysOfWeek

  svc.getDaysInMonth = (date) ->
    copyDate = moment date
    firstDayMonth = copyDate.clone().startOf('month').hour(12)
    daysInMonth = []
    dayInMonth = angular.copy firstDayMonth

    for i in [1..copyDate.daysInMonth()]
      daysInMonth.push dayInMonth
      objTemp = angular.copy dayInMonth
      dayInMonth = objTemp.add 1, 'day'

    daysInMonth


  svc.getFullMonth = (date) ->
    daysInMonth = svc.getDaysInMonth date
    firstDay = daysInMonth[0].isoWeekday()

    weeksArray = []
    week = []

    week.push({}) while --firstDay

    for elem in daysInMonth
      if (week.length + 1) % 7 isnt 0
        week.push elem
      else
        week.push elem
        weeksArray.push week
        week = []

    weeksArray.push week

    weeksArray

  return svc

angular.module('datePicker').service 'datePickerService', dependencies.concat datePickerService

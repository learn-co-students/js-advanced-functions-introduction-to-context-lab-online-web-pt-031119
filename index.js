function createEmployeeRecord(array) {
  const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord
}

function createEmployeeRecords(array) {
  return array.map(function(element) {
    return createEmployeeRecord(element)
  })
}

function createTimeInEvent(record, dateTime) {
  let [date, hour] = dateTime.split(" ")

  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  })
  return record
}

function createTimeOutEvent(record, dateTime) {
  let [date, hour] = dateTime.split(" ")

  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  })
  return record
}

function hoursWorkedOnDate(record, givenDate) {
  let timeIn = record.timeInEvents.find(function(e){
    return e.date === givenDate
  })
  let timeOut = record.timeOutEvents.find(function(e){
    return e.date === givenDate
  })
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, givenDate) {
  let hoursWorked = hoursWorkedOnDate(record, givenDate)
  let wageEarned = hoursWorked * record.payPerHour
  return wageEarned
}

function allWagesFor(record) {
  const dates = record.timeInEvents.map(element => element.date)
  const allWages = dates.reduce(function(memo, element) {return memo + wagesEarnedOnDate(record, element)}, 0)
  return allWages
}

function findEmployeeByFirstName(array, firstName) {
    for (const element of array) {
       return firstName === element.firstName ? element : undefined
    }
}

function calculatePayroll(array) {
  return array.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
}

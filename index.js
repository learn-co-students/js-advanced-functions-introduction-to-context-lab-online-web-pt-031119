// Your code here
function createEmployeeRecord(employeeInfoArray) {
  let employee = {
    firstName: employeeInfoArray[0],
    familyName: employeeInfoArray[1],
    title: employeeInfoArray[2],
    payPerHour: employeeInfoArray[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee;
}

function createEmployeeRecords(employeesInfoArray) {
  let employeesArray = employeesInfoArray.map(function(employee) {
    return createEmployeeRecord(employee);
  });
  return employeesArray;
}

function createTimeInEvent(empRecord, timeStamp) {
  let date = timeStamp.split(" ")[0];
  let time = timeStamp.split(" ")[1];
  let dateAndTimeIn = {
    type: "TimeIn",
    hour: parseInt(time, 10),
    date: date
  };
  empRecord.timeInEvents.push(dateAndTimeIn);
  return empRecord;
}

function createTimeOutEvent(empRecord, timeStamp) {
  let date = timeStamp.split(" ")[0];
  let time = timeStamp.split(" ")[1];
  let dateAndTimeOut = {
    type: "TimeOut",
    hour: parseInt(time, 10),
    date: date
  };
  empRecord.timeOutEvents.push(dateAndTimeOut);
  return empRecord;
}

function hoursWorkedOnDate(empRecord, dateQuery) {
  let timeIn = empRecord.timeInEvents.find(function(elem) {
    return elem.date === dateQuery;
  });
  let timeOut = empRecord.timeOutEvents.find(function(elem) {
    return elem.date === dateQuery;
  });
  let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(empRecord, dateQuery) {
  let hoursWorked = hoursWorkedOnDate(empRecord, dateQuery);
  let wagesEarned = hoursWorked * empRecord.payPerHour;
  return wagesEarned;
}

function allWagesFor(empRecord) {
  let wageArray = empRecord.timeInEvents.map(function(timeInObj) {
    return wagesEarnedOnDate(empRecord, timeInObj.date);
  });
  let wageTotal = wageArray.reduce(function(accumulator, wage) {
    return accumulator + wage;
  });
  return wageTotal;
}

function calculatePayroll(empRecords) {
  let empWageTotals = empRecords.map(function(empObj) {
    return allWagesFor(empObj);
  });
  let payrollTotal = empWageTotals.reduce(function(accumulator, total) {
    return accumulator + total;
  });
  return payrollTotal;
}

function findEmployeeByFirstName(empRecords, firstName) {
  let employee = empRecords.find(function(empObj) {
    return firstName === empObj.firstName;
  });
  return employee;
}

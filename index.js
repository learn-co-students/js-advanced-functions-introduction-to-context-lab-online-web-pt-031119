// Your code here
function createEmployeeRecord(source){
  let employee = {
    firstName: source[0],
    familyName: source[1],
    title: source[2],
    payPerHour: source[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee;
}

function createEmployeeRecords(employees){
  let employeeArray = [];
  employees.forEach(function(employee){
    employeeArray.push(createEmployeeRecord(employee));
  });
  return employeeArray;
}

function createTimeInEvent(worker,timeIn){
  let dateIn = timeIn.split(' ')[0];
  let hourIn = timeIn.split(' ')[1];
  let timeEntryIn = {
    type: 'TimeIn',
    date: dateIn,
    hour: parseInt(hourIn,10)
  };
  worker.timeInEvents.push(timeEntryIn);
  return worker;
}

function createTimeOutEvent(worker,timeOut){
  let dateOut = timeOut.split(' ')[0];
  let hourOut = timeOut.split(' ')[1];
  let timeEntryOut = {
    type: 'TimeOut',
    date: dateOut,
    hour: parseInt(hourOut,10)
  };
  worker.timeOutEvents.push(timeEntryOut);
  return worker;
}

function hoursWorkedOnDate(employee,date){

  let foundTimeIn = employee.timeInEvents.find(function(element){
    return element.date === date;
  })

  let foundTimeOut = employee.timeOutEvents.find(function(element){
    return element.date === date;
  })

  let timeWorked = (foundTimeOut.hour - foundTimeIn.hour)/100;
  return timeWorked;
  
  
}

function wagesEarnedOnDate(employee,date){
  
  let numHoursWorked = hoursWorkedOnDate(employee,date);
  let wages = employee.payPerHour * numHoursWorked
  return wages;
}

function allWagesFor(employee){
  let wagesArray = []
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  employee.timeInEvents.forEach(function(element){
    wagesArray.push(wagesEarnedOnDate(employee,element.date));
  })
  return wagesArray.reduce(reducer);
}

function calculatePayroll(employees){
  let totalWages = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  employees.forEach(function(element){
    totalWages.push(allWagesFor(element));
  })
  return totalWages.reduce(reducer);
}

function findEmployeeByFirstName(employees,name){

  let employee = employees.find(function(element){
    return element.firstName === name;
  })
  return employee;
  
}
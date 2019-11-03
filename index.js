// Your code here
function createEmployeeRecord(array){
  let newObj = {}
    newObj.firstName = array[0];
    newObj.familyName = array[1];
    newObj.title = array[2];
    newObj.payPerHour = array[3];
    newObj.timeInEvents = [];
    newObj.timeOutEvents = [];
    return newObj
}

function createEmployeeRecords(array){
    let newArrayOfObj = []
    array.forEach(element => {
        newArrayOfObj.push(createEmployeeRecord(element))
        // console.log(newObj)
    });
    // console.log(newArrayOfObj)
    return newArrayOfObj
}

function createTimeInEvent(employee, dateStamp){
    let hour = parseInt(dateStamp.slice(11,15));
    let date = dateStamp.slice(0,10);
    // build our timeIn object
    // add timeIn object to TimeInEvents array
    employee.timeInEvents.push({type: "TimeIn", hour: hour, date: date })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let hour = parseInt(dateStamp.slice(11,15));
    let date = dateStamp.slice(0,10);
    employee.timeOutEvents.push({type: "TimeOut", hour: hour, date: date })
    return employee
}

function hoursWorkedOnDate(employee, date){
   let timeIn = employee.timeInEvents.find(function(element){
   return element.date == date
    }).hour
    let timeOut = employee.timeOutEvents.find(function(element){
    return element.date == date
    }).hour
   return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employee, date){
    let payPerHour = employee.payPerHour
    let hoursWorked = hoursWorkedOnDate(employee, date)
    return payPerHour * hoursWorked
}

function allWagesFor(employee){
    let dates = []
    let wages = 0
    employee.timeInEvents.forEach(function(timeObj) {
        dates.push(timeObj.date)
    })
    dates.forEach(function(day){
      wages += wagesEarnedOnDate(employee, day)
    //   console.log(day)
    //   console.log(wages)
    })
    return wages
}

function findEmployeeByFirstName(array, firstName){
    
let object = array.find(function(employee){
 return employee.firstName = firstName
 })
 return object
}

function calculatePayroll(array){
    let wages = []
    array.forEach(function(employee){
        wages.push(allWagesFor(employee))
    })
    let total = wages.reduce(function(sum, num) { 
        return sum + num; 
    })
    return total
}
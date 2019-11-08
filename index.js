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

// function createEmployeeRecords(employeesInfoArray) {
//   let employeesArray = employeesInfoArray.map(function(employee) {
//     createEmployeeRecord(employee);
//   });
//   return employeesArray;
// }

function createEmployeeRecords(employeesInfoArray) {
  let employeesArray = [];
  employeesInfoArray.forEach(function(employee) {
    employeesArray.push(createEmployeeRecord(employee));
  });
  return employeesArray;
}

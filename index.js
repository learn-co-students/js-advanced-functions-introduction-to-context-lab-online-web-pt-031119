const createEmployeeRecord = (dataArray) => {
    let employeeRecord = {
        firstName: dataArray[0],
        familyName: dataArray[1],
        title: dataArray[2],
        payPerHour: dataArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord 
}

const createEmployeeRecords = (dataArray) => {
    return dataArray.map(function(element) {
        return createEmployeeRecord(element)
    })
}

const createTimeInEvent = (recordObj, dateTime) => {     
    const array = dateTime.split(' ')
    let date = array[0]
    let hour = parseInt(array[1], 10)
    
    const timeEvent = {
        type: "TimeIn",
        hour: hour,
        date: date 
    }
    recordObj.timeInEvents.push(timeEvent)
    return recordObj  
}

const createTimeOutEvent = (recordObj, dateTime) => {
    const array = dateTime.split(' ')
    let date = array[0]
    let hour = parseInt(array[1], 10)
    
    const timeEvent = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    recordObj.timeOutEvents.push(timeEvent)   
    return recordObj 
}

const hoursWorkedOnDate = (recordObj, dateArg) => {
    let timeIn = getHour(recordObj.timeInEvents, dateArg)
    let timeOut = getHour(recordObj.timeOutEvents, dateArg)
    const hoursWorked = (timeOut - timeIn) / 100 
    return hoursWorked 
}

const getHour = (timeEvent, dateArg) => {
    for (const element of timeEvent) {
        if (dateArg === element.date) {
            return element.hour 
        }
    }
}

const wagesEarnedOnDate = (recordObj, dateArg) => {
    let hoursWorked = hoursWorkedOnDate(recordObj, dateArg)
    let payOwed = hoursWorked * recordObj.payPerHour
    return payOwed 
}

const allWagesFor = (recordObj) => {
    const dates = recordObj.timeInEvents.map(element => element.date)
    const allWages = dates.reduce(function(memo, element) {return memo + wagesEarnedOnDate(recordObj, element)}, 0)
    return allWages 
}

const findEmployeeByFirstName = (recordsArray, firstName) => {
    for (const element of recordsArray) {
       return firstName === element.firstName ? element : undefined  
    }
}      

const calculatePayroll = (recordsArray) => {
    return recordsArray.reduce(function(memo, element) {
        return memo + allWagesFor(element)
    }, 0)     
}



     


 








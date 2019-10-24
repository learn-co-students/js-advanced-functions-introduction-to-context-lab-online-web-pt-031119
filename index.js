function createEmployeeRecord(empData) {
    return {
        firstName: empData[0],
        familyName: empData[1],
        title: empData[2],
        payPerHour: empData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(empsData) {
    return empsData.map(createEmployeeRecord)
}

function createTimeInEvent(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    empRecord.timeInEvents.push(
        {
            type: 'TimeIn',
            hour: parseInt(hour, 10),
            date: date 
        }
    )
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    }
    empRecord.timeOutEvents.push(timeOutEvent)
    return empRecord
}

function hoursWorkedOnDate(empRecord, date) {
    const timeIn = empRecord.timeInEvents.find((event) => event.date === date).hour
    const timeOut = empRecord.timeOutEvents.find((event) => event.date === date).hour
    return (timeOut - timeIn) * .01
}

function wagesEarnedOnDate(empRecord, date) {
    return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour
}

function allWagesFor (empRecord) { 
    const dates = empRecord.timeInEvents.map((timeInEvent) => timeInEvent.date)
    return dates.reduce((allWages, date) => {
        return allWages + wagesEarnedOnDate(empRecord, date)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(empRecord => firstName === empRecord.firstName)
}

function calculatePayroll(empRecords) {
    return empRecords.reduce((totalPayroll, empRecord) => {
        return totalPayroll + allWagesFor(empRecord)
    }, 0)
}
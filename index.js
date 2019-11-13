function createEmployeeRecord(info) {
	const employee = {
		firstName: info[0],
		familyName: info[1],
		title: info[2],
		payPerHour: info[3],
		timeInEvents: [],
		timeOutEvents: []
	}
	return employee
}

// This arrow function syntax works also:
// function createEmployeeRecords(info) {
// 	let records = info.map(e => createEmployeeRecord(e))
// 	return records
// }

function createEmployeeRecords(info) {
	let records = info.map(function(e) {
		return createEmployeeRecord(e)
	})
	return records	
}

function createTimeInEvent(record, date) {
	let timeIn = {
		type: "TimeIn",
		date: date.substr(0, 10),
		hour: parseInt(date.substr(-4, 4), 10)
	}
	record['timeInEvents'].push(timeIn)
	return record
}

function createTimeOutEvent(record, date) {
	let timeOut = {
		type: "TimeOut",
		date: date.substr(0, 10),
		hour: parseInt(date.substr(-4, 4), 10)
	}
	record['timeOutEvents'].push(timeOut)
	return record
}

function hoursWorkedOnDate(record, date) {

	let date_timeOut = record['timeOutEvents'].find(function(element) {
		return element['date'] === date
	})

	let date_timeIn = record['timeInEvents'].find(function(element) {
		return element['date'] === date
	})
	return (date_timeOut.hour - date_timeIn.hour)/100
}

function wagesEarnedOnDate(record, date) {
	return hoursWorkedOnDate(record, date) * record['payPerHour']
}

function allWagesFor(record) {
	let dates_worked = record.timeInEvents.map(function(event) {
		return event.date
	})
	let wages_owed = dates_worked.reduce(function(total, d) {
		return total + wagesEarnedOnDate(record, d)
	}, 0)
	return wages_owed
}

function findEmployeeByFirstName(srcArray, firstName) {
	let employee = srcArray.find(function(element) {
		return element['firstName'] === firstName
	})
	return employee
}

function calculatePayroll(employees) {
	let wages = employees.reduce(function(total, employee) {
		debugger
		return total + allWagesFor(employee)
	}, 0)
	return wages
}
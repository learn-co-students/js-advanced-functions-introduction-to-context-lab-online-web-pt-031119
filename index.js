//import { createSecureContext } from "tls";

// Your code here

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]





const createEmployeeRecord = (arg) => {
  return {
      firstName: arg[0],
      familyName: arg[1],
      title: arg[2],
      payPerHour: arg[3],
      timeInEvents: [],
      timeOutEvents: []
  }
}

const createEmployeeRecords = (array) => {
    return array.map(name => createEmployeeRecord(name))
}

const createTimeInEvent = (rec, time) => {
  let details = time.split(" ")
  rec.timeInEvents.push({type: "TimeIn", hour: parseInt(details[1], 10), date: details[0] })
  return rec
}

const createTimeOutEvent = (rec, time) => {
    let details = time.split(" ")
    rec.timeOutEvents.push({type: "TimeOut", hour: parseInt(details[1], 10), date: details[0] })
    return rec
  }


const hoursWorkedOnDate = (employee, date) => {
  let inTime = employee.timeInEvents.find((event) => event.date === date)
  let outTime = employee.timeOutEvents.find((event) => event.date === date)
  return (outTime.hour - inTime.hour)/100
}


const  wagesEarnedOnDate = (rec, date) => {
    const hoursWorked = hoursWorkedOnDate(rec,date)
    return hoursWorked * rec.payPerHour
}

const allWagesFor= (rec) => {
 let datesWorked = rec.timeOutEvents.map( dates => dates.date) ;
 let hoursWorked = datesWorked.map(date => hoursWorkedOnDate(rec,date));
  let totHours = hoursWorked.reduce((total,amount)=> total + amount)
   return totHours * rec.payPerHour
}


const calculatePayroll = (rec) => {
    let wages = rec.map((emp => allWagesFor(emp)))
    let totwage = wages.reduce((total,amount) => total + amount)
    return totwage
}




const findEmployeeByFirstName = (src_rec,firstname) => {
  
  return src_rec.find(rec => rec.firstName === firstname)
  
}
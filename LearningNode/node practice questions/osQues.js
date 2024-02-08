const os = require('os');

//get os name
let getOsName = () => {
    return os.type();
}

//get free memory percentage
let getFreeMemoryPercentage = () => {
    let freemem = os.freemem();
    let totalmem = os.totalmem();
    return Math.floor((freemem / totalmem) * 100);
}

//get system uptime in mins
let getUpTime = () => {
    let uptime = os.uptime();
    return Math.round(uptime / 60);
}

console.log(getOsName());
console.log(getFreeMemoryPercentage());
console.log(getUpTime());
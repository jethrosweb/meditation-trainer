// Elements
const websiteBtn = document.getElementById("websiteBtn")
const instructions = document.getElementById("instructions")
const breathLog = document.getElementById("breathLog")
const stats = document.getElementById("stats")

// Variables
let breathStartTime = ""
let allBreaths = []
let count = 0

// Button flow
websiteBtn.addEventListener("click", function() {
    if (websiteBtn.innerText === "START INHALE") {
        startInhale()
    } else if (websiteBtn.innerText === "FINISHED INHALING") {
        finishedInhale()
    } else if (websiteBtn.innerText === "START EXHALE") {
        startExhale()
    } else if (websiteBtn.innerText === "FINISHED EXHALING") {
        finishedExhale()
    }
})

// Button events
function startInhale() {
    websiteBtn.innerText = "FINISHED INHALING"
    websiteBtn.style.backgroundColor = "red"
    websiteBtn.style.fontFamily = "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif"
   
    instructions.innerHTML = `
    <h4>INSTRUCTIONS</h4>
    <div>Slowly breath in through your nose</div>`
    breathStartTime = Date.now()
}

function finishedInhale() {
    websiteBtn.innerText = "START EXHALE"
    websiteBtn.style.backgroundColor = "green"
    websiteBtn.style.fontFamily = "Courier New, Courier, monospace"
   
    instructions.innerHTML = `
    <h4>INSTRUCTIONS</h4>
    <div>Click to begin exhale</div>`
}

function startExhale() {
    websiteBtn.innerText = "FINISHED EXHALING"
    websiteBtn.style.backgroundColor = "red"
    websiteBtn.style.fontFamily = "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif"
   
    instructions.innerHTML = `
    <h4>INSTRUCTIONS</h4>
    <div>Slowly breath out through your mouth</div>`
}

function finishedExhale() {
    websiteBtn.innerText = "START INHALE" 
    websiteBtn.style.backgroundColor = "green" 
    websiteBtn.style.fontFamily = "Courier New, Courier, monospace"

    instructions.innerHTML = `
    <h4>INSTRUCTIONS</h4>
    <div>Click to start next breath</div>`

    let breathEndTime = Date.now()
    let breathTime = Math.floor((breathEndTime - breathStartTime) / 1000)
    breathLog.innerHTML += `<div>${breathTime}sec</div>`
    allBreaths.push(breathTime)

    count += 1
    
    stats.innerHTML = `
    <h4>STATS</h4>
    <div>Mean ${mean(allBreaths)}</div>
    <div>Median ${median(allBreaths)}</div>
    <div>Mode ${mode(allBreaths)}</div>
    <div>Std. Dev. ${stdDeviation(allBreaths)}</div>
    <div>Total breaths ${count}
    `   
}

// Mean stat
function mean(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];   
    }    
    let mean = sum/arr.length;
    return mean.toFixed(2)
}

// Median stat
function median(arr) {
    arr = arr.sort((a,b) => a - b)
    if (arr.length % 2 !== 0) {
        return arr[Math.floor(arr.length / 2)]
    } else {
        let mid1 = arr[arr.length / 2]
        let mid2 = arr[arr.length / 2 - 1]
        return (mid1 + mid2) / 2
    }
}

// Mode stat
function mode(arr) {
    const frequencyTable = {}
    arr.forEach(number => {
        if(!frequencyTable[number]) {
            frequencyTable[number] = 1
        } else {
            frequencyTable[number] += 1
        }
    })

    let highestValue = 0
    let highestValueKey = -Infinity

    for(let key in frequencyTable) {
        const value = frequencyTable[key]
        if (value >= highestValue && Number(key) > highestValueKey) {
            highestValue = value
            highestValueKey = key
        }
    }
    return highestValueKey
}

// Standard deviation stat
function stdDeviation(arr) {
    let arrayAverage = arr => arr.reduce((sum, x) => x + sum, 0) / arr.length

    let averageBreaths = arrayAverage(arr)
    let differences = arr.map(x => x - averageBreaths).map(x => x * x)
    
    let averageDifference = arrayAverage(differences)
    
    let stdDeviation = Math.sqrt(averageDifference)
    return stdDeviation.toFixed(2)
}

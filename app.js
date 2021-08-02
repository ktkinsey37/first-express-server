const express = require('express');
const ExpressError = require('./express-routing-solution/expressError');
const realNums = []

const app = express();

app.use(express.json());

app.get('/mean', (req, res) => {
    let nums = req.query['nums'].split(',');
    let verification = verifyNums(nums)
    if (verification['result']){
        let total = 0;
        for (let i in nums) {
            nums[i] = parseInt(nums[i])
            total += nums[i]
        }
        let avg = total/nums.length
        // console.log('NUMS VERIFIED', avg)
        // // SEEMS TO WORK?
    } else {
        error = verifyNums(nums)
        throw new ExpressError(`Numbers not verified: ${error['offendor']}`, 400)
        console.log('NUMS NOT VERIFIED', error['offendor'])
    }
    jsonResponse = {'response': {'operation': 'mean', 'value': avg}}
    res.send(jsonResponse)
})
 
app.get('/median', (req, res) => {
    let nums = req.query['nums'].split(',');
    let median;
    let verification = verifyNums(nums)
    if (verification['result']){
            nums = nums.sort(function(a, b){return a-b});
        if (nums.length % 2 == 0) {
            midpoint = (nums.length/2)-1;
            let firstInt = parseFloat(nums[midpoint]);
            let secondInt = parseFloat(nums[midpoint + 1]);
            let addedInts = firstInt + secondInt;
            median = parseFloat((firstInt + secondInt)/2);
        } else {
            median = nums[((nums.length+1)/2)-1];
        }
        console.log(median);
        jsonResponse = {'response': {'operation': 'median', 'value': median}}
        res.send(jsonResponse)
        }
})

app.get('/mode', (req, res) => {
    const nums = req.query['nums'].split(',');
    let output = {};
    for (let i in nums){
        if (output[nums[i]] == undefined) {
            output[nums[i]] = 0;
        } else {
            output[nums[i]] = output[nums[i]] + 1;
        
        }
        
    } 
    output = assessModeObj(output)
    console.log(output, "THIS IS MODEOUTPUIT")
    jsonResponse = {'response': {'operation': 'mode', 'value': output}}
    res.send(jsonResponse)
})

function assessModeObj(mode){
    let currentMode = [];
    let currentModeFreq = 0;
    for(let prop in mode){
        if (mode[prop] >= currentModeFreq){
            currentModeFreq = mode[prop]
    }
    retVal = getKeyByValue(mode, currentModeFreq)
    console.log(retVal, "THIS IS OUTPUT")
    return retVal
}}

function getKeyByValue(object, value) {
    const keys = Object.keys(object)
    let output = []
    for (key in object){
        if (object[key] == value){
            output.push(key)
        } 
    }
    return output;
  }

function verifyNums(nums){
    const response = {'result': true,'offendor': []}
    if (!nums){
        throw new ExpressError(`No numbers provided`, 400)
    }
    for (let i in nums){
        if (Number.isNaN(parseInt(nums[i]))){
            response['result'] = false
            response['offendor'].push(nums[i])
            continue
        }
        else if (typeof parseInt(nums[i]) == "number") {
            continue
        }
        }
        return response
    }

app.use((error, req, res, next) => {
    res.status(error.status).send(error.msg)
})

app.listen(3000, () => {
    console.log("App running on port 3000")
})
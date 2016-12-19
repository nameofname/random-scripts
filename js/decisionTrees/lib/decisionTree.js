"use strict";


const buildAttributeMap = require('./buildAttributeMap');
const syncQuery = require('./syncQuery');
const getMockData = async () => {
    const data = await syncQuery('select * from dibssellers where dibs_V_status="active";');
    return data;
};


const decisionTree = async () => {
    const trainingData = await getMockData();
    console.log('get training data', trainingData)
};

module.exports = decisionTree;

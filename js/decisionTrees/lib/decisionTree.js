"use strict";


const buildAttributeMap = require('./buildAttributeMap');
const asyncQuery = require('./asyncQuery');
const getMockData = async () => {
    const data = await asyncQuery('select * from dibssellers where dibs_V_status="active";');
    return data;
};


const decisionTree = async () => {
    const trainingData = await getMockData();

    const attributeMap = await buildAttributeMap('dibssellers', trainingData);
    console.log('attributeMap', attributeMap)

};

module.exports = decisionTree;

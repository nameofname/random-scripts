"use strict";


// TODO !!! Using dibs_V_pay_skip for testing purposes:
// TODO !!! Using dibssellers for testing purposes:
// TODO !!! Arbitrarily querying for dibs_V_status of active for training data

const asyncQuery = require('./asyncQuery');
const testClassificationAttribute = 'dibs_V_pay_skip';
const testTableName = 'dibssellers';


module.exports = async () => {
    const trainingData = await asyncQuery('select * from dibssellers where dibs_V_status="active";');
    const attributes = await asyncQuery(`SHOW COLUMNS FROM ${testTableName}`);
    return {
        trainingData,
        attributes,
        classificationAttribute : testClassificationAttribute
    };
};

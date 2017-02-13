"use strict";


const calculateQuotients = require('../src/calculateQuotients');
const timer = require('./timer');


const findQuotiens = () => {
    const quotients = calculateQuotients(13, 50);
    console.log(quotients.length);
};

timer(findQuotiens);

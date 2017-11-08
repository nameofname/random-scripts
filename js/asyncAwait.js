"use strict";

const go = async () => (new Promise(resolve => resolve('ronald did this')));

const der = async () => {
    const res = await go();
    console.log(res);
};


der();

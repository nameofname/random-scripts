"use strict";

const graph = require('./graph');
const data = require('./__data.json');    

document.addEventListener("DOMContentLoaded", function(event) { 
    graph(data);
});

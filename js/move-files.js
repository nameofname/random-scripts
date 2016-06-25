var fs = require('fs');

// now rename everything inside of test and move into a receipts dir
var currDir = process.cwd() + '/test';
var arr = fs.readdirSync(currDir);

fs.mkdirSync(process.cwd() + '/newDir');

arr.forEach(function (file) {
    fs.renameSync(currDir + '/' + file, process.cwd() + '/newDir/' + file);
        //fs.renameSync(currDir + '/' + file, currDir + '/test/' + file); 
}); 

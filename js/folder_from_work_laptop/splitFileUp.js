const fs = require('fs');
fs.readFile(process.cwd() + '/icons-16.svg', {encoding : 'UTF-8'}, (err, file) => {
    const arr = file.split('\n\n'); 
    arr.forEach((newFile, idx) => {
        const nameArr = /(id)="[^"]+"/.exec(newFile);
        const name = nameArr ? nameArr[0].split('"')[1] + '.svg' : idx + '.svg';
        const path = process.cwd() + '/src/' + name;
        console.log(path)
        fs.writeFileSync(process.cwd() + '/src/' + name, newFile);
    });
});

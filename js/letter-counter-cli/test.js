import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const { stdin } = process;
// this does the same as readline.creteInterface, but it doesn't work as expected
// stdin.resume();
// stdin.setRawMode( true );
// stdin.setEncoding( 'utf8' );


// setTimeout(() => {
//     // rl.write(null, { ctrl: true, name: 'k'})
//     process.stdout.write('\u001B[2J\u001B[0;0f');
//     rl.setPrompt('asdfasdf asd ');
//     rl.prompt();
// }, 2000)


// process.stdout.write('\u001B[2J\u001B[0;0f');
let stack = [];
stdin.on('keypress', (s, key) => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    // console.log('ronaldy 1', s)
    console.log('ronaldy 2', key)
    if (key.name === 'backspace') {
        stack.pop();
    } else {
        stack.push(key.name);
    }

    rl.write(`boop diddily \n ${stack.join('')}`);
    // console.log('ronaldy 1', s)
    // rl.write(stack.join(''));

    // stack.push(key.sequence) // TODO ! 
    // if (key.ctrl && key.name == 'l') {
    //     process.stdout.write('\u001B[2J\u001B[0;0f');
    // }
});




// rl.on('line', (input) => {
//     console.log(`Received: ${input}`);
// });

// rl.question('what up?', ans => {
//     rl.close();
//     rl.write(`youre a bitch: ${ans}`);
// });



// import yargs from 'yargs';

// const args = yargs(process.argv.slice(2))
//     .option('n', {
//         alias: 'numbered',
//         describe: 'use numbered file names',
//         type: 'boolean'
//     })
//     .argv
// ;

// const readline = require('readline');

// function askQuestion(query) {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });

//     return new Promise(resolve => rl.question(query, ans => {
//         rl.close();
//         resolve(ans);
//     }))
// }

// const ans = await askQuestion("Are you sure you want to deploy to PRODUCTION? ");
// console.log(ans);
// try {
//     const ans = await askQuestion("Are you sure you want to deploy to PRODUCTION? ");
//     console.log(ans);
// } catch (e) {
//     console.log('boo');
// }

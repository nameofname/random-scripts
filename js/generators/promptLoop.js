function* repl() {
  let input = yield 'enter command';
  while (input !== 'quit') {
    const output = (input || 'no input provided').toUpperCase();
    input = yield output; // next input comes from .next(value)
  }
  return 'bye';
}

const it = repl();
console.log(it.next().value);          // "enter command"
console.log(it.next().value);          // "enter command"
console.log(it.next('hello').value);   // "HELLO"
console.log(it.next('quit'));          // { value: 'bye', done: true }

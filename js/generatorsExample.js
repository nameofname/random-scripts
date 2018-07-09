function* plusTenOnce(num) {
    yield num + 10;
}

const gen3 = plusTenOnce(3);
console.log(gen3.next().value); // 13
console.log(gen3.next().value); // undefined (because it's done)

function* plusTen(num) {
  // it works because the context of the generated function is maintained
  let int = num;
  let count = 0;
  while (count < 3) {
    int += 10;
    ++count;
    yield int;
  }
}

const gen4 = plusTen(4);
console.log(gen4.next().value); // 14
console.log(gen4.next().value); // 24
console.log(gen4.next().value); // 34
console.log(gen4.next().value); // DONE

const gen5 = plusTen(5);
const gen5x = plusTen(5);
console.log(gen5.next().value); // 15
console.log(gen5x.next().value); // 15
console.log(gen5.next().value); // 25
console.log(gen5x.next().value); // 25
console.log(gen5.next().value); // 35
console.log(gen5x.next().value); // 35
console.log(gen5.next().value); // DONE
console.log(gen5x.next().value); // DONE

// Write code below
// hey

function canCreateNote(magazine, note) {
  function getMap(s) {
    const m = new Map();
    for (let letter of s) {
      m.set(letter, (m.get(letter) || 0) + 1);
    }
    return m;
  }
  const magMap = getMap(magazine);
  const noteMap = getMap(note);

  for (let tup of noteMap) {
    const val = magMap.get(tup[0]);
    if (val === undefined || val < tup[1]) {
      return false;
    }
  }
  return true;
}


console.log(canCreateNote('adsff', 'f'));
console.log(canCreateNote('adsff', 'fx'));

// inputArray = [1, 6, 9 , 3, 2, 0, 8, 4] ; 
const userData = {
    name: 'Kramer',
    pets: ['dog', 'cat'],
    bestFriend: {
        name: 'Costanza'
    },
    enemy: {
        name: 'Newman',
        enemy: {
            name: 'Seinfeld'
        }
    }
};

const get = (obj, path) => {
   const getArr = path.split('.');
   return getArr.reduce((thing, currStr) => {
       if (thing) {
           return thing[currStr] || null;
       }
       return thing;
   }, obj);
};

console.log('1: ', get(userData, 'enemy.enemy.name')); // 'SeinFeld';
console.log('2: ', get(userData, 'enemy.friend.name')); // null
console.log('3: ', get(userData, 'pets.0')); // 'dog';

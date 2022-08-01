// https://stackoverflow.com/questions/73186319/how-to-filter-and-then-aggregate-results-in-pure-javascript/73186796#73186796

const animals = [
    { id: 1, name: "cat", group: "four legs" },
    { id: 2, name: "dog", group: "four legs" },
    { id: 3, name: "bird", group: "two legs" },
    { id: 4, name: "fish", group: "no legs" },
    { id: 5, name: "ants", group: "six legs" },
    { id: 6, name: "monkey", group: "two legs" },
    { id: 7, name: "horse", group: "four legs" },
    { id: 8, name: "spiders", group: "eight legs" },
    { id: 9, name: "catepillar", group: "many legs" },
  ];
  const animalsVisits = [
    { id: 1, visits: 70 },
    { id: 2, visits: 70 },
    { id: 3, visits: 50 },
    { id: 4, visits: 50 },
    { id: 5, visits: 90 },
    { id: 6, visits: 50 },
    { id: 7, visits: 70 },
    { id: 8, visits: 100 },
    { id: 9, visits: 110 },
  ];
const topVisited = (limit) => {
    const v = animalsVisits
        .slice() //shallow copy
        .map(o => Object.assign(o, {group: animals.find((animal) => animal.id === o.id).group})) //mapped with group from animals array
        .reduce((a, c) => {
            if (a.has(c.group)) a.get(c.group).visits += c.visits;
            else a.set(c.group, c);
            return a;
        }, new Map());

    return Array.from(v.values())
        .sort((a, b) => b.visits - a.visits) //sorting in desending order
        .slice(0, limit) // cut how many top limit
        .map(o => o.group)
        .join(", "); 
}

  const topVisited_Bak = (limit) =>
    animalsVisits
      .slice() //shallow copy
      .sort((a, b) => b.visits - a.visits) //sorting in desending order
      .slice(0, limit) // cut how many top limit
      .map(({ id }) => animals.find((animal) => animal.id === id).group) //mapped with group from animals array
      .join(", ");
  
console.log(topVisited(3))
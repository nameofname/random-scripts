// https://stackoverflow.com/questions/73186319/how-to-filter-and-then-aggregate-results-in-pure-javascript/73186796#73186796

function mostVisits(animals, visits, topN) {
    const groups = new Map();
    
    for (let i = 0; i < animals.length; i++) {
        const group = animals[i].group;
        if (!groups.has(group)) groups.set(group, visits[i].visits);
        else groups.set(group, groups.get(group) + visits[i].visits);
    }

    return Array.from(groups).sort((a, b) => a[1] - b[1]).slice(-1 * topN);
}

function mostVisits_bak1(animals, visits, topN) {
    const groups = new Map();
    const animalLookup = new Map();

    for (let i = 0; i < animals.length; i++) {
        animalLookup.set(animals[i].id, animals[i])
    }
    console.log(animalLookup)

    for (let j = 0; j < visits.length; j++) {
        console.log(visits[j], animalLookup.get(visits[j].id))
        const group = animalLookup.get(visits[j].id).group;
        if (!groups.has(group)) groups.set(group, visits[j].visits);
        else groups.set(group, groups.get(group) + visits[j].visits);
    }

    return Array.from(groups).sort((a, b) => a[1] - b[1]).slice(-1 * topN);
}

function mostVisits_bak(animals, visits) {
    let maxGroup = animals[0].group;
    const groupToVisits = new Map();
    const animalLookup = animals.reduce((a, c) => {
        return a.set(c.id, c);
    }, new Map());

    for (let i = 0; i < visits.length; i++) {
        const id = visits[i].id;
        if (groupToVisits.has(animals[i].group)) {
            groupToVisits.set(animalLookup.get(id).group, groupToVisits.get(animalLookup.get(id).group) + visits[i].visits)
        } else {
            groupToVisits.set(animalLookup.get(id).group, visits[i].visits)
        }
        if (groupToVisits.get(animals[i].group) > groupToVisits.get(maxGroup)) maxGroup = animals[i].group;
    }

    // console.log(groupToVisits)
    // return maxGroup;
    return groupToVisits;
}

const Animal= [
    { id: 1, name: "cat", group: "four legs"},
    { id: 2, name: "dog", group: "four legs"},
    { id: 3, name: "bird", group: "two legs"},
    { id: 4, name: "fish", group: "no legs"},
    { id: 5, name: "ants", group: "six legs"},
    { id: 6, name: "monkey", group: "two legs"},
    { id: 7, name: "horse", group: "four legs"},
    { id: 8, name: "spiders", group: "eight legs"},  
    { id: 9, name: "catepillar", group: "many legs"},  
    { id: 10, name: "dsafsd", group: "two legs"},  
];
const AnimalVisits= [
    { id: 1, visits: 40 },
    { id: 2, visits: 30 },
    { id: 3, visits: 50 }, 
    { id: 4, visits: 100 },
    { id: 5, visits: 90 },
    { id: 6, visits: 110 },
    { id: 7, visits: 20 },
    { id: 8, visits: 165 },
    { id: 9, visits: 1000 },
    { id: 10, visits: 1000 },
];

console.log(mostVisits(Animal, AnimalVisits, 3));

module.exports = () => mostVisits(Animal, AnimalVisits);
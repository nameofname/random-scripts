const data = [{name: "New York", abbr: "NY"}, {name: "New Jersey", abbr: "NJ"}]

function combine(objArr) {
    return objArr.reduce((a, c) => Object.assign(a, {
        [c.abbr] : c.name
    }), {});
}

console.log(combine(data));
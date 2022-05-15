const data = [{name: "New York", abbr: "NY"}, {name: "New Jersey", abbr: "NJ"}]

// this is Rob R.'s problem... I think it's supposed to be a little bit more difficult and i'm missing something here.
function combine(objArr) {
    return objArr.reduce((a, c) => Object.assign(a, {
        [c.abbr] : c.name
    }), {});
}

console.log(combine(data));
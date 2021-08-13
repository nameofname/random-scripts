/**
 * Part 1: Write a middleware function to take the result of an api and modify 
 * it so we can easily make a table out of it on the FE.  Table headers should
 * start with "Name" and be followed by all location data.  If location data is
 * nested, flatten out the data and column title should nested keys combined 
 * with "-".  example: street-name
 * 
 * Return signature
 *  {
 *    headers: [],
 *    userData: [],
 *  }
 * 
 * Sample Table
 *  Name      |  street-number  |  street-name  |  city      |  state  |  country      |  postcode
 *  Aidan Lee    9187              Domain road     Tauranga     Tasman    New Zealand     52052
 *  ... next user
 */



// API signature
const apiData = {
    results: [
    {
        name: {
            first: "Aidan",
            last: "Lee",
        },
        location: {
            street: {
                number: 9187,
                name: "Domain Road",
            },
            city: "Tauranga",
            state: "Tasman",
            country: "New Zealand",
            postcode: 52052,
        },
    },
    // {
    //   another user
    // }
    ],
};

// 1:30 - 1:46
function generateTableData(data) {
    const headers = [];

    function _flatten(obj, curr = {}, prefix = []) {
        for (bla in obj) {
            const compoundKey = [...prefix, bla];
            if (typeof obj[bla] === 'object') {
                _flatten(obj[bla], curr, compoundKey);
            } else {
                const key = compoundKey.join('-');
                curr[key] = obj[bla];
                headers.push(key);
            }
        }
        return curr;
    }

    const userData = (data?.results || [])
        .map(o => _flatten(o));

    return { headers, userData };
}

console.log(generateTableData(apiData));
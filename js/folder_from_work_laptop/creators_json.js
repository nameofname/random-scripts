// JSON contracts for creators stuffs: 


// CREATOR
// General CRUD endpoint for creators: 

{
    cid : 123, 
    hasPage : true, 
    status : 'PENDING', 
    url_tag : 'charles-eames'
}


// CREATOR <-> NAMES
// Add names to creator: 
// - creator names is a 1 to many relationship. 
// - Each name is identified by a string, name, and a type

{
    cid : 123, 
    names : [
        {
            type : 'first_name', 
            name : 'Charles'
        }, 
        {
            type : 'last_name', 
            name : 'Eames'
        }
    ]
}

// ITEM <-> CREATOR
// Associate a new creator to an item: 
// - An item can have many creators distinguished by his/her attributon, and: 
// - many possible Roles. 
// - Creators will be added one at a time to an item using the following contract
// - To remove the reference we can pass the same contract, with NULL roles and attribution 
// - QUESTION: To better conform to RESTful standards, could we use an HTTP DELETE instead of passing null? 
{
    iid : 123, 
    cid : 456, 
    attribution : 'BYDOC', 
    roles: [
        'creator', 
        'manufacturer' 
    ]
}
// example of removing an item-creator relationship: 
{
    iid : 123, 
    cid : 456, 
    attribution : NULL, 
    roles: NULL
}

// NAME_TYPES
// Get name types: 
// - a read only endpoint to tell the front end what all the name types that can be set are: 
// I think this should be a simple array of names, but I haven't thought this all the way through. 
{
    name_types : [
        'first_name', 
        'last_name', 
        'middle_name', 
        'company_name', 
        'confirmation_name', 
        'nick_name', 
        'spouse_name' 
    ]
}

// CREATOR <-> ITEMS
// Given a CID (creator id) get all items associated to that creator
// This has not yet been discussed, but I would think it should look like this: 
{
    cid : 456, 
    items : [
        {
            iid : 123, 
            attribution : 'ATTRIBUTED', 
            roles: [
                'creator', 
                'manufacturer' 
            ]
        }, 
        {
            iid : 456, 
            attribution : 'BYDOC', 
            roles: [
                'artist', 
                'manufacturer' 
            ]
        }
    ] 
}

/* Other things that have to be hammered out: 
 * 
 * 1. Items can now have many creators. How should creators be referenced on the items JSON?
 *     - Perhaps just an array of CIDs? 
 * 2. Can we add the names to the creators_all endpoint? 
 *     - If not, we will have to do 2 thousand ajax requests to get all of the creator names over the wire. 
 *     - This is a read only endpoint, so we would not have to worry about saving back in this format. 
 * 3. From the front end, when a curator re-assigns a creator (ie. they reject a pending creator, or delete an existing creator, then re-assign all the items that use that creator)...
 *     - How will this be done? The front end does not have a list of items belonging to that creator. 
 *     - There should be an endpoint to GET items by creator (only need read access for now)
 *     - Based on that, we can use the ITEM-CREATOR endpoint to delete each.  
*/

/* Additional notes for front end: 
 * 1. The process to add a new creator (from the creators curation page) will have to be done in 2 steps: 
 *     - Add a new creator, pass "has-page" and "status" 
 *     - Get back the CID. 
 *     - Using that CID, ajaxify to the CREATOR <-> NAMES endpoint. 
 * 2. The process to add a new creator (from the dealer item upload page) will also have to be done in 2 steps: 
 *     - Add a new creator, get CID
 *     - Add name passing type as special status
 * 
*/



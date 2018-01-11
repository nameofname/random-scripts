// JSON contracts for creators stuffs: 
////////////////////////////////////////////////////////////////////////////////////////

// CREATOR
// General CRUD endpoint for creators: 
{
    cid : 123, 
    hasPage : true, 
    status : 'PENDING', 
    url_tag : 'charles-eames'
    display_name : 'charles-eames'
    sort_name : 'eames-charles'
}

// ITEM
// General CRUD endpoint for items already exists, and it has almost 200 fields, so I am not going to list it here.  

// ITEM-CREATOR-RELATIONSHIP 
// - An item can have many creators distinguished by his/her attributon, and: 
// - many possible Roles associated with each creator (creator could be designer and manufacturer, etc.)  
// Creators will be added to items 1 at a time by dealers. 
// The curation team will have the ability to dis-associated creators from items, or change their associations. 
// NOTE: In general, a CRUD endpoint will represent one item that is identified by a unique ID, in this case, 
// the relationship is stored in 2 separate tables, and will therefore not have a unique identifyer when it comes over the wire. 
{
    cid : 456, 
    iid : 123, 
    attribution : 'BYDOC', 
    roles: [
        'creator', 
        'manufacturer' 
    ]
}
// To remove an item-creator relationship, pass the same JSON using an http DELETE 

// ITEM-CREATOR-RELATIONSHIPS (collection)
// TO BE BUILT BY FRONT END TEAM. 
// The following JSON represents a collection of creator item relationships. 
// The JSON for each relationship is the same as in the model above. 
// For now, this is a read-only endpoint, used for getting a collection of items by creator, or a collection of creators by item 
// Uses would include, get a list of creators by Item, passing IID as a GET param, 
// Or getting a list of items by creator, passing the CID as a GET param
[
    {
        cid : 123,
        iid : 456, 
        attribution : 'ATTRIBUTED', 
        roles: [
            'creator', 
            'manufacturer' 
        ]
    }, 
    {
        cid : 123,
        iid : 789,
        attribution : 'BYDOC', 
        roles: [
            'artist', 
            'manufacturer' 
        ]
    }
]

// Proposed endpoint for bulk update item - creator relationship. 
// In an ideal world, we would just use the above collection of relationships to update a list of relationships in bulk,
// However, this is a lot of information to pass over the wire. 
// Take the following use case, the curator team wants to delete a single creator name, and there are 20 items associated to that creator. 
// For example, suppose a creator name was a duplicate, or was spelled incorrectly and they just want to update ALL references in the 
// X-ref tables that point a list of items to 1 creator, 
// First, we would use the CREATOR endpoint, setting the status to "DELETED" - Then, the curator could choose a replacement for that 
// creator. How do we model this change? 
// James (I think rightly) proposed there be an endpoint that execute a simple update on both X-ref tables
// where CID=X. The client side would pass the following JSON: 
{
    deleted_cid : 123, 
    new_cid : 456, 
}


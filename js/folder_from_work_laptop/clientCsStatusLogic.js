//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 
//THIS IS DEPRECATED!!! NOW DONE ON THE SERVER SIDE! 


    /**
     * The following functions take the cs status, sets values on the model according to some logic, and do the reverse.
     * In our world, the cs status is set by taking into account the following variables:
     *      - cs_site_1stdibs <bool>
     *      - cs_listing <string> - either "new_and_cat" or "cat_only"
     *      - cs_site_dealer <bool>
     *      - cs_work_in_progress <bool>
     * The following object describes the relationship between cs status codes and the above counterparts.
     * Note: I simulate a bijection by stringifying the contents of each of the objects in the csStatusMap. This allows
     * me to look up the values associated with a certain status, AND read the status from a set of values.
     */
    csStatusMap : {
        '-1' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '0' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '1' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '2' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '4' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '5' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '9' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '11' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'Y',
            cs_work_in_progress : 'N'
        },
        '12' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '50' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '60' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '70' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '100' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        },
        '200' : {
            cs_site_1stdibs : 'N',
            cs_listing : 'new_and_cat',
            cs_site_dealer : 'N',
            cs_work_in_progress : 'N'
        }
    },
    // a little helper function to stringify the objects of the cs status map.  obviously you could use it other places,
    // but it's pretty specific to objects with 1 level (no nesting).
    stringifyObject : function(obj) {
        var str = '';
        for (var x in obj) {
            str += x;
            str += obj[x];
        }
        return str;
    },
    // boolean flag to indicate that the cs status map has been stringified for 2-way lookup.
    csStatusMapStringified : false,
    // This function takes the cs status and determines the value for each dependent on the code. Returns an object
    // to be used in the parse() function:
    separateCsStatus : function(csStatus) {
        var self = this;
        // do a lookup of the cs status from the csStatusMap and set the included fields based on the returned object:
        return self.csStatusMap[csStatus] ? self.csStatusMap[csStatus] : {};
    },
    // this function sets the csStatus based on user selections:
    setCsStatus : function() {
        var self = this;
        // if self.csStatusMapStringified is false, then we have not yet created 2-way lookup fields by stringifying
        // objects.  If this is the case, then do that now:
        if (!self.csStatusMapStringified) {
            for (var x in self.csStatusMap) {
                var str = self.stringifyObject(self.csStatusMap[x]);
                // fun fact, here as we loop iterate over this object we add to it, but JS is smart enough to only
                // iterate over those values that were present when we started this loop.
                self.csStatusMap[str] = x;
            }
            self.csStatusMapStringified = true;
        }
        var valueMap = {
            cs_site_1stdibs : this.get('cs_site_1stdibs'),
            cs_listing : this.get('cs_listing'),
            cs_site_dealer : this.get('cs_site_dealer'),
            cs_work_in_progress : this.get('cs_work_in_progress')
        };
        var objString = this.stringifyObject(valueMap);
        var result = self.csStatusMap[objString];
        if (result) {
            self.set('cs_status', result);
        }
    },

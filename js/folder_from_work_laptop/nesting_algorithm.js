var obj = response;

var lib = {};
lib.parents = {};
lib.ids = {};

for (var x in obj) {
    if (!lib[obj.parents[obj.pid]]) {
        lib[obj.parents[obj.pid]] = [];
    }
    if (!lib[obj.ids[obj.id]]) {
        lib[obj.ids[obj.id]] = [];
    }
    lib[obj.ids[obj.id]] = obj[x];
    lib[obj.parents[obj.pid]].push(obj[x]);
}

// find the one object with no parent ID:
var rents = _.keys(lib.parents);
var childs = _.keys(lib.ids);
var top = null;
for (var i=0; i<=childs.length; i++) {
    if (_.indexOf(rents, childs[i]) === -1) {
        top = childs[i];
    }
}

// starting with the top object, add a children array to the object, then for each in that array, do recurison to get children":

var result = nest_object(top);

function nest_object(obj) {
    var id = obj.id;
    obj.children = lib.parents[id];
    _.each(children, function(val, key){
        nest_object(val);
    });
}



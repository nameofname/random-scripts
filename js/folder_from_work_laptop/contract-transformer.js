/**
 * Created with JetBrains PhpStorm.
 * User: ronald
 * Date: 5/20/13
 * Time: 5:34 PM
 * To change this template use File | Settings | File Templates.
 */


/*
USAGE EXAMPLES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    var transformerMap = {
        id : "id",
        attribute1: "object.attriute1",
        attribute2: "object.attribute2",
    };

    -- OR --

    var transformerMap = function (json, action) {
        return {
            id: json.id,
            attribute: json.top1
        };
    };

    Create a new instance of contractTransformer and use it when instantiating the model:
    dibs.fakeModel = new dibs.FakeModel({id:123}, {transformer : new dibs.contractTransformer(transformerMap)});

    Important: This does not currently support transforming sub-collections. If you need to apply such a transformation
    you should use a custom function instead of a map.
 */

(function(){
    "use strict";


    /**
     * Transforms a JSON contract using a custom map passed in by the developer.
     * If mapOrFunction is a function, then invoke it passing the arguments 'json' and 'action'.
     *
     * IMPORTANT: This does not support transforming related models at this time. If you want to transform related
     * models then over-write the mapOrFunction with a function.
     *
     * If it is an object, it must be configured as a flat map of key value pairs in the format:
     *      {
         *          'clientAttribute' : 'serverAttribute',
         *          'client.nested.attribute' : 'server.nested.attribute',
         *          'attribute1' : 'server.nested.attribute1'
         *      }
     * In this representation, the left hand side of the map is the expected location on the client model of the
     * specified attribute, and the right hand side is the location of the attribute in the server side JSON
     * representation.
     *
     * Example: Using the mapping above, a JSON contract with the server that looks like this:
     *      {
         *          serverAttribute : 'value1',
         *          server : {
         *                      nested: {
         *                                  attribute : 'value2',
         *                                  attribute1 : 'value3'
         *                               }
         *                     }
         *       }
     *
     * ... will be transformed to look like this on the client:
     *      {
         *          clientAttribute : 'value1',
         *          attribute1 : 'value3',
         *          client : {
         *                      nested : {
         *                                  attribute : 'value2'
         *                                }
         *                    }
         *      }
     *
     * @param mapOrFunction
     * @returns {*}
     */
    dibs.contractTransformer = function(mapOrFunction) {

        /**
         *
         * @param map -- the map to be used in the transformation.
         * @returns {Function}
         * @private
         */
        this._transformContract = function(map) {

            /**
             * @param json <object> - the json object to be transformed
             * @param action <string> - 'fetch'|'save'
             * @returns {*}
             * @private
             */
            return function (json, action) {
                console.log('transformer!');
                var self = this,
                    output = {},

                // A map of objects created in the output already. This is an efficiency booster used to check whether or
                // not I have already created a particular object under the output object. If I have then I don't need to
                // try to do so again which could reduce big O by well over half.
                    objectsCreated = {};

                // Loop over the map, for each attribute mapping specified
                _.each(map, function(val, key){
                    // The source destination attributes are toggled based on the "action" string
                    var srcAttribute = (action === 'read') ? val : key,
                        dstAttribute = (action === 'read') ? key : val,

                    // Split the string assuming dot notation to represent levels in the object:
                        dstArray = dstAttribute.split('.'),
                    // Find the last string, the actual attribute trying to be created.
                        targetAttribute = dstArray[dstArray.length-1],
                        assignTo = null,
                    // Find the current value from the json:
                        currentValue = checkForValue(json, srcAttribute.split('.'));

                    // If I have the data I am looking to assign to the output, then continue.
                    if (currentValue) {

                        // Find the target container object.  If this is a top level attribute then you don't have to:
                        if (dstArray.length > 1) {

                            // Find the object I want to create:
                            var dstObjectArr = _.clone(dstArray);
                            dstObjectArr.pop();
                            var dstObjectString = dstObjectArr.join('.');

                            // Create the nested object if I have not already.
                            // Note: check the objectsCreated hash to determine that it has not already been created.
                            if (!objectsCreated[dstObjectString]) {
                                assignTo = createPathToObject(output, dstObjectArr);
                                objectsCreated[dstObjectString] = assignTo;

                            } else {
                                // In this case, use the reference to the already created object:
                                assignTo = objectsCreated[dstObjectString];
                            }

                        } else {
                            // this is a top level attribute. Just set the corresponding data attribute on the output.
                            assignTo = output;
                        }

                        // Do the actual value assignment to the output.
                        assignTo[targetAttribute] = currentValue;
                    }
                });

                /**
                 * Iteratively creates a nested object on the src object.
                 * Returns either the created object
                 * @param src
                 * @param pathArray
                 */
                function createPathToObject(src, pathArray) {
                    // Iteratively create the nested object
                    var currObject = src;
                    while(pathArray.length) {
                        var currKey = pathArray.shift();
                        currObject[currKey] = currObject[currKey] ? currObject[currKey] : {};
                        currObject = currObject[currKey];
                    }
                    return currObject;
                }

                /**
                 * Checks for the value in the json object. Returns the value, or null if not found.
                 * @param json
                 * @param pathArray
                 * @param destroy - <bool> optional, find and delete the value specified.
                 * @returns {*}
                 */
                function checkForValue(json, pathArray, destroy) {
                    var currOjb = json;
                    // Iterate through nested object checking for attribute.
                    for (var i=0; i<pathArray.length; i++) {
                        if (!currOjb[pathArray[i]]) {
                            return null;
                        } else {
                            currOjb = currOjb[pathArray[i]];
                            if (destroy) {
                                delete currOjb[pathArray[i]];
                            }
                        }
                    }
                    return currOjb;
                }

                return output;
            };
        };

        /**
         * Init returns a function that will be placed on the instance of SoaModel.
         * @param mapOrFunction
         * @returns {*}
         * @private
         */
        this._init = function(mapOrFunction) {
            // If the mapOrFunction is a function, then return a function that is passed the 'json' and
            // 'action' arguments. This must be a custom function that does the data transformation and returns an
            // object.
            if (typeof mapOrFunction === 'function') {
                var func = function(json, action) {
                    return mapOrFunction.apply(this, [json, action]);
                };
                return func;

            } else {
                return this._transformContract(mapOrFunction);
            }
        };

        return this._init(mapOrFunction);
    };

})();

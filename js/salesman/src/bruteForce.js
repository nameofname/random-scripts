"use strict";

const each = require('./each');
const getDistance = require('./getDistance');
let counter = 0;
let wholeLib;
const totalDistances = [];
const tree = {
    distance : 0,
    name : 'root',
    isRoot : true,
    children : {}
};


/**
 * DANGER!!!!
 * WARNING!!! USE WITH CAUTION! FOR LARGE DATA SETS THIS CAN RUN FOR A VERY LONG TIME.
 *
 * This brute force algorithm will find every permutation of the points in the library, calculate the total distance for
 * each, then sort to find the smallest.
 * @param lib
 */
const bruteForce = lib => {
    wholeLib = lib;
    recursion(tree, Object.keys(wholeLib));

    console.log('total number of recursions : ', counter);
    // console.log('all possible combinations and distances : ', totalDistances);

    // now reduce the output of the recursive function to it's lowest value :
    return totalDistances.reduce((prev, curr) => {
        return prev.distance < curr.distance ? prev : curr;
    });
};

// TODO ! USe the add child function and only start from one point!
/**
 * ie. :
 *      addChild(point1, whatever)
 *      recursion(curr, arr)
 *      return totalDistances.reduce( /// )
 */

const addChild = (point, currNode) => {
    const newChild = {};

    newChild.firstNode = currNode.firstNode;
    newChild.path = `${currNode.path}-${point.name}`;
    newChild.distance = currNode.distance  + getDistance(wholeLib[currNode.name].coordinates, point.coordinates);

    currNode.children[key] = newChild;
};

// TODO !!!!!! CURRENTLY I CALCULATE THE PATH STARTING AT EACH POSSIBLE POINT! DO NOT DO THIS!
// it's only necessary to start at one point since you will just get the same path over and over!
const recursion = (currNode, arr) => {
    each(arr, (key, idx) => {

        counter++;
        currNode.children = currNode.children || {};

        const point = wholeLib[key];
        const newChild = {};
        const arr1 = arr.slice();
        arr1.splice(idx, 1);


        newChild.name = key;
        if (!currNode.isRoot) {
            newChild.firstNode = currNode.firstNode;
            newChild.path = `${currNode.path}-${point.name}`;
            newChild.distance = currNode.distance  + getDistance(wholeLib[currNode.name].coordinates, point.coordinates);
        } else {
            newChild.firstNode = key;
            newChild.path = key;
            newChild.distance = 0;
        }

        currNode.children[key] = newChild;

        if (arr1.length) {
            return recursion(currNode.children[key], arr1)

        } else {
            totalDistances.push({
                path : newChild.path + `-${wholeLib[currNode.firstNode].name}`,
                distance : newChild.distance + getDistance(point.coordinates, wholeLib[currNode.firstNode].coordinates)
            });
        }
    });

    return currNode;
};

module.exports = bruteForce;


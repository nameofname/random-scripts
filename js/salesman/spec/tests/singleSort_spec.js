"use strict";

const singleSort = require('../../src/singleSort');

const ranks1 = [
    {
        name : 'six',
        distance : 6

    },
    {
        name : 'one',
        distance : 1
    },
    {
        name : 'two',
        distance : 2
    },
    {
        name : 'three',
        distance : 3
    },
    {
        name : 'four',
        distance : 4
    },
    {
        name : 'five',
        distance : 5
    }
];

const ranks2 = [
    {
        name : '3.5',
        distance : 3.5

    },
    {
        name : 'one',
        distance : 1
    },
    {
        name : 'two',
        distance : 2
    },
    {
        name : 'three',
        distance : 3
    },
    {
        name : 'four',
        distance : 4
    },
    {
        name : 'five',
        distance : 5
    }
];

describe('singleSort', () => {

    it('should sort 6 all the way to the end of this list', () => {
        singleSort(ranks1);
        expect(ranks1.reduce((prev, o) => { return (prev.name ? prev.name : prev) + '-' + o.name; }))
            .toEqual('one-two-three-four-five-six');

    });

    it('should sort 3.5 in-between 3 and 4', () => {
        singleSort(ranks2);
        expect(ranks2.reduce((prev, o) => { return (prev.name ? prev.name : prev) + '-' + o.name; }))
            .toEqual('one-two-three-3.5-four-five');
    });

});
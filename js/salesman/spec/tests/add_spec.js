"use strict";

const add = require('../../src/add');

let lib;

describe('add', () => {

    beforeEach(() => {
        lib = {};
        add(lib, 'one', [1,1]);
        add(lib, 'two', [2,2]);
        add(lib, 'three', [3,3]);
        add(lib, 'four', [4,4]);
    });

    it('should add all of the entries considered', () => {
        expect(Object.keys(lib).length).toEqual(4);
    });

    it('should set the current rank of each entry to 0', () => {
        expect(lib.one.currentRank).toEqual(0);
        expect(lib.two.currentRank).toEqual(0);
    });

    it('should order the ranks of all of the points correctly', () => {
        expect(lib.one.ranks[0].name).toEqual('two');
        expect(lib.one.ranks[1].name).toEqual('three');
        expect(lib.one.ranks[2].name).toEqual('four');

        expect(lib.three.ranks[0].name).toEqual('four');
        expect(lib.three.ranks[1].name).toEqual('two');
        expect(lib.three.ranks[2].name).toEqual('one');
    });

});


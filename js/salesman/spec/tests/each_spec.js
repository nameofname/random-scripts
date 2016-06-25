"use strict";

const timer = require("../helpers/timer");
const each = require("../../src/each");
const largeN = 1000000;
let val;


describe('each', () => {

    const obj = {};
    let normalLoopTime;

    beforeAll(() => {

        // build up the object in beforeAll
        for (var i=0; i < largeN; i++) {
            obj[i] = {
                name : 'test ' + i,
                val : i
            };
        }

        // get the time to do this in a normal loop :
        normalLoopTime = timer(() => {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    val = obj[i].val;
                }
            }
        });
    });


    it('should loop over every enumerable property of an object', () => {
        let n = 0;
        each(obj, idx => {
            n++;
        });
        expect(n === largeN).toEqual(true);
    });

    it('should be at least as fast as a normal for / in with hasOwnProperty', () => {
        const eachTime = timer(() => {
            each(obj, o => {
                val = o.val;
            });
        });

        expect(eachTime <= normalLoopTime);
    });

});


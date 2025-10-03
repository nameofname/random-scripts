// see the readme for details
// target is the target number of teeth
// here i store the range and other variables
// specific to the problem in constants :
const range = [13, 50];
const firstGear = 40;
function gearsSolution(target) {
    //
}

console.log(gearsSolution(127));

/**  notes :
so this actually kind of hard
for each pass, you want to find the number which when multiplied by the pervious result
produces the number closest to the target
if one doesn't exist that gets you within the target range then it's probably actually smarter to 
go for a different number and try for another pass

uuuh... it gets even weirder... each entry in the chain must be one of a range which can be pre-computed
specifically, (a / b) will be something like 13/13, or 13/14, or 13/15... etc... up until 50/49, 50/50
those are mostly decimals, so you can see how you would start to get close to the accepted range
so you're not looking for a whole number! 

i think it makes sense to precompute the range of 2 numbers divided by eachother and treat this 
kind of like 3 sum... 

*/
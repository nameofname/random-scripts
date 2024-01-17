let n:number = 5;
console.log(n);

// // // // // // // // // // // Arrays: 
// An array can be specified to be of a certain type : 
const a1: string[] = ['asdf', 'asdfasdf'];
const a2: number[] = [1,2,3];

// Arrays of objects can be confusing : 
type MyObj = {
    name: String
};
// this represents an object, with a property "objects" that 
// points to an array of MyObj, almost always what you'd want 
type ArrayOfMyObj = {
    objects: MyObj[]
};
// this has a property "objects" that can contain only 0 or 1 
// MyObj, the use case for this is relevant when it comes to 
// tuples, see below
type ArrayOfOneMyObj = {
    objects: [MyObj?]
}
// // // // // // // // // // // Tuples : multiple types in arrays : 
type Tup = [number, string];
// now we have 2 ways of saying the same thing : 
const tup: [number, string] = [1, 'asdf'];
const Tup: [number, string] = [1, 'asdf'];
// Tuple array: 
const tArr: Tup[] = [
    [1, 'ron'],
    [2, 'danielle'],
    [3, 'harry'],
];
// destructuring from arrays is sort of counterintuitive : 
const arr = [1, 2];
const [ n1, n2 ]: number[] = arr;
// but what about this : 
const [ t1, t2 ]: [number, string] = [123, 'string'];

// if you try to reverse the order you get an error " 
// const errorArr: Tup = ['bla', 1]; // Type 'string' is not assignable to type 'number'.

// 2d arrays can get very confusing in TS, but the syntax is like :
const stringMatrix: string[][] = [
    ['one', 'two', 'three']
];

// // // // // // // // // // // Functions : 
function adder(x: number, y: number): number {
    return x + y;
}

// Union type in a function : 
// the | is for union, the void means no return value
function logStrNum(message: string | number): void {
    console.log(message);
}

function cb(s: String) {
    return 'well i did this : ' + s;
}

// // // // // // // // // // // Functions as arguments : 
function doSomething(callback: Function) {
    const s = 'id love to do this thing';
    console.log(s);
    return callback(s);
}

doSomething(cb);

// If you have a strongly typed function as an argument,
// you can create a type for that with arrow function syntax! 
type Cb = (s: string, n: number) => void;
function punchIt(cb: Cb) {
    cb('punch', 5);
}

// // // // // // // // // // // Enums: there is an enum concept in TS
// however for the normal use case you'd think of, 
// ie. a string can only be one of 5 things
// youd use string literals, like so : 
type NameStr = "Ronald"|"Amanda"|"Bobby"
const nn:NameStr = "Ronald";
// const nnn:NameStr = "Dumbo"; // error.

// Type Assertion, 2 forms, <> and as
// Note* type assertion is really useful in cases like this
// where the type is ambiguous
let cid: any = 1;
let c1 = <number>cid;
let c2 = cid as number;

// Actual enums are one of the odd cases where TS will allow you to use a type as a value :
enum Types {
    ONE = 'one',
    TWO = 'two',
}

console.log(Types.ONE);

// and the enum can also be used to type check strings :
const typeOne: Types = Types.ONE;
// const typeTwo: Types = 'two'; // errors even though it's correct
const typeTwo: Types = 'two' as Types; // over-ride b/c we know it's correct

// // // // // // // // // // // Objects 
type User = {
    readonly id: number
    name: string
    age?:number
}
// Interfaces (notice the no equals sign)
interface UserInterface {
    readonly id: number
    name: string
    age?:number
}

// Interfaces are basically more powerful...
// you can combine them, and extend classes

type Name = {
    name: string
}
type Age = {
    age: number
}
type Person = Name & Age

const person: Person = {
    name: 'bonzo',
    age: 23
}

interface AgeInterface {
    age: number 
}
interface NameInterface {
name: string
}
type pppperson = NameInterface & AgeInterface 

// Sometimes you don't konw the keys that will be present in an object: 
type FlexibleObject = {
    [key: string]: number
}

const flexObj1 = {
    ron: 1,
    dani: 2
};
// However it's also legal to assign other values 
const flexObj2 = {
    ron: 'do',
    dani: 'derp'
};

// I HONESTLY DON'T GET THE USE OF INTERFACES VS. TYPES!!! 

interface MathFunc {
    (x: number, y: number): number
}
// consuming an interface for multiple function definitions
const add: MathFunc = (x: number, y: number): number => x + y
const sub: MathFunc = (x: number, y: number): number => x - y

type MathFuncType = {
    (x: number, y: number): number
}

const div: MathFuncType = (x: number, y: number): number => x / y
// FUCKING SEE! YOU CAN DO THE EXACT SAME SHIT WITH TYPES AND INTERFACES! 

interface GuyInterface {
    name: string
    id: number
    // note! you only add the public properties! 
    // fantasy?: string
    // thingies?: string
    holla(): string
}

// note the keyword implements
class Guy implements GuyInterface {
    name: string
    id: number
    private fantasy: string
    // note both private / protected supported
    // protected can be read by child classes 
    protected thingies: string
    constructor(id: number, name: string, fantasy?: string, thingies?: string) {
        this.name = name;
        this.id = id;
        this.fantasy = fantasy || '';
        this.thingies = thingies || '';
    }
    holla (): string {
        return `Holla at me ${this.name}`;
    }
}
const mike = new Guy(4, 'mikey', 'asdf');

// Extending classes 
class ManGuy extends Guy {
    grumbling: boolean;
    constructor(id: number, name: string, grumbling: boolean) {
        super(id, name);
        this.grumbling = grumbling;
    }
}

// // // // // // // // // // // Generics !!! 
// Finally the fucking angle brackets! 
// It's basically a placeholder type that you can define later
// So... you could have a function like this : 
/**
function getArray(arr: any[]): any[] {
    return new Array().concat(arr);
}
 */
// But if later you want an array of a certain type, you can't
// So instead of array of any (any[]) we'll use a generic
function getArray<T>(arr: T[]): T[] {
    return new Array().concat(arr);
}
// We put the <T> in angle brackes, and replace the any type with T
// Then, we can pass a concrete type to the function which takes the place of the generic :
const numArray = getArray<number>([1,2,3,4]);
const strArray = getArray<string>(['bob', 'lob', 'law']);
// strArray.push(1); // error
// So you can see that the <T> is kind of a placeholder, you want to use the same function
// for different things, but you don't want to decide the type for all uses of the funciton
// and it allows you to do that at function invocation time. 

// keyof and index signatures 
// https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
// https://www.typescriptlang.org/docs/handbook/2/keyof-types.html

// keyof is super useful because sometimes you want tao specify that a variable 
// is a key in another variable, eg. an object or array
type SomeShape = Record<string, string>;
let SomeShapeKey: keyof SomeShape;

// combine keyof with typeof 
const bla : Record<string, string> = {};
bla['hey'] = 'adf';
const blaKey: keyof typeof bla = 'hey';

// The above can all be used with something called an index signature
// An index signature is basically when you define what type the keys / indicies of an object can be : 
type SomeOtherShape = { [key: string]: string };
const SomeOtherKey: keyof SomeOtherShape = 'aKey';
// in a sick twist of fate this is also legal :
const SomeOtherKey1: keyof SomeOtherShape = 5;
// because javascript coerces number keys to string
// however, inexplicably, this is not legal : 
// const SomeOtherKey2: keyof SomeOtherShape = true;
// even though JS will coerce a boolean key to string as well

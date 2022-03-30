let n:number = 5;
console.log(n);

// Arrays: 
// An array can be specified to be of a certain type : 
const a1: string[] = ['asdf', 'asdfasdf'];
const a2: number[] = [1,2,3];

// Tuples : multiple types in arrays : 
const tup: [number, string] = [1, 'asdf'];
// Tuple array: 
const tArr: tup[] = [
    [1, 'ron'],
    [2, 'danielle'],
    [3, 'harry'],
];

// Functions : 
function adder(x: number, y: number): number {
    return x + y;
}

// Union type in a function : 
// the | is for union, the void means no return value
function logStrNum(message: string | number): void {
    console.log(message);
}

// Type Assertion, 2 forms, <> and as
// Note* type assertion is really useful in cases like this
// where the type is ambiguous
let cid: any = 1;
let c1 = <number>cid;
let c2 = cid as number;

// Objects 
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

// Generics !!! 
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

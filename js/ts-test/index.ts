let n:number = 5;
console.log(n);

// Functions : 
function adder(x: number, y: number): number {
    return x + y;
}

// Union type in a function : 
// tjhe | is for union, the void means no return value
function logStrNum(message: string | number): void {
    console.log(message);
}

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


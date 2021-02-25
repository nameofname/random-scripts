// Arg here is a string : 
function logStr(arg: string) :string {
    arg = `ronaldy ${arg}`;
    console.log(arg);
    return arg;
}

logStr('ronalds');

function logStrArr(arg: string[]): string[] {
    arg = arg.map(item => `ronaldy ${item}`);
    console.log(arg);
    return arg;
}

logStrArr(['uno', 'dos', 'tres', 'quatro', 'cinqo', 'cinqo', 'seis']);

// T is a generic., it can be of any type, and the compiler 
// will still know the return value's type 
function identity<T>(arg: T): T {
    console.log(`your identity ${arg}`);
    return arg;
}

identity('bla bla');
// TS knows this type! 
const aNumber: number = identity(5);

// Using the any type is kind of the same as using a generic,
// but the compiler looses the info about the type after use
function takesAnything(arg: any) :any {
    console.log(`this could be anything ${arg}`);
    return arg;
}

takesAnything('bob lob law');
// TS doesn't know the type, it gets it wrong! 
const idkWhat: number = takesAnything('55');
console.log(typeof idkWhat);

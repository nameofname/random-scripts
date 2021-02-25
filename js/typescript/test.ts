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

// T is a generic 
function identity<T>(arg: T): T {
    return arg;
}

console.log(identity('bla bla'));


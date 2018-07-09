const fs = require('fs');
const brackets = fs.readFileSync(__dirname + '/manyBrackets.txt', { encoding: 'utf-8'});
const answers = fs.readFileSync(__dirname + '/expectedOutput.txt', { encoding: 'utf-8'});

const bracketMap = new Map([
    ['{', '}'],
    ['(', ')'],
    ['[', ']'],
]);
const closingBrackets = new Map([
    ['}', '{'],
    [')', '('],
    [']', '['],
]);

function isBalanced(string) {
    const bracketArr = string.split('');
    const arr = [];
    let pass = true;

    bracketArr.forEach(s => {
        if (bracketMap.get(s)) {
            arr.push(s)
        } else if (closingBrackets.get(s)) {
            if (arr[arr.length - 1] === closingBrackets.get(s)) {
                arr.pop();
            } else {
                pass = false;
            }
        }
    });

    return pass && !Boolean(arr.length)? 'YES' : 'NO';
}


// const strings = [
//     '{[()]}',
//     '{[(])}',
//     '{{[[(())]]}}',
// ];
const strings = brackets.split('\n');
const answersArr = answers.split('\n');

strings.forEach((str, idx) => {
    const balanced = isBalanced(str);
    // console.log(balanced)
    if (balanced !== answersArr[idx]) {
        console.log(balanced, answersArr[idx], idx, str)
    }
});

// const failCase = '(([{{([([{}[)}])[)}))}}))](]}}[)({{[[[[[[][[[[[([}]{[]}{{{}{}[';
// const failCase = '[([{{}}]{[[][][([[]]){[]}{}]]}[]{{}}{})[[]]]{{}}(()[[[[[(){}[]]({}{[]})[][[][]]]]{}]{[{}]{[{[][](()({{()}}){([]({({{[]}([([()]{()[[([({{{[]{(){}}[][]({{[([])()](())([{[]([()]{})}]){}([]){()}{}[]([[()]])}()})[{}]}()}(())}){{}()}[]]{{}})]][[]({{[{}]}})({{}({{[]{()}([][{[()]}]{})}()})}{{}}{})]()(){}}(()({()}[([](){[]()}[])])[])[])][{[{[]}]{}([])}]()(()))}){([{}])}[(([]){[]{}})]{}({}{})}){}({{}([][](){{[][{()([[{}()]]{()}{{}{[()]}})[()[]{}](){[{}()[]][{{}}{[{}][]()}[]](())[[][]][]()}}[({}([[{([]){}}]()([()(){}]){([()]())}](()))(()))]]{}()[][{[{}(([]){([()]{()()}([{}][[[]{[[(({([([]){()[]}]){(())}[]}))][((([]{})[{}[[()]({({[()[]]{}(()[{}[][[{}][][]({()}[{([])}][])]][]{})([])}){}{((){})}}){[]}[]()(()(()))(()[{{}}]){}({{{((()([](()[][]{}){({})}{(([{({{}})}]))})))}}})]]))]]}]]))})]}]}})}))})}]}}])';
// const failCase = '))';
// console.log(isBalanced(failCase));
